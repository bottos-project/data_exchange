export const file_server = 'http://139.219.139.198:8080/v3'

export const BTFileFetch = (url) => {
  return fetch(file_server + url, {
    method: 'POST',
    body: JSON.stringify({ guid }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
}

function getDownloadFileIP(guid) {
  return BTFileFetch('/data/getStorageIP').then(res => {
    console.log('getStorageIP res', res);
    // let _snode_ip = 私钥解密后的 snode_ip
    // ip 字段中，sguid 其实是 chunk
    // snode_ip 是加密后的，要通过私钥解密
    if (res.result == 200 || res.message == 'OK') {
      let addr = JSON.parse(res.storage_addr)
      console.log('addr', addr);
      let ip = addr.map(({sguid, snode_ip}) => ({
        sguid: guid + sguid,
        snode_ip
      }))
      console.log('ip', ip);
      return { guid, ip }
    }
  })
}


function getFileDownloadURL(param, name) {
  BTFileFetch('/data/getFileDownloadURL').then(res => {
    console.log('getFileDownLoadURL res', res);
    if (res.message == 'OK' || res.result == '200') {
      let a = document.createElement('a');
      a.href = res.url
      a.download = name
      a.click();
    }
  })
}


export function downloadFile(guid, filename, username) {
  return getDownloadFileIP(guid).then(res => {
    return getFileDownloadURL({...res, username}, filename)
  })
}
