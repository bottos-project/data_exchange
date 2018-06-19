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
import config from './config.js'
const pkg = require('../../package.json')
import BTIPcRenderer from '../tools/BTIpcRenderer'
import store from '@/redux/store'
import { addDownloadRecord } from '@/redux/actions/downloadAction'
import { basename } from 'path'


// console.log('getFileDownLoadPath', getFileDownLoadPath);

// export const file_server = 'http://139.219.139.198:8080/v3'
var file_server = 'http://139.217.202.68:8080/v3'

if (pkg.MOCK) {
    file_server = config.mock.base_url
} else {
    file_server = config.service.base_url + config.service.version
}


export const BTFileFetch = (url, fetchParam) => {
  return fetch(file_server + url, {
    method: 'POST',
    body: JSON.stringify(fetchParam),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
}

function getDownloadFileIP(guid) {
  return BTFileFetch('/data/getStorageIP', {guid}).then(res => {
    // console.log('getStorageIP res', res);
    // let _snode_ip = 私钥解密后的 snode_ip
    // ip 字段中，sguid 其实是 chunk
    // snode_ip 是加密后的，要通过私钥解密
    if (res.result == 200 || res.message == 'OK') {
      if (res.storage_addr == "") {
        window.message.error(window.localeInfo['PersonalAsset.FailedToDownloadTheFile'])
        throw new Error('Invalid storage address!')
      }
      let addr = JSON.parse(res.storage_addr)
      // console.log('addr', addr);
      let ip = addr.map(({sguid, snode_ip}) => ({
        sguid: guid + sguid,
        snode_ip
      }))
      console.log('ip', ip);
      return { guid, ip, filename: res.file_name }
    }
  })
}


function getFileDownloadURL(param, filename) {
  BTFileFetch('/data/getFileDownloadURL', param).then(res => {
    // console.log('getFileDownLoadURL res', res);
    if (res.message == 'OK' || res.result == '200') {
      let a = document.createElement('a');
      a.href = res.url
      a.download = filename
      a.click();
    }
  })
}


function getFileSliceDownloadURL(param) {
  return BTFileFetch('/data/getFileSliceDownloadURL', param).then(res => {
    // console.log('getFileDownLoadURL res', res);
    if (res.message == 'OK' || res.result == '200') {
      console.log('res url', res.url);
      return res.url;
    }
  })
}


export async function BTDownloadFile(guid, username) {
  // console.log('arguments', arguments);
  // const [guid, username] = arguments
  let { filename, ip } = await getDownloadFileIP(guid)
  if (!ip) {
    return window.message.error('get download file fail')
  }

  // return getFileSliceDownloadURL({ip, username})
  // let urlList = await BTFileFetch('/data/getFileSliceDownloadURL', {ip, username})
  let urlList = await getFileSliceDownloadURL({ip, username})
  if (!urlList) {
    return window.message.error('get download file fail')
  }

  console.log('urlList', urlList);

  // let fPath = BTIPcRenderer.getFileDownLoadPath(, filename, urlList)
  let title = 'file download'
  electron.remote.dialog.showSaveDialog({
    title, defaultPath: filename
  }, filePath => {
    if (!filePath) {
      // 如果 filePath 不存在，就是没有选
      // return 掉
      console.log('filePath 不存在，就是没有选', filePath);
      return ;
    }

    // console.log('basename(filePath)', basename(filePath));

    let params = {
      filePath,
      urlList,
      guid,
    }
    BTIPcRenderer.fileDownLoad(params)

    params.status = 'ready'

    store.dispatch( addDownloadRecord(params) )
    // console.log('fPath', fPath);
  })
  //
  // if (!fPath) {
  //   return ;
  // }
  //
  // let newFilename = fPath.filename
  // console.log('newFilename', newFilename);

  return ;
  // let { filename, ...param } = await getDownloadFileIP(guid)
  // if (!param) {
  //   return window.message.error('get download file fail')
  // }
  // return getFileDownloadURL({...param, username}, filename)
}
