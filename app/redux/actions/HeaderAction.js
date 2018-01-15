import * as actionTypes from '../consts/HeaderConst'

// 显示登录页
export const showLoginView = (data)=>{
    return {
        type:actionTypes.SHOW_LOGIN_VIEW,
        data
    }
}

// 隐藏登录页面
export const hidLoginView = ()=>{
    return {
        type:actionTypes.HID_LOGIN_VIEW,
        data
    }
}