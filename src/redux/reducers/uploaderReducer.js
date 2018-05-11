
import { ADD_FILE } from '../actions/uploaderAction'

const initialState = {
  fileList: [],
}

const uploaderReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_FILE:
      return {...state, fileList: state.fileList.concat(action.file)}
    default:
      return state
  }
}

export default uploaderReducer
