
import { ADD_FILE, DELETE_FILE, UPDATE_FILE_PROGRESS } from '../actions/uploaderAction'

const initialState = {
  fileList: [],
  progressMap: {}
}

// function updateFileListWithFile(fileList, file) {
//   const index = fileList.findIndex(element => element.id == file.id)
// }

const uploaderReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_FILE:
      return {...state, fileList: state.fileList.concat(action.file)}
    case DELETE_FILE:
      return {...state, fileList: state.fileList.filter(file => file.id != action.fid)}
    case UPDATE_FILE_PROGRESS:
      return {...state, progressMap: {...state.progressMap, [action.guid]: action.percent}}
    default:
      return state
  }
}

export default uploaderReducer
