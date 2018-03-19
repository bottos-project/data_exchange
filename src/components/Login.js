import React,{PureComponent} from 'react'
import {Modal,Input,Button,Upload,Icon,message} from 'antd'
import path from 'path'
import BTCryptTool from '../tools/BTCryptTool'
import BTFetch from '../utils/BTFetch';
import {setAccount,getAccount,isLogin} from '../tools/localStore'
import BTIPcRenderer from '../tools/BTIpcRenderer'
import {importFile} from '../utils/BTUtil'
import ecc from 'eosjs-ecc'
const Buffer = require('buffer').Buffer;

export default class Login extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:false,
            username:'',
            password:'',
            keyStore:{},
            hasKeystore:false
        }
    }

    async onHandleUnlock(){
        message.destroy()
        if(this.state.username==''){
            message.error('请输入用户名')
            return
        }

        if(this.state.password == ''){
            message.error('请输入密码')
            return
        }

        let username = this.state.username;
        let blockInfo = await this.getBlockInfo();
        let data = await this.getDataInfo(username)

        if(!(blockInfo&&blockInfo.code=="0")) {
            message.error('登录失败')
            return
        }

        if(!(data && data.code=="0")){
            message.error('登录失败')
            return
        }

        let keyStoreResult = BTIPcRenderer.getKeyStore({
            username:username,
            account_name:username
        });
        if(keyStoreResult.error){
            message.error('请先导入keyStore文件')
            return;
        }
        let keyStoreStr = keyStoreResult.result;
        let keyStoreObj = JSON.parse(keyStoreStr)
        // 用密码解密keyStore
        try{
            let decryptoStr = BTCryptTool.aesDecrypto(keyStoreObj,this.state.password);

            let decryptoData = JSON.parse(decryptoStr);
            if(decryptoData.code!='0'){
                message.error('密码错误，请重新输入密码')
                return;
            }
            
            let url = '/user/login'
    
            let params = {
                ref_block_num: blockInfo.data.ref_block_num,
                "ref_block_prefix": blockInfo.data.ref_block_prefix,
                "expiration": blockInfo.data.expiration,
                "scope": ["usermng"],
                "read_scope": [],
                "messages": [
                    {
                        "code": "usermng",
                        "type": "userlogin",
                        // "authorization": [{
                        //     "account": username,
                        //     "permission": "active"
                        // }],
                        authorization:[],
                        "data": data.data.bin
                    }
                ],
                "signatures": []

            }

            console.log({
                params:JSON.stringify(params)
            })

            BTFetch(url,'POST',params)
            .then(response=>{
                console.log({
                    response
                })
                if(response && response.code=='0'){
                    message.success('登录成功')
                    let accountInfo = {
                        username:decryptoData.account_name,
                        token:response.token
                    }
                    setAccount(accountInfo)
                    this.setState({
                        visible:false,
                        password:'',
                        username:''
                    })
                    this.props.onHandleLogin(true)
                    // window.location.reload()
                }else{
                    console.log("lkdsjflksdjflsdjfl")
                    message.error('登录失败')
                }
            }).catch(error=>{
                console.log("lkdsjflksdjflsdjfl")
                message.error('登录失败')
            })
        }catch(error){
            message.error('密码错误，请重新输入密码')
        } 
    }

    // 获取区块信息
    async getBlockInfo(){
        let reqUrl = '/user/GetBlockInfo'
        return await BTFetch(reqUrl,'GET')
    }

    // 获取data信息
    async getDataInfo(username){
        let reqUrl = '/user/GetDataBin'
        let params = {
            "code":"usermng", 
            "action":"userlogin", 
            "args":{
                "user_name":username,
                "random_num":Math.round(Math.random()*1000)
            }
        }
        return await BTFetch(reqUrl,'POST',params)
    }

    closeModal(){
        this.setState({
            visible:false,
            password:'',
            username:''
        })
    }

    importKeyStore(){
        let keyStoreObj = BTIPcRenderer.importFile()
        if(this.state.password==''){
            message.error('请输入密码')
            return;
        }
    
        try{
            let keyStoreStr = BTCryptTool.aesDecrypto(keyStoreObj,this.state.password);
            let keyStore = JSON.parse(keyStoreStr)
            let account_name = keyStore.account_name;
            // return;
            BTIPcRenderer.saveKeyStore({username:account_name,account_name:account_name},keyStoreObj)
        }catch(error){
            message.error('密码与该keystore文件不匹配')
        }
    }

    render(){
        return(
            <Modal
                visible={this.state.visible}
                onCancel={()=>this.closeModal()}
                onOk={()=>{this.onHandleUnlock()}}
            >
                <div className="marginRight">
                    <div className="marginBottom marginRight" ><Input placeholder="请输入用户名" value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}}/></div>
                    <div className="container row marginTop">
                      <Input type="password" placeholder="请输入密码" className="marginRight" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/>
                    </div>
                    {
                        this.state.hasKeystore ? <div></div> : (<div style={{marginTop:20}}><Button onClick={()=>this.importKeyStore()}>导入keystore文件</Button></div>)
                    }
                </div>
            </Modal>
        )
    }
}