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
export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'
export const SELECT_ACCOUNT = 'SELECT_ACCOUNT'
export const SET_ACCOUNT_LIST = 'SET_ACCOUNT_LIST'

export function addAccount(account) {
  return {
    type: ADD_ACCOUNT,
    account
  };
}

export function deleteAccount(account) {
  return {
    type: DELETE_ACCOUNT,
    account
  };
}


export function selectAccount(account) {
  return {
    type: SELECT_ACCOUNT,
    account
  };
}

export function setAccountList(accountList) {
  return {
    type: SET_ACCOUNT_LIST,
    accountList
  };
};
