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

import * as downloadsConst from '../consts/downloadsConst'
import { getDownloads } from '@/utils/downloadFileCache'

const initialState = {
  downloads: getDownloads().slice(),
  visible: false,
}

function addDownload(downloads, file) {
  const index = downloads.findIndex(element => element.filePath == file.filePath)
  if (index != -1) {
    downloads.splice(index, 1)
  }
  return [file].concat(downloads)
}

function updateDownloadsWithFile(downloads, file) {
  if (downloads.length == 1) {
    return [file]
  }
  const index = downloads.findIndex(element => element.filePath == file.filePath)
  console.log('index', index);
  // console.log('downloads, file', downloads, file);
  if (index == -1)
    return downloads;
  else {
    return downloads.slice(0, index).concat(file, downloads.slice(index + 1))
  }
}

const downloadsReducer = (state = initialState, action) => {
  // console.log('state.downloads', state.downloads);
  switch(action.type){
    case downloadsConst.ADD_DOWNLOAD:
      // console.log('state.downloads.length', state.downloads.length);
      let downloads = addDownload(state.downloads, action.file)
      return {...state, downloads}
    case downloadsConst.DELETE_DOWNLOAD:
      return {...state, downloads: state.downloads.filter(file => file.filePath != action.filePath)}
    case downloadsConst.UPDATE_DOWNLOAD:
      return {...state, downloads: updateDownloadsWithFile(state.downloads, action.file)}
    // case downloadsConst.UPDATE_DOWNLOADLIST:
    //   return {...state, downloads: action.downloads}
    // case downloadsConst.UPDATE_DOWNLOAD_PROGRESS:
    //   return {...state, progressMap: {...state.progressMap, [action.guid]: action.percent}}
    case downloadsConst.TOGGLE_VISIBLE:
      return {...state, visible: action.visible}
    default:
      return state
  }
}

export default downloadsReducer
