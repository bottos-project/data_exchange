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
