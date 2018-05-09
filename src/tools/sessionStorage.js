
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
