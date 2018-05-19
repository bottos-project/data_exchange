
import { ADD_FILE, DELETE_FILE, UPDATE_FILE, UPDATE_UPLOAD_PROGRESS } from '../actions/uploaderAction'

const initialState = {
  fileList: [],
  progressMap: {}
}

function updateFileListWithFile(fileList, file) {
  if (fileList.length == 1) {
    return [file]
  }
  const index = fileList.indexOf(element => element.id == file.id)
  if (index == -1)
    return fileList;
  else {
    return fileList.slice(0, index).concat(file, fileList.slice(index + 1))
  }
}

const uploaderReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_FILE:
      return {...state, fileList: state.fileList.concat(action.file)}
    case DELETE_FILE:
      return {...state, fileList: state.fileList.filter(file => file.id != action.fid)}
    case UPDATE_FILE:
      return {...state, fileList: updateFileListWithFile(state.fileList, action.file)}
    case UPDATE_UPLOAD_PROGRESS:
      return {...state, progressMap: {...state.progressMap, [action.guid]: action.percent}}
    default:
      return state
  }
}

export default uploaderReducer
