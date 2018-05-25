export const file_server = 'http://139.219.139.198:8080/v3'

export const BTFileFetch = (url, fetchParam) => {
  return fetch(file_server + url, {
    method: 'POST',
    body: JSON.stringify(fetchParam),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
}

function getDownloadFileIP(guid) {
  return BTFileFetch('/data/getStorageIP', {guid}).then(res => {
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


function getFileDownloadURL(param, filename) {
  BTFileFetch('/data/getFileDownloadURL', param).then(res => {
    console.log('getFileDownLoadURL res', res);
    if (res.message == 'OK' || res.result == '200') {
      let a = document.createElement('a');
      a.href = res.url
      a.download = filename
      a.click();
    }
  })
}


export async function downloadFile(guid, filename, username) {
  let param = await getDownloadFileIP(guid)
  if (!param) {
    return window.message.error('get download file fail')
  }
  return getFileDownloadURL({...param, username}, filename)
}
