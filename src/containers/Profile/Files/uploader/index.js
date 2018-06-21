/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
import WebUploader from 'webuploader'
import { message } from 'antd'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
import store from '@/redux/store'
import {getAccount} from "@/tools/localStore";

import { addFile, deleteFile, updateFile } from '@/redux/actions/uploaderAction'
import { get_ms_short, get_s_short } from '@/utils/dateTimeFormat'
import BTFetch from '@/utils/BTFetch'
import { getBlockInfo, getSignaturedFetchParam } from "@/utils/BTCommonApi";
import { BTFileFetch } from '@/utils/BTDownloadFile'
import { PackArraySize, PackStr16, PackUint32, PackUint64 } from '@/lib/msgpack/msgpack'
import { getCacheFileState, deleteFileCache } from '@/utils/uploadingFileCache'

import myEmitter from '@/utils/eventEmitter'
// console.log('myEmitter', myEmitter);
// const fs = __non_webpack_require__('fs');
// console.log('fs', fs);
// 文件上传流程
// 1. 取得文件，对文件进行切片
// 2. 对切片进行 hash 计算，返回切片的 hash 值
// 3. 将 hashlist 上传，取得 guid
// 4. 通过 guid 取得上传地址列表
// 5. 并发上传
// 6. 进度查询及缓存，显示进度条
// 7. 上传成功向后端注册文件

var timeStamp = 0;

const GigaByte = Math.pow(2, 30)
const MegaByte = 1 << 20

const uploadSuccessPercent = 95

