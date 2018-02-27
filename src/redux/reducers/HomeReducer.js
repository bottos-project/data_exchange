import * as actionTypes from '../consts/HomeConst'

const initialState = {
    headerState:{
        locale:'en-US'
    }
}

const homeState = (state = initialState,action)=>{
    switch(action.type){
        case actionTypes.ENLOCALE:
            return action.data
        case actionTypes.ZHLOCALE:
            return action.data
        default:
            return state
    }
}

export default homeState