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
// 这里是用来存储文件下载信息的，持久缓存
const DOWNLOADS = 'DOWNLOADS'

function fileCacheKeysFilter(file) {
  const { name, status, guid, remaning, size, hashList, path } = file
  return { id, name, status, guid, remaning, size, hashList, path }
}

var downloadsCache = null;

export function getDownloads() {
  if (!Array.isArray(downloadsCache)) {
    // 说明是从缓存中恢复的
    let filesGuidArr = localStorage.getItem(DOWNLOADS)
    if (filesGuidArr == null) {
      // 缓存中没有，初始化
      downloadsCache = []
    } else {
      // 缓存中有，status 为 cached
      downloadsCache = JSON.parse(filesGuidArr)
      for (let item of downloadsCache) {
        if (item.status != 'done' && item.status != 'cached') {
          item.status = 'cached'
        }
      }
    }
  }
  return downloadsCache;
}

export function addDownloadCache(fileInfo) {
  let filesGuidArr = getDownloads()
  let index = filesGuidArr.findIndex(file => file.filePath == fileInfo.filePath)
  if (index != -1) {
    filesGuidArr.splice(index, 1)
  }

  filesGuidArr.unshift(fileInfo)
  // console.log('filesGuidArr', filesGuidArr);
  let data = JSON.stringify(filesGuidArr)
  localStorage.setItem(DOWNLOADS, data)
}

export function updateDownloadCache(fileInfo) {
  let filesGuidArr = getDownloads()
  let index = filesGuidArr.findIndex(file => file.filePath == fileInfo.filePath)
  if (index == -1) return console.error('cache err');
  console.log('fileInfo', fileInfo);
  filesGuidArr[index] = fileInfo
  let data = JSON.stringify(filesGuidArr)
  localStorage.setItem(DOWNLOADS, data)
}

export function deleteDownloadCache(filePath) {
  let filesGuidArr = getDownloads()
  let index = filesGuidArr.findIndex(file => file.filePath == filePath)
  console.log('index', index);
  if (index == -1) return ;
  filesGuidArr.splice(index, 1)
  localStorage.setItem(DOWNLOADS, JSON.stringify(filesGuidArr))
}

export function cacheDownloadState(fileInfo) {
  const {filePath, status} = fileInfo
  let filesGuidArr = getDownloads()
  let index = filesGuidArr.findIndex(file => file.filePath == filePath)
  console.log('index', index);
  if (index == -1) {
    addDownloadCache(fileInfo)
  } else {
    updateDownloadCache(fileInfo)
  }

  // if (status == 'done') {
  //   // 传完了之后，就从数组当中去掉
  //   console.log('传完了之后，就从数组当中去掉', file);
  //
  // } else if (status != 'done') {
  //   // 没有传完
  //   // 从记录当中找到了
  //   if (filesGuidArr.findIndex(file => file.guid == guid) > -1) {
  //     return ;
  //   }
  //   const fileInfo = fileCacheKeysFilter(file)
  //   // console.log('fileInfo', fileInfo);
  //   addDownloadCache(fileInfo)
  // } else {
  //   console.error('cacheDownloadState error', file);
  // }
}
