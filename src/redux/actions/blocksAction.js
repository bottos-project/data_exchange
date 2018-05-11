
export const UPDATE_CACHED_BLOCKS = 'UPDATE_CACHED_BLOCKS'
export const UPDATE_LATEST_BLOCK = 'UPDATE_LATEST_BLOCK'
export const SET_NODE_INFOS = 'SET_NODE_INFOS'

export const updateCachedBlocks = (blocks) => {
    return {
        type: UPDATE_CACHED_BLOCKS,
        blocks
    }
}

export const updateLatestBlock = (block) => {
  // console.log('block', block);
    return {
        type: UPDATE_LATEST_BLOCK,
        block
    }
}

export const setNodeInfos = (infos) => {
  // console.log('block', block);
    return {
        type: SET_NODE_INFOS,
        infos
    }
}
