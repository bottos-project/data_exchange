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
import BTIpcRenderer from '../tools/BTIpcRenderer'
/**
 * 文件导入
 * @param {} callback 导入内容的值的回调
 */
// export const importFile = (callback)=>{
    // console.log('importFile')
    // let selectedFile = document.getElementById("files").files[0];//获取读取的File对象
    // if(!selectedFile) return;
    // let name = selectedFile.name;//读取选中文件的文件名
    // let size = selectedFile.size;//读取选中文件的大小
    // let reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    // reader.readAsText(selectedFile);//读取文件的内容
    // reader.onload = function(){
    //     let rs = this.result
    //     callback(rs)
    // }
// }

/**
 * 文件导出
 * @param {*} value :上传文件的内容 
 * @param {*} type :文件内容的格式 "utf-8"
 * @param {*} name :文件名  keyStore.bto
 */
export const exportFile = (value,name,type='utf8') =>{  
    var blob;  
    if (typeof window.Blob == "function") {  
        blob = new Blob([value], {type: type});  
    } else {  
        var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;  
        var bb = new BlobBuilder();  
        bb.append(value);  
        blob = bb.getBlob(type);  
    }  
    var URL = window.URL || window.webkitURL;  
    var bloburl = URL.createObjectURL(blob);  
    var anchor = document.createElement("a");  
    if ('download' in anchor) {  
        anchor.style.visibility = "hidden";  
        anchor.href = bloburl;  
        anchor.download = name;  
        document.body.appendChild(anchor);  
        var evt = document.createEvent("MouseEvents");  
        evt.initEvent("click", true, true);  
        anchor.dispatchEvent(evt);  
        document.body.removeChild(anchor);  
    } else if (navigator.msSaveBlob) {  
        navigator.msSaveBlob(blob, name);  
    } else {  
        window.location.href = bloburl;  
    }  
}  
