import WebUploader from 'webuploader'
import { message } from 'antd'
import throttle from 'lodash.throttle'
import store from '@/redux/store'
import { addFile, deleteFile, updateFile, updateUploadProgress } from '@/redux/actions/uploaderAction'
import { get_ms_short } from '@/utils/dateTimeFormat'
import { fetchWithBlockHeader } from '@/utils/BTCommonApi'
import { PackArraySize, PackStr16 } from '@/lib/msgpack/msgpack'

const btcrypto = require('bottos-js-crypto')
const message_pb = require('@/lib/proto/message_pb');
const { registProtoEncode } = require('@/lib/proto/index');

let keys = btcrypto.createPubPrivateKeys()
let prikey = keys.privateKey
// import BTFetch from '@/utils/BTFetch'

// 文件上传流程
// 1. 取得文件，对文件进行切片
// 2. 对切片进行 hash 计算，返回切片的 hash 值
// 3. 将 hashlist 上传，取得 guid
// 4. 通过 guid 取得上传地址列表
// 5. 并发上传
// 6. 进度查询及缓存，显示进度条
// 7. 上传成功向后端注册文件

const GigaByte = Math.pow(2, 30)
const MegaByte = 1 << 20

function int10ToStr16(i10) {
  var s16 = i10.toString(16)
  // console.log('s16', s16);
  if (s16.length == 1) {
    s16 = '0' + s16
  }
  return s16
}

function calculateSlicedFileSize(size) {
  if (size > GigaByte) {
    return 200 * MegaByte
  } else if (size > 500 * MegaByte) {
    return 150 * MegaByte;
  }
  return 10 * MegaByte;
  return 100 * MegaByte;
}

// 负责将文件切片。
// 直接从 webuploader 里面拿的
function CuteFile( file, chunkSize ) {
  // console.log('file', file);
    var pending = [],
        blob = file.source,
        total = blob.size,
        chunks = Math.ceil( total / chunkSize ),
        start = 0,
        index = 0,
        len, api;

    api = {
        file: file,

        has: function() {
            return !!pending.length;
        },

        shift: function() {
            return pending.shift();
        },

        unshift: function( block ) {
            pending.unshift( block );
        },

        getSliceHash: function () {
          let _blob = blob.getSource()
          const filePath = _blob.path
          let promiseArr = file.blocks.map((block) => {
            return global.sha256Chunk(filePath, block.start, block.end - 1, block.chunk)
          })

          return Promise.all(promiseArr);
        }
    };

    while ( index < chunks ) {
        len = Math.min( chunkSize, total - start );

        pending.push({
            file: file,
            start: start,
            end: chunkSize ? (start + len) : total,
            total: total,
            chunks: chunks,
            chunk: index++,
        });
        start += len;
    }

    file.blocks = pending.concat();
    file.remaning = pending.length;

    return api;
}


var uploader = WebUploader.create({
    // 文件接收服务端。
    server: 'http://139.219.195.195:9000/',
    // auto: true,
    sendAsBinary: true,
    method: 'PUT',
    chunked: true,
    attachInfoToQuery: false,
    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false
})


