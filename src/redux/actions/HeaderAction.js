import * as actionTypes from '../consts/HeaderConst'

// // 设置地点
export const setLocale = (locale) => {
    return {
        type: actionTypes.SET_LOCALE,
        locale
    }
}

export const setAccountInfo = (info) => {
  return {
    type: actionTypes.SET_ACCOUNT_INFO,
    info
  }
}

export const setSpin = (isloading) => {
  return {
    type: actionTypes.SET_SPIN,
    isloading
  }
}
