import * as actionTypes from '../consts/HeaderConst'

const initialState = {}

const headerState = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.SHOW_LOGIN_VIEW:
            return action.data

        case actionTypes.HID_LOGIN_VIEW:
            return action.data
        
        default:
            return state
    }
}

export default headerState