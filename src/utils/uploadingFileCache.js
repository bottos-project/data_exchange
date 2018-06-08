
// 这里是用来存储文件上传信息的，如果
const unDoneFiles = 'unDoneFiles'

function fileCacheKeysFilter(file) {
  const { id, name, status, guid, remaning, size, hashList } = file
  const path = file.path || file.getSource().getSource().path
  return { id, name, status, guid, remaning, size, hashList, path }
}

var unDoneFilesCache = null;

export function getCacheFileState() {
  if (!Array.isArray(unDoneFilesCache)) {
    let filesGuidArr = localStorage.getItem(unDoneFiles)
    unDoneFilesCache = filesGuidArr ? JSON.parse(filesGuidArr) : []
  }
  return unDoneFilesCache;
}

function addFileCache(fileInfo) {
  let filesGuidArr = getCacheFileState()

  filesGuidArr.push(fileInfo)
  // console.log('filesGuidArr', filesGuidArr);
  let data = JSON.stringify(filesGuidArr)
  localStorage.setItem(unDoneFiles, data)
}

export function deleteFileCache(guid) {
  let filesGuidArr = getCacheFileState()
  let index = filesGuidArr.findIndex(file => file.guid == guid)
  if (index == -1) return ;

  filesGuidArr.splice(index, 1)
  localStorage.setItem(unDoneFiles, JSON.stringify(filesGuidArr))
}

export function cacheFileState(file) {
  const {guid, status} = file
  if (status == 'done') {
    // 传完了之后，就从数组当中去掉
    console.log('传完了之后，就从数组当中去掉', file);
    deleteFileCache(guid)
  } else if (status != 'done') {
    // 没有传完
    // 从记录当中找到了
    let filesGuidArr = getCacheFileState()
    if (filesGuidArr.findIndex(file => file.guid == guid) > -1) {
      return ;
    }
    const fileInfo = fileCacheKeysFilter(file)
    // console.log('fileInfo', fileInfo);
    addFileCache(fileInfo)
  } else {
    console.error('cacheFileState error', file);
  }
}
