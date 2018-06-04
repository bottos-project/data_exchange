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
// import * as actionTypes from '../consts/HeaderConst'

import { UPDATE_CACHED_BLOCKS, UPDATE_LATEST_BLOCK, SET_NODE_INFOS } from '../actions/blocksAction'

const initialState = {
  cachedBlocks: [],
  latestBlock: null,
  nodeInfos: [],
}

const blocksReducer = (state = initialState, action) => {
    switch(action.type){
      case UPDATE_CACHED_BLOCKS:
        return {...state, cachedBlocks: action.blocks}
      case UPDATE_LATEST_BLOCK:
        // console.log('action.block', action.block);
        return {...state, latestBlock: action.block}
      case SET_NODE_INFOS:
        return {...state, nodeInfos: action.infos}
      default:
        return state
    }
}

export default blocksReducer
