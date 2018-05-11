export const ADD_FILE = 'ADD_FILE'
export const UPDATE_FILELIST = 'UPDATE_FILELIST'

export function addFile(file) {
  return {
    type: ADD_FILE,
    file
  };
};

export function updateFileList(fileList) {
  return {
    type: UPDATE_FILELIST,
    fileList
  };
};