function calculateSlicedFileSize(size) {
  if (size > GigaByte) {
    return 200 * MegaByte
  } else if (size > 500 * MegaByte) {
    return 150 * MegaByte;
  } else if (size > 200 * MegaByte) {
    return 100 * MegaByte;
  }
  return 50 * MegaByte;
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
          let promiseArr = file.blocks.map((block) => {
            return global.sha256Chunk(file.path, block.start, block.end - 1, block.chunk)
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
    threads: 2,
    method: 'PUT',
    chunked: true,
    attachInfoToQuery: false,
    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false
})

// console.log('WebUploader', WebUploader);
// console.log('uploader', uploader);

// 在文件入队之前触发
// 文件切片信息在此获取
function beforeFileQueued(file) {
  console.log('beforeFileQueued file', file);
  // 1. 计算文件的 chunkSize
  const chunkSize = calculateSlicedFileSize(file.size)
  file.status = 'inited'
  file.chunkSize = chunkSize
  let originFile = file.getSource().getSource()
  if (originFile.cache) {
    let arr = getCacheFileState()
    let fileInfo = arr.find(f => f.guid == originFile.guid)
    // console.log('fileInfo', fileInfo);
    // file.guid = fileInfo.guid
    // file.path = fileInfo.path
    Object.assign(file, fileInfo)
  }
  store.dispatch( addFile(file) )
}
uploader.on( 'beforeFileQueued', beforeFileQueued)


function getUploadURL(file) {

  var sliceInfo = file.hashList.map((obj) => ({
    sguid: file.guid + obj.chunk,
    s_file_hash: obj.hash
  }))
  // console.log('sliceInfo', sliceInfo);

  var param = {
    username: store.getState().headerState.account_info.username,
    slice: sliceInfo,
  }

  return BTFileFetch('/data/getFileUploadURL', param)
  .then(res => {
    if (res.result == 200) {
      file.url = res.url
      // 5. 成功取得 url，触发上传
      // 在上传之前需要单独处理续传的文件
      // 主要是改变 blocks
      // console.log('file', file);
      // console.log('uploader', uploader);
      if (file.cache) {
        // 是缓存
        file.blocks = file.blocks.filter(({chunk}) =>
          file.progressing_slice_chunk.indexOf(chunk) != -1
        )
        file.remaning = file.blocks.length
        file.status = 'interrupt'
        console.log('updateFile', file);
        store.dispatch( updateFile(file) )
        return
      }
      timeStamp = get_s_short()
      console.log('upload timeStamp', timeStamp);
      return uploader.upload(file)

    } else {
      console.log('res', res);
      file.status = 'error'
      store.dispatch( updateFile(file) )
      window.message.error(res.status)
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
    let t1 = get_ms_short()
    const hashList = await api.getSliceHash()
    // console.log('hashList', hashList.map(item => item.hash));
    console.log('hash 计算耗时', get_ms_short() - t1 + 'ms');
  // }, 5000);
  // return
  file.hashList = hashList

  console.log('文件大小', file.size, WebUploader.formatSize(file.size));
  // console.log('hashList', hashList);
  // 3. 将 hashList 发到后端校验
  BTFileFetch('/data/fileCheck', {hash: hashList})
  .then(res => {
    // console.log('res', res);
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
        message.info(window.localeInfo['File.FileExisted'])
        store.dispatch( deleteFile(file) )
        console.log('res.merkle_root_hash', res.merkle_root_hash);
        deleteFileCache(res.merkle_root_hash)
      } else {
        window.message.error(res.status || window.localeInfo['File.FileExisted'])
        file.status = 'error'
        store.dispatch( updateFile(file) )
      }
      uploader.removeFile(file)
    }

  }).catch(err => {
    console.error('fileCheck catch err', err);
    window.message.error(window.localeInfo['File.UploadFail'])
    uploader.removeFile(file)
    store.dispatch( deleteFile(file) )
  })

}

uploader.on( 'fileQueued', handleFileQueued)


function handleUploadStart(file) {
  let {blocks, ..._file} = file
  _file.status = 'uploading'
  store.dispatch( updateFile(_file) )
  console.log('uploadStart _file', _file);
  // console.log('file', file);
}
uploader.on( 'uploadStart', handleUploadStart)

uploader.on( 'uploadBeforeSend', (obj, data, headers) => {
  // console.log('obj', obj);
  // console.log('data', data);
  let file = obj.file
  // console.log('file', file);
  let urls = file.url
  // console.log('urls', urls);
  data.url = urls[obj.chunk].surl

  // console.log('this.url[chunk].surl', this.url[chunk].surl);
  headers['Access-Control-Allow-Origin'] = '*'
})


// ************ 上传进度监听 *************
function progressChange(file, percentage) {
  // console.log('file.name, percentage', file.name, percentage);
  // 因为这个 percentage 值为 1 的时候比 uploadSuccess 触发要晚
  // 所以做这个判断
  // if (percentage < 0.8) {
  //   // throttle(querySecondProgress.bind(null, file), 2000)
  //   querySecondProgress(file)
  // }
  if (percentage < 1) {
    // store.dispatch( updateUploadProgress(file.guid, percentage * uploadSuccessPercent) )
    myEmitter.emit('uploadProgress', file.guid, percentage * uploadSuccessPercent);
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

  BTFileFetch('/data/getUploadProgress', { username, slice })
  .then(async (res) => {
    console.log('res', res);
    if (res.result != 200) {
      setTimeout(querySecondProgress.bind(null, file), 3000);
    } else if ( res.result == 200 && chunks == res.storage_done ) {
      // 说明存储的等于 上传完成的
      // console.log('上传真的完成', get_s_short() - timeStamp + 's');
      console.log('记录最终时间，不注册', get_s_short() - timeStamp + 's');
      // return
      file.status = 'done'
      // store.dispatch( updateUploadProgress(guid, 100) )
      myEmitter.emit('uploadProgress', guid, 100);
      store.dispatch( updateFile(file) )

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
      // console.log('param', param);

      let blockInfo = await getBlockInfo()
      // console.log('blockInfo', blockInfo);
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

      getSignaturedFetchParam({fetchParam, privateKey})

      console.log('fetchParam', fetchParam);

      BTFetch('/asset/registerFile', 'post', fetchParam)
      .then(res => {
        if (res.code == 1) {
          window.message.success( window.localeInfo['PersonalAsset.SuccessfulToUploadTheFile'] )
        } else if (res.details) {
          console.log('res.details', JSON.parse(res.details))
        }
      })

    } else {
      console.log('上传没有真的完成');
      let restPercent = res.storage_done / chunks * (100 - uploadSuccessPercent)
      // store.dispatch( updateUploadProgress(guid, uploadSuccessPercent + restPercent) )
      myEmitter.emit('uploadProgress', guid, uploadSuccessPercent + restPercent);

      setTimeout(querySecondProgress.bind(null, file), 3000);
      // setTimeout(getDownloadFileIP.bind(null, guid), 1000);
    }

  }).catch(err => {
    console.error('进度查询失败，请稍后再试！', err);
  })

}

uploader.on( 'uploadSuccess', function (file) {
  console.log('uploadSuccess，记录时间', get_s_short() - timeStamp + 's');
  setTimeout(querySecondProgress.bind(null, file), 1000)
});


function onUploadError(file, reason) {
  console.log('file, reason', file, reason);
}

uploader.on( 'uploadError', onUploadError);

export default uploader
