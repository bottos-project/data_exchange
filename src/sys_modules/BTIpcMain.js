const {app,ipcMain,dialog} = require('electron')
const fs = require('fs')
const appPath = app.getPath("userData");
const {ipcEventName} = require('../utils/EventName')
const path = require("path")
const BTCrypto = require('bottos-js-crypto')


// create keystore
ipcMain.on(ipcEventName.create_keystore,(event,accountInfo)=>{
     let keystoreObj = BTCrypto.keystore.create(accountInfo)
     event.returnValue = keystoreObj
})

//  获取keystore文件
ipcMain.on(ipcEventName.get_key_store,(event,accountInfo)=>{
    let userName = accountInfo.username;
    let accountName = accountInfo.account_name;
    let keyStorePath = path.join(appPath,userName+'/'+accountName+'.keystore');
    fs.readFile(keyStorePath,'utf8',(error,result)=>{
        if(error){
            event.returnValue = {
                error
            }
        }else{
            let keyStoreObj = JSON.parse(result)
            event.returnValue = {error,result}
        }
    })
})

ipcMain.on(ipcEventName.import_file,(event,options)=>{
    dialog.showOpenDialog(options,(filePaths)=>{
        if(filePaths!=undefined) {
            for(let i=0;i<filePaths.length;i++){
                let filePath = filePaths[i]

                let fileExtern = filePath.substr(filePath.length-9,9);
                if(fileExtern!='.keystore'){
                    event.returnValue = {
                        error:'请导入正确的keystore文件'
                    }
                }else{
                    fs.readFile(filePath,'utf8',(error,result)=>{
                        let keyStoreObj = JSON.parse(result)
                        event.returnValue = keyStoreObj
                    })
                }  
            }
        }else{
            event.returnValue = {
                error:'read file failure'
            }
        }
    })
})

ipcMain.on(ipcEventName.mkdir,(event,username)=>{
    let dirpath = path.join(appPath,username)
    let isExists = fs.existsSync(dirpath)
    if(isExists){
        event.returnValue = true;
    }else{
        try{
            fs.mkdirSync(dirpath)
            event.returnValue = true
        }catch(error){
            event.returnValue = false
        }
    }
})

ipcMain.on(ipcEventName.exists,(event,filePath)=>{
    let realPath = path.join(appPath,filePath)
    let isExists = fs.existsSync(realPath)
    event.returnValue = isExists;
})

ipcMain.on(ipcEventName.save_key_store,(event,accountInfo,params)=>{
    let userName = accountInfo.username;
    let accountName = accountInfo.account_name;

    let dirPath = path.join(appPath,userName);
    let isDirExists = fs.existsSync(dirPath)
    if(!isDirExists){
        fs.mkdirSync(dirPath)
    }

    let keyStorePath = path.join(appPath,userName+'/'+accountName+'.keystore')
    let keyStoreStr = JSON.stringify(params)
    try{
        fs.writeFileSync(keyStorePath,keyStoreStr)
        event.returnValue = true
    }catch(error){
        event.returnValue = false
    }
})

ipcMain.on(ipcEventName.export_key_store,(event,accountName,params)=>{
    dialog.showSaveDialog({
        defaultPath:accountName+'.keystore'
    },(filePath)=>{
        try{
            fs.writeFileSync(filePath,JSON.stringify(params))
        }catch(error){
            event.returnValue = false
        }
    })
})

ipcMain.on(ipcEventName.key_store_list,(event,username)=>{
    let keyStorePath = path.join(appPath,username)

    try{
        let result = fs.readdirSync(keyStorePath)
        event.returnValue = result
    }catch(error){
        event.returnValue = []
    }
})






