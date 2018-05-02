import * as actionTypes from '../consts/HeaderConst'

import { getAccount } from '../../tools/localStore'

const initLocale = window.localStorage.getItem('locale') || navigator.language || 'en-US'

const initialState = {
  locale: initLocale,
  account_info: getAccount(),
  login_visible: false,
  register_visible: false,
}

const headerState = (state = initialState, action) => {
    switch(action.type){
      case actionTypes.SET_LOCALE:
        return {...state, locale: action.locale}

      case actionTypes.SET_ACCOUNT_INFO:
        return {...state, account_info: action.info}

      case actionTypes.TOGGLE_LOGIN_VIEW_VISIBLE:
        return {...state, login_visible: action.visible}

      case actionTypes.TOGGLE_REGISTER_VIEW_VISIBLE:
        return {...state, register_visible: action.visible}

      default:
        return state
    }
}

export default headerState
