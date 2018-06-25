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
import * as localStorage from '../tools/localStore'
const electron = window.electron;
const ipcRenderer = electron.ipcRenderer;
const {ipcEventName} = window.eventName;

/**
 * 通过keystore的文件名来
 * @param {*} fileName 要获取的keystore的文件名，不需要加.bto
 */
const getKeyStore = (accountInfo)=>{
    let responst = ipcRenderer.sendSync(ipcEventName.get_key_store,accountInfo);
    console.log({responst})
    return responst
}

const mkdir = (username)=>{
    return ipcRenderer.sendSync(ipcEventName.mkdir,username)
}

const isExists = (path)=>{
    return ipcRenderer.sendSync(ipcEventName.exists,path)
}

const saveKeyStore = (accountInfo,params)=>{
    return ipcRenderer.sendSync(ipcEventName.save_key_store,accountInfo,params)
}

const importFile = ()=>{
    let fileContent = ipcRenderer.sendSync(ipcEventName.import_file);
    return fileContent
}

const exportKeyStore = (accountName,params)=>{
    ipcRenderer.send(ipcEventName.export_key_store,accountName,params)
}

const getKeyStoreList = ()=>{
    let accountInfo = localStorage.getAccount()
    let keyStoreList = ipcRenderer.sendSync(ipcEventName.key_store_list,accountInfo.username);
    return keyStoreList
}

const getUserList = ()=>{
    let userList = ipcRenderer.sendSync(ipcEventName.user_list);
    return userList
}

const fileDownLoad = ({filePath, urlList, guid}) => {
  // console.log('ipcEventName.file_download', ipcEventName.file_download);
  let params = {filePath, urlList, guid}
  ipcRenderer.send(ipcEventName.file_download, params);
}

const deleteDownLoadCache = ({dirname, urlList, guid}) => {
  let params = {dirname, urlList, guid}
  ipcRenderer.send(ipcEventName.delete_download_cache, params);
}

export default {
    getKeyStore,
    saveKeyStore,
    importFile,
    exportKeyStore,
    getUserList,
    getKeyStoreList,
    mkdir,
    fileDownLoad,
    deleteDownLoadCache
}
