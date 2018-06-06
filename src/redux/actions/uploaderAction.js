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

import { cacheFileState } from '@/utils/uploadingFileCache'

import * as uploaderConst from '../consts/uploaderConst'

function fileKeysFilter(file) {
  if (!file.path && file.getSource()) {
    file.path = file.getSource().getSource().path
  }
  return file
  // const { id, name, status, guid, remaning, size, blocks, cache } = file
  // const path = file.path || file.getSource().getSource().path
  // return { id, name, status, guid, remaning, size, blocks, cache, path }
}

export function addFile(file) {
  return {
    type: uploaderConst.ADD_FILE,
    file: fileKeysFilter(file)
  };
};

export function deleteFile(f) {
  var fid = ''
  if (typeof f == 'string') {
    fid = f
  } else if (typeof f == 'object') {
    fid = f.id
  }
  return {
    type: uploaderConst.DELETE_FILE,
    fid
  };
};

export function updateFile(file) {
  // console.log('updateFile', file);
  cacheFileState(file)
  return {
    type: uploaderConst.UPDATE_FILE,
    file: fileKeysFilter(file)
  };
};

export function updateUploadProgress(guid, percent) {
  return {
    type: uploaderConst.UPDATE_UPLOAD_PROGRESS,
    guid, percent
  };
};

export function updateFileList(fileList) {
  return {
    type: uploaderConst.UPDATE_FILELIST,
    fileList
  };
};
