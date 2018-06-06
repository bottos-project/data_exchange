import uploader from './index'
import { BTFileFetch } from '@/utils/BTDownloadFile'
import store from '@/redux/store'
import { addFile } from '@/redux/actions/uploaderAction'

import {getAccount} from "@/tools/localStore";
import { deleteFileCache } from '@/utils/uploadingFileCache'


function wrapFile(fileInfo) {
  let data = window.readFileSync(fileInfo.path)
  // console.log(data.buffer);
  let file = new File([data.buffer], fileInfo.name, {
    type: "application/octet-stream"
  })
  file.cache = true
  file.guid = fileInfo.guid
  return file
  // file = new _File( '', file );
  // file = new WUFile( file );
  // // console.log('file', file);
  // return Object.assign(file, fileInfo)
}

export function checkCacheFile(cachedFile) {

  function checkProgress({username, slice, guid}) {
    return BTFileFetch('/data/getUploadProgress', { username, slice })
    .then(res => {
      if (res.result == 200) {
        if (slice.length == res.storage_done) {
          // 说明之前上传完了的
          // 理论上是不用处理这个
          // 但是发现出现了这种情况
          deleteFileCache(guid)
        } else {
          // 这个才是没有传完
          cachedFile.progressing_slice_chunk = res.slice_progressing.map(ele =>
            Number.parseInt(ele.sguid.replace(guid, ''))
          )
          // store.dispatch(addFile(cachedFile))
          let wfile = wrapFile(cachedFile)
          uploader.addFile(wfile)

        }
      } else {
        // console.log('res', res);
        setTimeout(checkProgress.bind(null, {username, slice, guid}), 3000);
      }
    })

  }

  const username = getAccount().username
  const { guid, hashList } = cachedFile

  let slice = []
  for (var i = 0; i < hashList.length; i++) {
    slice.push({ sguid: guid + i })
  }
  // console.log('slice', slice);
  checkProgress({username, slice, guid})

}
