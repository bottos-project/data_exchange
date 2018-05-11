// import * as actionTypes from '../consts/HeaderConst'

// import { SELECT_ACCOUNT } from '../actions/'

const initialState = {
  selectedAccount: '',
}

const walletReducer = (state = initialState, action) => {
    switch(action.type) {
      case SELECT_ACCOUNT:
        return {...state, selectedAccount: action.account}
      default:
        return state
    }
}

export default walletReducer
