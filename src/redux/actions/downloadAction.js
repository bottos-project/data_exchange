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

import { addDownloadCache, cacheDownloadState, updateDownloadCache, deleteDownloadCache } from '@/utils/downloadFileCache'

import * as downloadsConst from '../consts/downloadsConst'

export function addDownloadRecord(params) {
  // let {
  //   path: filePath,
  //   urlList,
  //   guid,
  // } = params
  cacheDownloadState(params)
  return {
    type: downloadsConst.ADD_DOWNLOAD,
    file: params
  }
}

export function deleteDownload(filePath) {
  // var guid = ''
  // if (typeof f == 'string') {
  //   guid = f
  // } else if (typeof f == 'object') {
  //   guid = f.filePath
  // }
  deleteDownloadCache(filePath)
  return {
    type: downloadsConst.DELETE_DOWNLOAD,
    filePath
  };
};

export function updateDownload(file) {
  // console.log('updateFile', file);
  updateDownloadCache(file)
  return {
    type: downloadsConst.UPDATE_DOWNLOAD,
    file,
    // file: fileKeysFilter(file)
  };
};

// export function updateDownloadProgress(guid, percent) {
//   return {
//     type: downloadsConst.UPDATE_DOWNLOAD_PROGRESS,
//     guid, percent
//   };
// };

// export function updateDownloadList(fileList) {
//   return {
//     type: downloadsConst.UPDATE_DOWNLOADLIST,
//     fileList
//   };
// };
