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

import * as uploaderConst from '../consts/uploaderConst'

const initialState = {
  fileList: [],
  progressMap: {}
}

function updateFileListWithFile(fileList, file) {
  if (fileList.length == 1) {
    return [file]
  }
  const index = fileList.findIndex(element => element.id == file.id)
  console.log('index', index);
  // console.log('fileList, file', fileList, file);
  if (index == -1)
    return fileList;
  else {
    return fileList.slice(0, index).concat(file, fileList.slice(index + 1))
  }
}

const uploaderReducer = (state = initialState, action) => {
  switch(action.type){
    case uploaderConst.ADD_FILE:
      return {...state, fileList: state.fileList.concat(action.file)}
    case uploaderConst.DELETE_FILE:
      return {...state, fileList: state.fileList.filter(file => file.id != action.fid)}
    case uploaderConst.UPDATE_FILE:
      return {...state, fileList: updateFileListWithFile(state.fileList, action.file)}
    case uploaderConst.UPDATE_FILELIST:
      return {...state, fileList: action.fileList}
    case uploaderConst.UPDATE_UPLOAD_PROGRESS:
      return {...state, progressMap: {...state.progressMap, [action.guid]: action.percent}}
    default:
      return state
  }
}

export default uploaderReducer
