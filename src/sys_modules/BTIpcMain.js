const {app,ipcMain,dialog} = require('electron')
const fs = require('fs')
const appPath = app.getAppPath();
const {ipcEventName} = require('../utils/EventName')

//  获取keystore文件
ipcMain.on(ipcEventName.get_key_store,(event,accountInfo)=>{
    let {username,account_name} = accountInfo;
    let keyStorePath = appPath + '/user_data/'+username+'/'+account_name+'.keystore'
    fs.readFile(keyStorePath,'utf8',(error,result)=>{
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

ipcMain.on(ipcEventName.mkdir,(event,dirpath)=>{
    try{
        fs.mkdirSync(dirpath)
        event.returnValue = true
    }catch(error){
        event.returnValue = false
    }
})

ipcMain.on(ipcEventName.exists,(event,path)=>{
    let isExists = fs.existsSync(path)
    event.returnValue = isExists;
})

ipcMain.on(ipcEventName.save_key_store,(event,accountInfo,params)=>{
    let userName = accountInfo.username;
    let accountName = accountInfo.account_info;

    let keyStorePath = appPath + '/user_data/'+userName+'/'+accountName+'.keystore'
    // let keyStorePath = appPath+'/user_data/'+accountName+'.keystore'
    let keyStoreStr = JSON.stringify(params)
    try{
        fs.writeFileSync(keyStorePath,keyStoreStr)
        dialog.showMessageBox({message:"keystore保存成功"})
    }catch(error){
        dialog.showMessageBox({
            error,
            message:"keystore保存失败"
        })
    }
})

ipcMain.on(ipcEventName.export_key_store,(event,accountName,params)=>{
    dialog.showSaveDialog({
        defaultPath:accountName+'.keystore'
    },(filePath)=>{
        try{
            fs.writeFileSync(filePath,JSON.stringify(params))
            dialog.showMessageBox({message:"keystore保存成功"})
        }catch(error){
            dialog.showMessageBox({
                message:"keystore保存失败",
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






