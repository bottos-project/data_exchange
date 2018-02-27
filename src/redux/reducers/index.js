import {combineReducers} from 'redux'

import headerState from './HeaderReducer'
import homeState from './HomeReducer'

const rootReducer = combineReducers({
    headerState,
    homeState
})

export default rootReducer;