const {app,ipcMain,dialog} = require('electron')
const fs = require('fs')
const appPath = app.getAppPath();
const {ipcEventName} = require('../utils/EventName')
const electron = require('electron')

//  获取keystore文件
ipcMain.on(ipcEventName.get_key_store,(event,fileName)=>{
    let keyStorePath = appPath + '/user_data/'+fileName+'.keystore'
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

ipcMain.on(ipcEventName.save_key_store,(event,accountName,params)=>{
    let keyStorePath = appPath + '/user_data/'+accountName+'.keystore'

    let keyStoreStr = JSON.stringify(params)
    try{
        fs.writeFileSync(keyStorePath,keyStoreStr)
    }catch(error){
        dialog.showMessageBox({message:"keystore保存失败"})
    }
})

ipcMain.on(ipcEventName.export_key_store,(event,accountName,params)=>{
    const options = {
        title: 'Save an Image',
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
        ]
      }
      dialog.showSaveDialog(options, function (filename) {
        event.sender.send('saved-file', filename)
      })
    // dialog.showSaveDialog({
    //     defaultPath:accountName+'.keystore'
    // },(filePath)=>{
    //     try{
    //         fs.writeFileSync(filePath,JSON.stringify(params))
    //     }catch(error){
    //         dialog.showMessageBox({message:"keystore保存失败"})
    //     }
    // })
})

ipcMain.on(ipcEventName.key_store_list,(event)=>{
    let keyStorePath = appPath+'/user_data/'
    let result = fs.readdirSync(keyStorePath)
    event.returnValue = result
})

ipcMain.on('save-dialog', function (event) {
    const options = {
      title: 'Save an Image',
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
      ]
    }
    dialog.showSaveDialog(options, function (filename) {
      event.sender.send('saved-file', filename)
    })
  })




