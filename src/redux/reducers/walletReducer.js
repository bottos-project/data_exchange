
import { SELECT_ACCOUNT } from '../actions/walletAction'

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
