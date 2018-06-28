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

// account
import { getAccount, deleteAccount, setAccount } from '../../tools/localStore'

const initLocale = window.localStorage.getItem('locale') || navigator.language || 'en-US'

const initialState = {
  locale: initLocale,
  account_info: getAccount(),
  isloading: false,
  notice_num: 0,
}

// var account_info = {
//   username,
//   token,
// }


const headerState = (state = initialState, action) => {
    switch(action.type){
      case actionTypes.SET_LOCALE:
        return {...state, locale: action.locale}

      case actionTypes.SET_SPIN:
        return {...state, isloading: action.isloading}

      case actionTypes.SET_ACCOUNT_INFO:
        if (typeof action.info != 'object') {
          console.error('account error', action.info);
        }
        // localStorage 是为了兼容之前的写法
        if (action.info == null) {
          deleteAccount()
        } else {
          setAccount(action.info)
        }
        return {...state, account_info: action.info}

      case actionTypes.SET_MESSAGE_NUM:
        // console.log('action.notice_num', action.notice_num);
        return {...state, notice_num: action.notice_num}

      case actionTypes.READ_MESSAGE:
        return {...state, notice_num: state.notice_num - 1}

      default:
        return state
    }
}

export default headerState
