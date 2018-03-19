const {app,ipcMain,dialog} = require('electron')
const fs = require('fs')
const appPath = app.getAppPath();
const {ipcEventName} = require('../utils/EventName')
const path = require("path")

//  获取keystore文件
ipcMain.on(ipcEventName.get_key_store,(event,accountInfo)=>{
    let userName = accountInfo.username;
    let accountName = accountInfo.account_name;
    let keyStorePath = path.join(__dirname,'../user_data/'+userName+'/'+accountName+'.keystore');
    // let keyStorePath = appPath + '/user_data/'+fileName+'.keystore'
    fs.readFile(keyStorePath,'utf8',(error,result)=>{
        let keyStoreObj = JSON.parse(result)
        event.returnValue = {error,result}
    })
})

ipcMain.on(ipcEventName.import_file,(event,options)=>{
    dialog.showOpenDialog(options,(filePaths)=>{
        if(filePaths!=undefined) {
            for(let i=0;i<filePaths.length;i++){
                let filePath = filePaths[i]
                fs.readFile(filePath,'utf8',(error,result)=>{
                    let keyStoreObj = JSON.parse(result)
                    event.returnValue = keyStoreObj
                })
            }
        }else{
            event.returnValue = {
                error:'read file failure'
            }
        }
    })
})

ipcMain.on(ipcEventName.mkdir,(event,username)=>{

    let dirpath = path.join(__dirname,'../user_data/'+username+'/')
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
    let realPath = path.join(__dirname,'../../'+filePath)
    let isExists = fs.existsSync(realPath)
    event.returnValue = isExists;
})

ipcMain.on(ipcEventName.save_key_store,(event,accountInfo,params)=>{
    let userName = accountInfo.username;
    let accountName = accountInfo.account_name;

    let dirPath = path.join(__dirname,'../user_data/'+userName);
    let isDirExists = fs.existsSync(dirPath)
    if(!isDirExists){
        fs.mkdirSync(dirPath)
    }

    let keyStorePath = path.join(__dirname,'../user_data/'+userName+'/'+accountName+'.keystore')
    let keyStoreStr = JSON.stringify(params)
    try{
        fs.writeFileSync(keyStorePath,keyStoreStr)
        dialog.showMessageBox({message:"keystore导入成功"})
    }catch(error){
        dialog.showMessageBox({
            message:"keystore保导入失败"
        })
    }
})

ipcMain.on(ipcEventName.export_key_store,(event,accountName,params)=>{
    dialog.showSaveDialog({
        defaultPath:accountName+'.keystore'
    },(filePath)=>{
        try{
            fs.writeFileSync(filePath,JSON.stringify(params))
            dialog.showMessageBox({message:"keystore导入成功"})
        }catch(error){
            dialog.showMessageBox({
                message:"keystore导入失败",
                error:JSON.stringify(error)
            })
        }
    })
})

ipcMain.on(ipcEventName.key_store_list,(event)=>{
    let keyStorePath = appPath+'/user_data/'
    let result = fs.readdirSync(keyStorePath)
    event.returnValue = result
})






