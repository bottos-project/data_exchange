import {combineReducers} from 'redux'

import headerState from './HeaderReducer'

const rootReducer = combineReducers({
    headerState
})

export default rootReducer;