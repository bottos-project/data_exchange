
// 这里是用来存储文件下载信息的，持久缓存
const DOWNLOADS = 'DOWNLOADS'

function fileCacheKeysFilter(file) {
  const { name, status, guid, remaning, size, hashList, path } = file
  return { id, name, status, guid, remaning, size, hashList, path }
}

var downloadsCache = null;

export function getDownloads() {
  if (!Array.isArray(downloadsCache)) {
    let filesGuidArr = localStorage.getItem(DOWNLOADS)
    downloadsCache = filesGuidArr ? JSON.parse(filesGuidArr) : []
  }
  return downloadsCache;
}

export function addDownloadCache(fileInfo) {
  let filesGuidArr = getDownloads()

  filesGuidArr.push(fileInfo)
  // console.log('filesGuidArr', filesGuidArr);
  let data = JSON.stringify(filesGuidArr)
  localStorage.setItem(DOWNLOADS, data)
}

export function updateDownloadCache(fileInfo) {
  let filesGuidArr = getDownloads()
  let _file = filesGuidArr.find(ele => ele.filePath == fileInfo.filePath)
  console.log('fileInfo', fileInfo);
  _file = fileInfo
  let data = JSON.stringify(filesGuidArr)
  localStorage.setItem(DOWNLOADS, data)
}

export function deleteDownloadCache(guid) {
  let filesGuidArr = getDownloads()
  let index = filesGuidArr.findIndex(file => file.guid == guid)
  if (index == -1) return ;

  filesGuidArr.splice(index, 1)
  localStorage.setItem(DOWNLOADS, JSON.stringify(filesGuidArr))
}

export function cacheDownloadState(file) {
  const {filePath, status} = file
  if (status == 'done') {
    // 传完了之后，就从数组当中去掉
    console.log('传完了之后，就从数组当中去掉', file);

  } else if (status != 'done') {
    // 没有传完
    // 从记录当中找到了
    let filesGuidArr = getDownloads()
    if (filesGuidArr.findIndex(file => file.guid == guid) > -1) {
      return ;
    }
    const fileInfo = fileCacheKeysFilter(file)
    // console.log('fileInfo', fileInfo);
    addDownloadCache(fileInfo)
  } else {
    console.error('cacheDownloadState error', file);
  }
}