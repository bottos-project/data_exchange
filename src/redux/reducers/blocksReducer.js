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
