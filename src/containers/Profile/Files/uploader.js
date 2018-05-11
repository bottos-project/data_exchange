import WebUploader from 'webuploader'
import store from '@/redux/store'
import { addFile } from '@/redux/actions/uploaderAction'
var createHash = require('create-hash');


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
  return 100 * MegaByte;
}

// console.log('createHash', createHash);
/** @arg {string|Buffer} data
    @arg {string} [encoding = null] - 'hex', 'binary' or 'base64'
    @return {string|Buffer} - Buffer when encoding is null, or string
*/
function sha256(data, encoding = 'hex') {
    return createHash('sha256').update(data).digest(encoding);
}

// 负责将文件切片。
// 直接从 webuploader 里面拿的
function CuteFile( file, chunkSize ) {
  console.log('file', file);
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
          return file.blocks.map((block, index) => {
            let chunkData = _blob.slice(block.start, block.end)
            console.log('chunkData', chunkData);
            return sha256( chunkData )
          })
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

function handleFileQueued(file) {
  console.log('file', file);

  const blob = file.getSource().getSource()
  // console.log('source', source);
  console.log('blob', blob);

  store.dispatch( addFile(file) )

  console.log('api', CuteFile( file ));
  const chunkSize = calculateSlicedFileSize(file.size)

  var api = CuteFile( file, chunkSize )

  var sliceInfo = file.blocks.map((block, index) => {
    let chunkData = blob.slice(block.start, block.end)
    console.log('chunkData', chunkData);
    let s_file_hash = sha256( chunkData )
    return {
      sguid: blob.guid + index,
      s_file_size: chunkSize,
      s_file_name: blob.name + index,
      s_file_hash
    }
  })

  console.log('sliceInfo', sliceInfo);

  var param = {
    guid: blob.guid,
    slice: sliceInfo,
  }

  fetch('http://139.217.206.43:8080/v2/data/getFileUploadURL', {
    method: 'post',
    body: JSON.stringify(param),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => {
    return res.json()
  }).then(res => {
    console.log('res', res);
    if (res.result == 200) {
      file.url = res.url
      uploader.options.server = res.url[0].surl

        // NOTE: 下次从这里继续
        return uploader.upload()

    }
  })


}

uploader.on( 'fileQueued', handleFileQueued)


uploader.on( 'uploadBeforeSend', (obj, data, headers) => {
  console.log('obj, data, headers', obj, data, headers);
  // var chunk = obj.chunk + 1
  // console.log('chunk', chunk);
  // // console.log('this.url', this.url);
  // if (!this.url[chunk]) {
  //   chunk -= 1
  // }
  // console.log('this.url[chunk].surl', this.url[chunk].surl);
  // this.uploader.options.server = this.url[chunk].surl
  headers['Access-Control-Allow-Origin'] = '*'
})

export default uploader
