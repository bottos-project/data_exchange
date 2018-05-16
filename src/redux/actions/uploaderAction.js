export const ADD_FILE = 'ADD_FILE'
export const DELETE_FILE = 'DELETE_FILE'
export const UPDATE_FILE_PROGRESS = 'UPDATE_FILE_PROGRESS'
export const UPDATE_FILELIST = 'UPDATE_FILELIST'

export function addFile(file) {
  return {
    type: ADD_FILE,
    file
  };
};


export function deleteFile(fid) {
  return {
    type: DELETE_FILE,
    fid
  };
};



export function updateFileProgress(guid, percent) {
  return {
    type: UPDATE_FILE_PROGRESS,
    guid, percent
  };
};




export function updateFileList(fileList) {
  return {
    type: UPDATE_FILELIST,
    fileList
  };
};
