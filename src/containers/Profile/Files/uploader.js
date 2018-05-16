import WebUploader from 'webuploader'
import { message } from 'antd'
import throttle from 'lodash.throttle'
import store from '@/redux/store'
import { addFile, deleteFile, updateFileProgress } from '@/redux/actions/uploaderAction'
import { get_ms_short } from '@/utils/dateTimeFormat'
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
  file.uid = file.id
  // 1. 计算文件的 chunkSize
  const chunkSize = calculateSlicedFileSize(file.size)
  // uploader.options.chunkSize = chunkSize
  file.chunkSize = chunkSize
  file.status = 'uploading'
  store.dispatch( addFile(file) )
  var api = CuteFile( file, chunkSize )

  // 2. 计算切片的 hash
  var t1 = get_ms_short()
  // setInterval(async () => {
    const hashList = await api.getSliceHash()
    console.log('hashList', hashList);
  // }, 5000);
  console.log('文件大小', file.size);
  console.log('hash 计算耗时', get_ms_short() - t1 + 'ms');
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
    if (res.is_exist == 1) {
      // console.log('文件已存在', res);
      message.info('this file is existed')
    } else if (res.is_exist == 0) {
      // 4. 校验通过，取得 guid 为 merkle_root_hash
      // 向后端取上传地址
      file.guid = res.merkle_root_hash
      // file.uid = res.merkle_root_hash
      getUploadURL(file)
    } else {
      console.error(res);
    }

  }).catch(err => {
    message.error('upload fail')
    store.dispatch( deleteFile(file.id) )
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
var __index = 0
function progressChange(file, percentage) {
  console.log('file.name, percentage', file.name, percentage);
  store.dispatch( updateFileProgress(file.guid, percentage * 75) )
  if (percentage > 0.7 && __index == 0) {
    querySecondProgress(file)
    index++
  }
}

var percent_throttled = throttle(progressChange, 150)

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

  fetch('http://139.219.195.195:8080/v2/data/getUploadProgress', {
    method: 'POST',
    body: JSON.stringify({ username: store.getState().headerState.account_info.username, slice }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json()).then(res => {
    console.log('res', res);
    if (res.result == 200) {

    }
    setTimeout(function () {

      // 成功之后的文件注册
      // fetch('http://192.168.8.224:8080/v2/asset/registerFile', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //       "version": 1,
      //       "cursor_num": 825,
      //       "cursor_label": 2273619304,
      //       "lifetime": 1526373358,
      //       "sender": "bottos",
      //       "contract": "datafilemng",
      //       "method": "datafilereg",
      //       "param": "dc0002da000c66696c656861736874657374dc0008da000c757365726e616d6574657374da000a73697373696454657374cf000000000000006fda000c66696c656e616d6554657374da000e66696c65706f6c69637974657374da000c617574687061746874657374cf00000000000000deda00047369676e",
      //       "sig_alg": 1,
      //       "signature": ""
      //   }),
      //   headers: new Headers({
      //     'Content-Type': 'application/json'
      //   })
      // }).then(res => res.json()).then(res => console.log('res', res))

    }, 1000);
    // setTimeout(getDownloadFileIP.bind(null, guid), 1000);
  })

}

uploader.on( 'uploadSuccess', querySecondProgress);

// uploader.on( 'beforeFileQueued', file => {
//   console.log('beforeFileQueued file', file);
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
