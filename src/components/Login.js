import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import { toggleLoginViewVisible } from '../redux/actions/HeaderAction'
import {Modal,Input,Button,Upload,Icon,message} from 'antd'

import BTCryptTool from '@bottos-project/bottos-crypto-js'
import BTFetch from '../utils/BTFetch';
import { getAccount } from '../tools/localStore'
import { setAccountInfo } from '../redux/actions/HeaderAction'
import BTIPcRenderer from '../tools/BTIpcRenderer'
import {importFile} from '../utils/BTUtil'
import {FormattedMessage} from 'react-intl'
import messages from '../locales/messages'
const LoginMessages = messages.Login;
const Buffer = require('buffer').Buffer;

class Login extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            username:'',
            password:'',
            keyStore:'',
            hasKeystore:false
        }
    }

    async onHandleUnlock(){
        message.destroy()
        if(this.state.username==''){
            message.error(window.localeInfo["Header.PleaseEnterTheUserName"]);
            return
        }

        if(this.state.password == ''){
            message.error(window.localeInfo["Header.PleaseEnterThePassword"]);
            return
        }

        let username = this.state.username;
        let blockInfo = await this.getBlockInfo();
        let data = await this.getDataInfo(username)

        if(!(blockInfo&&blockInfo.code=="0")) {
            message.error(window.localeInfo["Header.LoginFailure"]);
            return
        }

        if(!(data && data.code=="0")){
            message.error(window.localeInfo["Header.LoginFailure"]);
            return
        }

        let keyStoreResult = BTIPcRenderer.getKeyStore({
            username:username,
            account_name:username
        });

        let keyStoreObj = this.state.keyStore

        if(keyStoreObj=='' && keyStoreResult.error){
            message.error(window.localeInfo["Header.PleaseImportTheKeystoreFirst"]);
            return;
        }else{
            if(keyStoreResult.error){
                keyStoreObj = this.state.keyStore
            }else{
                let keyStoreStr = keyStoreResult.result;
                keyStoreObj = JSON.parse(keyStoreStr)
            }
        }
        
        // 用密码解密keyStore
        try{
            let decryptoStr = BTCryptTool.aesDecrypto(keyStoreObj,this.state.password);
            let decryptoData = JSON.parse(decryptoStr);
            if(decryptoData.code!='0'){
                message.error(window.localeInfo["Header.TheWrongPassword"]);
                return;
            }
            // 如果是导入的keystore，保存到本地
            if(this.state.keyStore){this.saveKeyStore(keyStoreObj)}
            this.setState({keyStore:''})

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
            BTFetch(url,'POST',params)
            .then(response=>{
                if(response && response.code=='0'){
                    message.success(window.localeInfo["Header.LoginSucceed"]);
                    let accountInfo = {
                        username:decryptoData.account_name,
                        token:response.token
                    }
                    this.props.setAccountInfo(accountInfo)
                    this.props.closeLoginView()
                    this.setState({
                        password:'',
                        username:''
                    })
                    this.props.onHandleLogin(true)
                    // window.location.reload()
                }else{
                    message.error(window.localeInfo["Header.LoginFailure"]);
                }
            }).catch(error=>{
                message.error(window.localeInfo["Header.LoginFailure"]);
            })
        }catch(error){
            message.error(window.localeInfo["Header.TheWrongPassword"]);
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
        this.props.closeLoginView()
        this.setState({
            password:'',
            username:'',
            keyStore:{}
        })
    }

    importKeyStore(){
        let keyStoreObj = BTIPcRenderer.importFile()
        if(!keyStoreObj.error){
            this.setState({
                keyStore:keyStoreObj
            })
            message.success(window.localeInfo["Header.ImportKeyStoreSuccess"])
        }else{
            message.error(window.localeInfo["Header.ImportKeyStoreFaild"])
        }
    }

    // keyStore文件保存
    saveKeyStore(keyStoreObj){
        if(keyStoreObj.error){
            message.error(keyStoreObj.error)
            return;
        }
        if(this.state.password==''){
            message.error(window.localeInfo["Header.PleaseEnterThePassword"]);
            return;
        }

        try{
            let keyStoreStr = BTCryptTool.aesDecrypto(keyStoreObj,this.state.password);
            let keyStore = JSON.parse(keyStoreStr)
            let account_name = keyStore.account_name;
            // return;
            console.log("saveKeyStore____________")
            BTIPcRenderer.saveKeyStore({username:account_name,account_name:account_name},keyStoreObj)
        }catch(error){
            message.error(window.localeInfo["Header.ThePasswordAndTheKeystoreDoNotMatch"]);
        }
    }

    render() {
        return(
            <Modal
                visible={this.props.visible}
                onCancel={()=>this.closeModal()}
                onOk={()=>{this.onHandleUnlock()}}
            >
                <div className="marginRight">
                    <div className="marginBottom marginRight" ><Input placeholder={window.localeInfo["Header.PleaseEnterTheUserName"]} value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}}/></div>
                    <div className="container row marginTop">
                        <Input type="password" placeholder={window.localeInfo["Header.PleaseEnterThePassword"]} className="marginRight" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/>
                    </div>
                    {
                        this.state.hasKeystore ? <div></div> : (<div style={{marginTop:20}}><Button onClick={()=>this.importKeyStore()}><FormattedMessage {...LoginMessages.ImportTheKeyStore}/></Button></div>)
                    }
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visible: state.headerState.login_visible
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeLoginView() {
            dispatch( toggleLoginViewVisible(false) )
        },
        setAccountInfo(info) {
            dispatch( setAccountInfo(info) )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
