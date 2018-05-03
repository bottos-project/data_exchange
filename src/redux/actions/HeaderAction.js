import * as actionTypes from '../consts/HeaderConst'
// account
import { deleteAccount, setAccount } from '../../tools/localStore'

// // 设置地点
export const setLocale = (locale) => {
    return {
        type: actionTypes.SET_LOCALE,
        locale
    }
}

// 登录页面
export const toggleLoginViewVisible = (visible) => {
    return {
        type: actionTypes.TOGGLE_LOGIN_VIEW_VISIBLE,
        visible
    }
}


export const setAccountInfo = (info) => {
  if (typeof info != 'object') {
    console.error('account error', info);
  }
  // localStorage 是为了兼容之前的写法
  if (info == null) {
    deleteAccount()
  } else {
    setAccount(info)
  }
  return {
    type: actionTypes.SET_ACCOUNT_INFO,
    info
  }
}


// 注册框
export const toggleRegisterViewVisible = (visible) => {
    return {
        type: actionTypes.TOGGLE_REGISTER_VIEW_VISIBLE,
        visible
    }
}
