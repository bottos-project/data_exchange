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
            password:'',
            username:'',
            keyStore:'',
            hasKeystore:false
        }
    }

    async onHandleUnlock(){
        console.log('onHandleUnlock')
        message.destroy()
        if(this.state.password == ''){
            message.error('请输入密码')
            return
        }

        let blockInfo = await this.getBlockInfo();
        let data = await this.getDataInfo()
        let keyStoreResult = BTIPcRenderer.getKeyStore({});
        if(keyStoreResult.error){
            message.error('请先导入keyStore文件')
            return;
        }
        let keyStore = keyStoreResult.result;
        let keyStoreObj = JSON.parse(keyStore)
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
                // blockInfo,
                // data
            }
            BTFetch(url,'POST',params)
            .then(response=>{
                if(response && response.code=='0'){
                    message.success('登录成功')
                    let accountInfo = {
                        username:decryptoData.account_name,
                        token:response.token
                    }
                    setAccount(accountInfo)
                    this.setState({
                        visible:false,
                        password:''
                    })
                    this.props.onHandleLogin(true)
                    // window.location.reload()
                }else{
                    message.error('登录失败')
                }
            }).catch(error=>{
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
    async getDataInfo(){
        let reqUrl = '/user/GetBin'
        let params = {
            // username:'btd352'
        }
        return await BTFetch(reqUrl,'POST')
    }

    closeModal(){
        this.setState({
            visible:false,
            username:'',
            password:''
        })
    }

    importKeyStore(){
        let keyStore = BTIPcRenderer.importFile()
        BTIPcRenderer.saveKeyStore('keystore',keyStore)
    }

    render(){
        return(
            <Modal
                visible={this.state.visible}
                footer={null}
                onCancel={()=>this.closeModal()}
            >
                <div className="marginRight">
                    <div style={{marginBottom:20}}><Button onClick={()=>this.importKeyStore()}>导入keystore文件</Button></div>
                    <div className="container row">
                       <Input placeholder="请输入用户名" className="marginRight" value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}}/> 
                       <Input type="password" placeholder="请输入密码" className="marginRight" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/> 
                        <Button type="danger" onClick={()=>this.onHandleUnlock()}>解锁</Button>
                    </div>
                    {/* {
                        this.state.hasKeystore ? <div></div> : (<div style={{marginTop:20}}><Button onClick={()=>this.importKeyStore()}>导入keystore文件</Button></div>)
                    } */}
                </div>
            </Modal>
        )
    }
}