import React,{PureComponent} from 'react'
import {Modal,Input,Button,Upload,Icon,message} from 'antd'
import path from 'path'
import BTCryptTool from '../tools/BTCryptTool'
import BTFetch from '../utils/BTFetch';
import {setAccount,getAccount} from '../tools/localStore'
import {getKeyStore} from '../tools/BTIpcRenderer'
const Buffer = require('buffer').Buffer;
// 文件导入
const importFile = (callback)=>{
    let selectedFile = document.getElementById("files").files[0];//获取读取的File对象
    if(!selectedFile) return;
    let name = selectedFile.name;//读取选中文件的文件名
    let size = selectedFile.size;//读取选中文件的大小
    let reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile);//读取文件的内容
    reader.onload = function(){
        let rs = this.result
        callback(rs)
    }
}

export default class Login extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:false,
            password:'',
            keyStore:''
        }
    }

    sizeof(str, charset){
        var total = 0,
            charCode,
            i,
            len;
        charset = charset ? charset.toLowerCase() : '';
        if(charset === 'utf-16' || charset === 'utf16'){
            for(i = 0, len = str.length; i < len; i++){
                charCode = str.charCodeAt(i);
                if(charCode <= 0xffff){
                    total += 2;
                }else{
                    total += 4;
                }
            }
        }else{
            for(i = 0, len = str.length; i < len; i++){
                charCode = str.charCodeAt(i);
                if(charCode <= 0x007f) {
                    total += 1;
                }else if(charCode <= 0x07ff){
                    total += 2;
                }else if(charCode <= 0xffff){
                    total += 3;
                }else{
                    total += 4;
                }
            }
        }
        return total;
    }

    async onHandleUnlock(){
        // 从keystore中读取出来username
        // getKeyStore((response)=>{
        //     // 将username存放到localStorage中
        //     let username = response.username;
        //     setAccount({username})
        // })

        // let blockInfo = await this.getBlockInfo()
        // let dataInfo = await this.getDataInfo()

        // let sig = '2011ca1777948a32be8c1c020ea8c0a29968b2b43579c66fe8696d5045e5dd3d64517591d037d8f7e899a8cbbc4455ae22d3d2a98c75074a51d046190ad056e70c'

        // let signData = {
        //     "ref_block_num":14802,"ref_block_prefix":3313843535,"expiration":"2018-02-26T03:54:48","scope":["usermng"],"read_scope":[],
        //     "messages":[
        //         {"code":"usermng","type":"userlogin",
        //     "authorization":[
        //         {"account":"wc1","permission":"active"}
        //     ],"data":"03776331d2040000"}]
        // }

        let prikey = '5JU71Xj9P1R7rmzD2vwjGLyjZ4XPPcrjiBPR5SVKn1opEWJz48c'
        console.log({
            prikey:this.sizeof(prikey,'utf-8')
        })
        // let btsign = BTCryptTool.sign(JSON.stringify(signData),prikey)

        // if(btsign==sig){
        //     console.log('sign正确')
        // }else{
        //     console.log('sign失败')
        // }

        // console.log({
        //     signData:JSON.stringify(signData),
        //     // btsign,
        //     // sig
        // })

        // ipcRenderer.send('get-key-store','测试信息')
        // ipcRenderer.on('get-key-store-reply',(event,response)=>{
        //     console.log({response})
        // })

        // let params = {
        //     username:'jslkdfjsdlfj'
        // }

        // ipcRenderer.send('save-key-store',JSON.stringify(params))

        // this.props.onHandleLogin(true)
        // try{
        //     let result = BTCryptTool.aesDecrypto(this.state.keyStore,this.state.password);

        // }
        // catch(error){
        //     message.error('密码或者keyStore文件错误')
        // }
    }

    // 获取区块信息
    async getBlockInfo(){
        let reqUrl = '/user/GetBlockInfo'
        return await BTFetch(reqUrl,'GET')
    }

    // 获取data信息
    async getDataInfo(){
        let reqUrl = '/user/GetBin'
        let params = {
            username:'btd352'
        }
        return await BTFetch(reqUrl,'POST',JSON.stringify(params))
    }

    onHandleUploadKeystore(){
        importFile((result)=>{
            // 拿到加密文件以后，直接解密
            this.setState({
                keyStore:result
            })
        })
    }
    

    closeModal(){
        this.setState({
            visible:false
        })
    }

    render(){
        return(
            <Modal 
                visible={this.state.visible}
                footer={null}
                onCancel={()=>this.closeModal()}
            >
                <div className="marginRight">
                    <div className="container row">
                        <Input placeholder="请输入密码" className="marginRight" onChange={(e)=>{this.setState({password:e.target.value})}}/> 
                        <Button type="danger" onClick={()=>this.onHandleUnlock()}>解锁</Button>
                    </div>
                    <div className="marginTop">
                        {/* <Upload> */}
                            <input type="file" id="files" onChange={()=>this.onHandleUploadKeystore()}/>
                            {/* <Button onClick={()=>this.onHandleUploadKeystore()}>
                            <Icon type="upload" /> 上传Key-Store
                            </Button> */}
                        {/* </Upload> */}
                        {/* <Button type="primary" onClick={()=>{this.onHandleUploadKeystore()}}>上传key-store</Button> */}
                    </div>
                </div>
            </Modal>
        )
    }
}