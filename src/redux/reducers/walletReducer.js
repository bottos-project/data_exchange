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

import { ADD_ACCOUNT,
  DELETE_ACCOUNT,
  SELECT_ACCOUNT,
  SET_ACCOUNT_LIST,
} from '../actions/walletAction'
import { getAccount } from '../../tools/localStore'

const initAccount = getAccount() ? getAccount().username : ''
const accountList = initAccount ? [initAccount] : []

const initialState = {
  accountList,
  selectedAccount: initAccount,
}

const walletReducer = (state = initialState, action) => {
    switch(action.type) {
      case ADD_ACCOUNT:
        return {
          ...state,
          accountList: state.accountList.concat(action.account)
        }
      case DELETE_ACCOUNT:
        return {
          ...state,
          accountList: state.accountList.filter(a => a != action.account)
        }
      case SELECT_ACCOUNT:
        return {...state, selectedAccount: action.account}
      case SET_ACCOUNT_LIST:
        return {...state, accountList: action.accountList}
      default:
        return state
    }
}

export default walletReducer
