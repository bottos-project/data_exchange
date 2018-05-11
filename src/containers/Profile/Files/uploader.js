import WebUploader from 'webuploader'

import store from '@/redux/store'

import { addFile } from '@/redux/actions/uploaderAction'

var uploader = WebUploader.create({

    // 文件接收服务端。
    server: 'http://localhost:3000/server/fileupload',

    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    // auto: true,

    sendAsBinary: true,

    method: 'PUT',

    chunked: true,

    attachInfoToQuery: false,

    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false
})

function handleFileQueued(file) {
  // console.log('file', file);

  store.dispatch( addFile(file) )
  // console.log('uploader', uploader);
  const source = file.getSource()
  const blob = source.getSource()
  // console.log('source', source);
  console.log('blob', blob);

  // NOTE: 下次从这里继续
  return console.log('现在这里中断');;

  var guid = new Date().getTime() + 'aaaa'
  // var guid = new Date().getTime() + (getAccount().username || 'aaaa')
  const s_file_size = 5 << 20

  function sliceParam(index) {
    return {
      sguid: guid + index,
      s_file_size,
      s_file_name: file.name + index,
      s_file_hash: parseInt( Math.random() * 65535 ).toString()
    }
  }

  const chunks = Math.ceil(file.size / s_file_size)

  const slice = []
  for (var i = 0; i < chunks; i++) {
    slice.push(sliceParam(i))
  }

  var param = {
    guid,
    slice,
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
      this.url = res.url
    }
  })

}

uploader.on( 'fileQueued', handleFileQueued)

export default uploader
