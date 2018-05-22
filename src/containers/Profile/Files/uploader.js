import WebUploader from 'webuploader'
import { message } from 'antd'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
import store from '@/redux/store'
import {getAccount} from "@/tools/localStore";

import { addFile, deleteFile, updateFile, updateUploadProgress } from '@/redux/actions/uploaderAction'
import { get_ms_short } from '@/utils/dateTimeFormat'
import { BTFetch } from '@/utils/BTFetch'
import { getBlockInfo } from "@/utils/BTCommonApi";

import { PackArraySize, PackStr16, PackUint32, PackUint64 } from '@/lib/msgpack/msgpack'

const btcrypto = require('bottos-js-crypto')
const message_pb = require('@/lib/proto/message_pb');
const { messageProtoEncode } = require('@/lib/proto/index');

// import BTFetch from '@/utils/BTFetch'
export const file_test_url = 'http://139.219.195.195:8080/v2'
// const file_test_url = 'http://192.168.9.120:8080/v2'

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
  return 50 * MegaByte;
  return 100 * MegaByte;
}

// 负责将文件切片。
// 直接从 webuploader 里面拿的
function CuteFile( file ) {
  const chunkSize = file.chunkSize
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
    server: 'http://localhost:9000/',
    // auto: true,
    sendAsBinary: true,
    method: 'PUT',
    chunked: true,
    attachInfoToQuery: false,
    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false
})

// 在文件入队之前触发
// 文件切片信息在此获取
async function beforeFileQueued(file) {
  console.log('beforeFileQueued file', file);
  // 1. 计算文件的 chunkSize
  const chunkSize = calculateSlicedFileSize(file.size)
  file.status = 'uploading'
  file.chunkSize = chunkSize
  store.dispatch( addFile(file) )
}
uploader.on( 'beforeFileQueued', beforeFileQueued)


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

  return fetch(file_test_url + '/data/getFileUploadURL', {
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
      file.status = 'error'
      store.dispatch( updateFile(file) )
      message.error(res.status)
    }
  }).catch(err => {
    console.error('getFileUploadURL error', err);
  })

}

async function handleFileQueued(file) {
  // 2. 计算切片的 hash
  var api = CuteFile( file )

  // const hashList = await api.getSliceHash()
  // console.log('hashList', hashList.map(item => item.hash));
  // setInterval(async () => {
    var t1 = get_ms_short()
    const hashList = await api.getSliceHash()
    console.log('hashList', hashList.map(item => item.hash));
    console.log('hash 计算耗时', get_ms_short() - t1 + 'ms');
  // }, 5000);
  // return
  file.hashList = hashList

  console.log('文件大小', file.size);
  // console.log('hashList', hashList);
  // 3. 将 hashList 发到后端校验
  fetch(file_test_url + '/data/fileCheck', {
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
    store.dispatch( deleteFile(file.id) )
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
  // if (percentage < 0.8) {
  //   // throttle(querySecondProgress.bind(null, file), 2000)
  //   querySecondProgress(file)
  // }
  if (percentage < 1) {
    store.dispatch( updateUploadProgress(file.guid, percentage * 75) )
  }

}

var percent_throttled = throttle(progressChange, 500)

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

  let body = JSON.stringify({ username, slice })
  console.log('body', body);

  fetch(file_test_url + '/data/getUploadProgress', {
    method: 'POST',
    body,
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json()).then(async (res) => {
    console.log('res', res);
    if (res.result != 200) {
      setTimeout(querySecondProgress.bind(null, file), 3000);
    } else if ( res.result == 200 && chunks == res.storage_done ) {
      // 说明存储的等于 上传完成的
      console.log('上传真的完成');
      store.dispatch( updateUploadProgress(guid, 100) )

      // 成功之后的文件注册
      const storeAddr = res.storage_ip.map(({sguid, snode_ip}) => ({ sguid: sguid.slice(guid.length), snode_ip }) )
      let originParam = {
        "fileHash": guid,
        "info": {
          "userName": username || 'file',
          "fileSize": file.size || 100,
          "fileName": file.name || 'name',
          "filePolicy": "policytest",
          "fileNumber": 1,
          "simOrass": 0,
      		"opType": 1,
          "storeAddr": JSON.stringify(storeAddr)
        }
      }

      let b1 = PackArraySize(2)
      let b2 = PackStr16(originParam.fileHash)

      let b3 = PackArraySize(8)

      let b4 = PackStr16(originParam.info.userName)
      let b5 = PackUint64(originParam.info.fileSize)
      let b6 = PackStr16(originParam.info.fileName)
      let b7 = PackStr16(originParam.info.filePolicy)

      let b8 = PackUint64(originParam.info.fileNumber)
      let b9 = PackUint32(originParam.info.simOrass)
      let b10 = PackUint32(originParam.info.opType)
      let b11 = PackStr16(originParam.info.storeAddr)

      let param = [...b1,...b2,...b3,...b4,...b5,...b6,...b7,...b8,...b9,...b10,...b11]
      console.log('param', param);

      let blockInfo = await getBlockInfo()

      console.log('blockInfo', blockInfo);

      let privateKey = Buffer.from(getAccount().privateKey, 'hex')

      let fetchParam = {
        "version": 1,
        ...blockInfo,
        "sender": getAccount().username,
        "contract": "datafilemng",
        "method": "datafilereg",
        "param": param,
        "sig_alg": 1,
      }

      // "signature": ""
      let encodeBuf = messageProtoEncode(message_pb, fetchParam)
      let hashData = btcrypto.sha256(btcrypto.buf2hex(encodeBuf))
      let sign = btcrypto.sign(hashData, privateKey)
      fetchParam.signature = sign.toString('hex')
      // fetchParam.param = param.map(s1 => int10ToStr16(s1)).join('')
      fetchParam.param = btcrypto.buf2hex(param)

      console.log('fetchParam', fetchParam);

      BTFetch('/asset/registerFile', 'post', fetchParam)
      .then(res => console.log('res', res))

    } else {
      console.log('上传没有真的完成');
      let restPercent = res.storage_done / chunks * 25
      store.dispatch( updateUploadProgress(guid, 75 + restPercent) )

      setTimeout(querySecondProgress.bind(null, file), 3000);
      // setTimeout(getDownloadFileIP.bind(null, guid), 1000);
    }

  }).catch(err => {
    console.error('进度查询失败，请稍后再试！', err);
  })

}

uploader.on( 'uploadSuccess', querySecondProgress);

export default uploader
