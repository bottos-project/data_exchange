import * as actionTypes from '../consts/HeaderConst'

import { getAccount } from '../../tools/localStore'

const initLocale = window.localStorage.getItem('locale') || navigator.language || 'en-US'

const initialState = {
  locale: initLocale,
  account_info: getAccount(),
}

// var account_info = {
//   username,
//   token,
// }


const headerState = (state = initialState, action) => {
    switch(action.type){
      case actionTypes.SET_LOCALE:
        return {...state, locale: action.locale}

      case actionTypes.SET_ACCOUNT_INFO:
        return {...state, account_info: action.info}

      default:
        return state
    }
}

export default headerState
