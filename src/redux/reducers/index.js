import {combineReducers} from 'redux'

import headerState from './HeaderReducer'
import blocksReducer from './blocksReducer'
import uploaderReducer from './uploaderReducer'

const rootReducer = combineReducers({
    headerState,
    blockState: blocksReducer,
    uploaderState: uploaderReducer,
})

export default rootReducer;
