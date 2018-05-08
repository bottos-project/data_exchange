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
    return responst
}

const mkdir = (username)=>{
    return ipcRenderer.sendSync(ipcEventName.mkdir,username)
}

const isExists = (path)=>{
    return ipcRenderer.sendSync(ipcEventName.exists,path)
}

const saveKeyStore = (accountInfo,params)=>{
    ipcRenderer.send(ipcEventName.save_key_store,accountInfo,params)
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


export default {
    getKeyStore,
    saveKeyStore,
    importFile,
    exportKeyStore,
    getKeyStoreList,
    mkdir
}