function getUploadURL(file) {

  var sliceInfo = file.hashList.map((obj) => ({
    sguid: file.guid + obj.chunk,
    s_file_hash: obj.hash
  }))

  console.log('sliceInfo', sliceInfo);

  var param = {
    username: store.getState().headerState.account_info.username,
    slice: sliceInfo,
  }

  return fetch('http://139.219.195.195:8080/v2/data/getFileUploadURL', {
    method: 'post',
    body: JSON.stringify(param),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json()).then(res => {
    console.log('res', res);
    if (res.result == 200) {
      file.url = res.url
      uploader.options.server = file.url[0].surl
      // 5. 成功取得 url，触发上传
      return uploader.upload()

    } else {
      message.error(res.status)
    }
  }).catch(err => {
    console.error(err);
  })

}

async function handleFileQueued(file) {
  console.log('WUFile', file);
  // console.log('WUFile', file);
  // 1. 计算文件的 chunkSize
  const chunkSize = calculateSlicedFileSize(file.size)
  // uploader.options.chunkSize = chunkSize
  file.chunkSize = chunkSize
  file.status = 'uploading'
  store.dispatch( addFile(file) )
  var api = CuteFile( file, chunkSize )

  // 2. 计算切片的 hash
  // const hashList = await api.getSliceHash()
  // console.log('hashList', hashList.map(item => item.hash));
  // setInterval(async () => {
    var t1 = get_ms_short()
    const hashList = await api.getSliceHash()
    console.log('hashList', hashList.map(item => item.hash));
    console.log('hash 计算耗时', get_ms_short() - t1 + 'ms');
  // }, 5000);
  // return
  console.log('文件大小', file.size);
  // console.log('hashList', hashList);
  file.hashList = hashList
  // 3. 将 hashList 发到后端校验
  fetch('http://139.219.195.195:8080/v2/data/fileCheck', {
    method: 'post',
    body: JSON.stringify({hash: hashList}),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json()).then(res => {
    console.log('res', res);
    if (res.is_exist == 0) {
      // 4. 校验通过，取得 guid 为 merkle_root_hash
      // 向后端取上传地址
      file.guid = res.merkle_root_hash
      // file.uid = res.merkle_root_hash
      store.dispatch( updateFile(file) )
      getUploadURL(file)
    } else {
      // 校验不通过，或者失败
      if (res.is_exist == 1) {
        // console.log('文件已存在', res);
        message.info('this file is existed')
        store.dispatch( deleteFile(file.id) )
      } else {
        message.error(res.status || 'this file is existed')
        file.status = 'error'
        store.dispatch( updateFile(file) )
      }
      uploader.removeFile(file)
    }

  }).catch(err => {
    console.error('fileCheck catch err', err);
    message.error('upload fail')
    uploader.removeFile(file)
  })

}

uploader.on( 'fileQueued', handleFileQueued)

uploader.on( 'uploadBeforeSend', (obj, data, headers) => {
  // console.log('obj, data, headers', obj, data, headers);
  // uploader.options.server = obj.file.url[data.chunk + 1]
  var chunk = obj.chunk + 1
  // console.log('chunk', chunk);
  // // console.log('this.url', this.url);
  if (!obj.file.url[chunk]) {
    chunk -= 1
  }
  // console.log('this.url[chunk].surl', this.url[chunk].surl);
  uploader.options.server = obj.file.url[chunk].surl
  headers['Access-Control-Allow-Origin'] = '*'
})


// ************ 上传进度监听 *************
function progressChange(file, percentage) {
  console.log('file.name, percentage', file.name, percentage);
  // 因为这个 percentage 值为 1 的时候比 uploadSuccess 触发要晚
  // 所以做这个判断
  if (percentage < 1) {
    store.dispatch( updateUploadProgress(file.guid, percentage * 75) )
  }

}

var percent_throttled = throttle(progressChange, 200)

uploader.on( 'uploadProgress', percent_throttled)

// ************ 存储进度查询 *************

function querySecondProgress(file) {
  let guid = file.guid
  // console.log('guid', guid);
  let chunks = file.url.length
  console.log('chunks', chunks);
  let slice = []
  // console.log('slice', slice);
  for (var i = 0; i < chunks; i++) {
    slice.push({ sguid: guid + i })
  }
  console.log('slice', slice);

  const username = store.getState().headerState.account_info.username

  fetch('http://139.219.195.195:8080/v2/data/getUploadProgress', {
    method: 'POST',
    body: JSON.stringify({ username, slice }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json()).then(res => {
    console.log('res', res);
    if (res.result != 200) {
      setTimeout(querySecondProgress.bind(null, file), 3000);
    } else if ( res.result == 200 && chunks == res.storageDone ) {
      // 说明存储的等于 上传完成的
      console.log('上传真的完成');
      store.dispatch( updateUploadProgress(guid, 100) )

      let originParam = {
        "fileHash":"",
        "info": {
          "userName": username || 'file',
          "sessionId": "btd121",
          "fileSize": file.size || 100,
          "fileName": file.name || 'name',
          "filePolicy": "policytest",
          "authPath": "sigtest",
          "fileNumber": 200,
          "signature": "sigtest"
        }
      }

      let b1 = PackArraySize(2)
      let b2 = PackStr16(originParam.fileHash)
      let b3 = PackStr16(JSON.stringify(originParam.info))

      let param = [...b1,...b2,...b3]
      console.log('param', param);

      let fetchParam = {
        "version": 1,
        "sender": "bottos",
        "contract": "datafilemng",
        "method": "datafilereg",
        "param": param,
        "sig_alg": 1,
      }

      // "signature": ""
      let encodeBuf = registProtoEncode(message_pb, fetchParam)
      let hashData = btcrypto.sha256(btcrypto.buf2hex(encodeBuf))
      let sign = btcrypto.sign(hashData, prikey)
      fetchParam.signature = sign
      fetchParam.param = param.map(s1 => int10ToStr16(s1)).join('')

      console.log('fetchParam', fetchParam);

      // 成功之后的文件注册
      fetchWithBlockHeader('http://192.168.8.224:8080/v2/asset/registerFile', 'post', fetchParam, {full_path:true})
      .then(res => console.log('res', res))

    } else {
      console.log('上传没有真的完成');
      let restPercent = res.storageDone / chunks * 25
      store.dispatch( updateUploadProgress(guid, 75 + restPercent) )

      setTimeout(querySecondProgress.bind(null, file), 3000);
      // setTimeout(getDownloadFileIP.bind(null, guid), 1000);
    }

  }).catch(err => {
    console.log('进度查询失败，请稍后再试！');
  })

}

uploader.on( 'uploadSuccess', querySecondProgress);

// uploader.on( 'beforeFileQueued', (file) => {
//   console.log('beforeFileQueued file', file);
//   // return false
// })


function getDownloadFileIP(guid) {
  fetch('http://139.219.195.195:8080/v2/data/getStorageIP', {
    method: 'POST',
    body: JSON.stringify({ guid }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => {
    console.log('res', res);
    // getFileDownloadURL({
    //   "username": "1526371403563aaaa",
    //   "guid": "AtomSetup-x64.exe",
    //   "ip": [
    //     {
    //       "sguid": "1526371403563aaaa0",
    //       "snode_ip": "139.219.195.195"
    //     },
    //     {
    //       "sguid": "1526371403563aaaa1",
    //       "snode_ip": "139.219.195.195"
    //     }
    //   ]
    // })
  })

}


function getFileDownloadURL(param) {

  fetch('http://139.219.195.195:8080/v2/data/getFileDownloadURL', {
    method: 'POST',
    body: JSON.stringify(param),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json()).then(res => {
    console.log('getFileDownLoadURL res', res);
    res.url
    let a = document.createElement('a');
    a.href = res.url
    a.download = param.guid
    a.click();
  })

}


export default uploader
