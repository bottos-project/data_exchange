/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
import * as actionTypes from '../consts/HeaderConst'

import BTFetch from '../../utils/BTFetch'
import { getSignaturedParam } from '../../utils/BTCommonApi'

export const getUnread = (account_info) => (dispatch, getState) => {
  return BTFetch('/asset/GetUnreadNoticeNum', 'post', getSignaturedParam(account_info))
  .then(res => {
    if (res.code == 1) {
      dispatch( setNoticeNum(res.data) )
    }
  }).catch(err => {
    console.error(err)
  })
}


// // 设置地点
export const setLocale = (locale) => {
    return {
        type: actionTypes.SET_LOCALE,
        locale
    }
}

export const setAccountInfo = (info) => ({
  type: actionTypes.SET_ACCOUNT_INFO,
  info
})

export const setSpin = (isloading) => {
  return {
    type: actionTypes.SET_SPIN,
    isloading
  }
}

export const readMessage = () => ({
  type: actionTypes.READ_MESSAGE
})

export const setNoticeNum = (notice_num) => {
  // console.log('notice_num', notice_num);
  return {
    type: actionTypes.SET_MESSAGE_NUM,
    notice_num
  }
}
