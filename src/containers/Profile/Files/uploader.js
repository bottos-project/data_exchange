import WebUploader from 'webuploader'
import { message } from 'antd'
import store from '@/redux/store'
import { addFile } from '@/redux/actions/uploaderAction'
var hash256 = require('crypto').createHash('sha256');


// 文件上传
// 1. 取得文件，对文件进行切片
// 2. 对切片进行 hash 计算，返回切片的 hash 值

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

console.log('hash256', hash256);
/** @arg {string|Buffer} data
    @arg {string} [encoding = null] - 'hex', 'binary' or 'base64'
    @return {string|Buffer} - Buffer when encoding is null, or string
*/
function sha256(data, encoding = 'hex') {
    return hash256.update(data).digest(encoding);
}

// ["68819422197e5f1ddcc24903a84594677c687e701c623cd282cd59d8e5e4df2b",
// "e8772f5436992211aa7ddd4e64434592a8d6a974252a072e14920c2534dc745c",
// "da5698be17b9b46962335799779fbeca8ce5d491c0d26243bafef9ea1837a9d8"]

// ["530c4ee98b854926aae6ec9a0a7302d0fd23e2994a5b7fbb6deeea0d1e05243e",
// "517eea9005cb95696e8e3d6da3bdfa11e505bec6a03e2d17c5c7fa5fd2d1abb0",
// "b267799acdcdfd128d459248b4d32bd33fe931ba4ede20d7674520eebc38a21c"]

// "68819422197e5f1ddcc24903a84594677c687e701c623cd282cd59d8e5e4df2be8772f5436992211aa7ddd4e64434592a8d6a974252a072e14920c2534dc745cda5698be17b9b46962335799779fbeca8ce5d491c0d26243bafef9ea1837a9d8"

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

          let promiseArr = file.blocks.map((block, index) => {
            return new Promise(function(resolve, reject) {
              let chunkData = _blob.slice(block.start, block.end)
              // console.log('chunkData', chunkData);
              var oFReader = new FileReader()
              oFReader.onload = function (oFREvent) {
                console.log('oFREvent', oFREvent);
                // console.log("FileReader", oFREvent.target.result);
                let hashString = sha256( oFREvent.target.result )
                resolve(hashString)
              }
              oFReader.onerror = function (error) {
                console.log('error', error);
                reject(error)
              }
              // console.log('oFReader', oFReader);
              oFReader.readAsArrayBuffer(chunkData)

            });
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
    server: 'http://localhost:3000/server/fileupload',
    // auto: true,
    sendAsBinary: true,
    method: 'PUT',
    chunked: true,
    attachInfoToQuery: false,
    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false
})


function getUploadURL(file) {

  var sliceInfo = file.hashList.map((s_file_hash, index) => ({
    sguid: file.guid + index,
    s_file_hash
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
      uploader.options.server = res.url[0].surl
      // 5. 成功取得 url，触发上传
      return uploader.upload()

    }
  })

}

function handleFileQueued(file) {
  // console.log('file', file);

  // 1. 计算文件的 chunkSize
  const chunkSize = calculateSlicedFileSize(file.size)
  // uploader.options.chunkSize = chunkSize
  file.chunkSize = chunkSize

  store.dispatch( addFile(file) )
  var api = CuteFile( file, chunkSize )

  // console.log('getSliceHash', api.getSliceHash());
  // 2. 计算切片的 hash
  api.getSliceHash().then(data => {
    console.log('data', data);
    file.hashList = data
    // 3. 将 hashList 发到后端校验
    return fetch('http://139.219.195.195:8080/v2/data/fileCheck', {
      method: 'post',
      body: JSON.stringify({hash: data}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
  }).then(res => res.json()).then(res => {
    console.log('res', res);
    if (res.is_exist == 1) {
      console.log('文件已存在');
      message.info('this file is existed')
    } else if (res.is_exist == 0) {
      // 4. 校验通过，取得 guid 为 merkle_root_hash
      // 向后端取上传地址
      file.guid = res.merkle_root_hash
      // blob.guid = res.merkle_root_hash
      getUploadURL(file)
    } else {
      console.error(res);
    }

  }).catch(err => console.error(err))

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


uploader.on( 'uploadSuccess', file => {
  console.log('file', file);
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
    // setTimeout(getDownloadFileIP.bind(null, guid), 1000);
  })

});


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
