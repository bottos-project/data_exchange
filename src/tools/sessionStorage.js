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

const COLLECTION_STATE = 'COLLECTION_STATE'
var cache;

// 这个怎么设计
// 存取状态都只提供 type 和 id ，返回 timeStamp

export function getTimeSecond() {
  return parseInt(new Date().getTime() / 1000)
}

const getCollectionObject = () => {
  if (cache) {
    return cache
  }
  let css = sessionStorage.getItem(COLLECTION_STATE)
  let cso = JSON.parse(css)
  if (typeof cso != 'object' || cso == null) {
    cso = {}
  }
  // 缓存在内存当中
  // 以免每次都要读取 sessionStorage
  return cache = cso
}

const saveCollectionObject = () => {
  sessionStorage.setItem(COLLECTION_STATE, JSON.stringify(cache) )
}

const setCollectionState = (type, id) => {
  let state = getCollectionObject()
  if (state[type] == undefined) {
    state[type] = {}
  }
  state[type][id] = parseInt(new Date().getTime() / 1000)
  saveCollectionObject()
}

const deleteCollectionState = (type, id) => {
  let state = getCollectionObject()
  if ( typeof state[type] == 'object' && state[type][id] ) {
    delete state[type][id]
    saveCollectionObject()
  }
}

const getCollectionState = (type, id) => {
  let state = getCollectionObject()
  if (state[type] == undefined || !state[type][id] ) {
    return null
  }
  return state[type][id]
}

const collectionState = {
  set: setCollectionState,
  get: getCollectionState,
  delete: deleteCollectionState
}

export default collectionState
