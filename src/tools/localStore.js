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
const accountKey = 'account_info'

// AccountTool
export const getAccount = ()=>{
    let account_info = localStorage.getItem(accountKey)
    return JSON.parse(account_info)
}

export const setAccount = (accountInfo)=>{
    return localStorage.setItem(accountKey,JSON.stringify(accountInfo));
}

export const deleteAccount = ()=>{
    return localStorage.removeItem(accountKey)
}

export const isLogin = ()=>{
    let account_info = getAccount()
    return !(account_info == undefined)
}

