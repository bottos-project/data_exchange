
// export const importFile = (callback)=>{
//     console.log('importFile')
//     let selectedFile = document.getElementById("files").files[0];//获取读取的File对象
//     if(!selectedFile) return;
//     let name = selectedFile.name;//读取选中文件的文件名
//     let size = selectedFile.size;//读取选中文件的大小
//     let reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
//     reader.readAsText(selectedFile);//读取文件的内容
//     reader.onload = function(){
//         let rs = this.result
//         callback(rs)
//     }
// }

// export const exportFile = (value, type, name) =>{  
//     var blob;  
//     if (typeof window.Blob == "function") {  
//         blob = new Blob([value], {type: type});  
//     } else {  
//         var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;  
//         var bb = new BlobBuilder();  
//         bb.append(value);  
//         blob = bb.getBlob(type);  
//     }  
//     var URL = window.URL || window.webkitURL;  
//     var bloburl = URL.createObjectURL(blob);  
//     var anchor = document.createElement("a");  
//     if ('download' in anchor) {  
//         anchor.style.visibility = "hidden";  
//         anchor.href = bloburl;  
//         anchor.download = name;  
//         document.body.appendChild(anchor);  
//         var evt = document.createEvent("MouseEvents");  
//         evt.initEvent("click", true, true);  
//         anchor.dispatchEvent(evt);  
//         document.body.removeChild(anchor);  
//     } else if (navigator.msSaveBlob) {  
//         navigator.msSaveBlob(blob, name);  
//     } else {  
//         window.location.href = bloburl;  
//     }  
// }  

console.log('BTFile')


const {app,ipcMain} = require('electron')
const fs = require('fs')
const appPath = app.getAppPath();

//  获取keystore文件
ipcMain.on('get-key-store',(event,args)=>{
    let keyStorePath = appPath + '/user_data/keystore.bto'
    fs.readFile(keyStorePath,'utf8',(error,result)=>{
        let keyStoreObj = JSON.parse(result);
        event.sender.send('get-key-store-reply',keyStoreObj)
    })
})

ipcMain.on('save-key-store',(event,params)=>{
    let keyStorePath = appPath + '/user_data/keystore.bto'
    fs.writeFile(keyStorePath,params,(error,response)=>{
        // console.log('save-key-store success')
        console.log({
            error,
            response
        })
    })
})








