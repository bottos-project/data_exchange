import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import { Input, Button, message } from 'antd'
import BTCryptTool from 'bottos-js-crypto'
import BTFetch from '../utils/BTFetch';
import { getAccount } from '../tools/localStore'
import { setAccountInfo } from '../redux/actions/HeaderAction'
import BTIPcRenderer from '../tools/BTIpcRenderer'
import {importFile} from '../utils/BTUtil'

import ConfirmButton from './ConfirmButton'

import {FormattedMessage} from 'react-intl'
import messages from '../locales/messages'
import {queryProtoEncode} from '../lib/proto/index'
const LoginMessages = messages.Login;
const HeaderMessages = messages.Header;

class Login extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            username:'',
            password:'',
            keyStore:'',
            hasKeystore:false
        }

        this.onHandleUnlock = this.onHandleUnlock.bind(this)
    }

    async onHandleUnlock(){
        message.destroy()
        // if(this.state.username==''){
        //     message.error(window.localeInfo["Header.PleaseEnterTheUserName"]);
        //     return
        // }

        // if(this.state.password == ''){
        //     message.error(window.localeInfo["Header.PleaseEnterThePassword"]);
        //     return
        // }

        let username = this.state.username;
        // let blockInfo = await this.getBlockInfo();
        // let data = await this.getDataInfo(username)

        // if(!(blockInfo&&blockInfo.code=="0")) {
        //     message.error(window.localeInfo["Header.LoginFailure"]);
        //     return
        // }

        // if(!(data && data.code=="0")){
        //     message.error(window.localeInfo["Header.LoginFailure"]);
        //     return
        // }

        // let keyStoreResult = BTIPcRenderer.getKeyStore({
        //     username:username,
        //     account_name:username
        // });

        // let keyStoreObj = this.state.keyStore

        // if(keyStoreObj=='' && keyStoreResult.error){
        //     message.error(window.localeInfo["Header.PleaseImportTheKeystoreFirst"]);
        //     return;
        // }else{
        //     if(keyStoreResult.error){
        //         keyStoreObj = this.state.keyStore
        //     }else{
        //         let keyStoreStr = keyStoreResult.result;
        //         keyStoreObj = JSON.parse(keyStoreStr)
        //     }
        // }

        // 用密码解密keyStore
        // try{
        //     let decryptoStr = BTCryptTool.aesDecrypto(keyStoreObj,this.state.password);
        //     let decryptoData = JSON.parse(decryptoStr);
        //     if(decryptoData.code!='0'){
        //         message.error(window.localeInfo["Header.TheWrongPassword"]);
        //         return;
        //     }
        //     // 如果是导入的keystore，保存到本地
        //     if(this.state.keyStore){this.saveKeyStore(keyStoreObj)}
        //     this.setState({keyStore:''})
        //     let url = '/user/login'

            // let params = {
            //     ref_block_num: blockInfo.data.ref_block_num,
            //     "ref_block_prefix": blockInfo.data.ref_block_prefix,
            //     "expiration": blockInfo.data.expiration,
            //     "scope": ["usermng"],
            //     "read_scope": [],
            //     "messages": [
            //         {
            //             "code": "usermng",
            //             "type": "userlogin",
            //             // "authorization": [{
            //             //     "account": username,
            //             //     "permission": "active"
            //             // }],
            //             authorization:[],
            //             "data": data.data.bin
            //         }
            //     ],
            //     "signatures": []

            // }
        //     BTFetch(url,'POST',params)
        //     .then(response=>{
        //         if(response && response.code=='0'){
        //             message.success(window.localeInfo["Header.LoginSucceed"]);
        //             let accountInfo = {
        //                 username:decryptoData.account_name,
        //                 token:response.token
        //             }
        //             this.props.setAccountInfo(accountInfo)

        //             hashHistory.replace('/dashboard')

        //             // window.location.reload()
        //         }else{
        //             message.error(window.localeInfo["Header.LoginFailure"]);
        //         }
        //     }).catch(error=>{
        //         message.error(window.localeInfo["Header.LoginFailure"]);
        //     })
        // }catch(error){
        //     message.error(window.localeInfo["Header.TheWrongPassword"]);
        // }

        let signature = this.getSignature(username)
        let params = {
            ...signature,
            username
        }
        
        let url = '/user/login'
        BTFetch(url,'POST',params)
        .then(response=>{
            console.log({response})
        }).catch(error=>{
            console.log({error})
        })
    }

    getSignature(username){
        let privateKeyStr = 'e474e51e8ba5c98135d09c61d6398600206c96e3bf601c9239fe4736d68180f2'
        let privateKey = Buffer.from(privateKeyStr,'hex') 
        let random = window.uuid
        let msg = {username,random}
        let query_pb = require('../lib/proto/query_pb')
        let loginProto = queryProtoEncode(query_pb,msg)
        let hash = BTCryptTool.sha256(BTCryptTool.buf2hex(loginProto))
        let signature = BTCryptTool.sign(hash,privateKey).toString('hex')
        return {signature,random}
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
      const inputContainerStyle = {
        minWidth: 300,
        display: 'flex',
        alignItem: 'center',
      }
        return (
          <div className="container column login-container">
            <div className='route-children-container-title'><FormattedMessage {...HeaderMessages.Login} /></div>
            <div style={inputContainerStyle}>
              <span style={{width: 90, lineHeight: '32px'}}><FormattedMessage {...LoginMessages.Account} /></span>
              <Input placeholder={window.localeInfo["Header.PleaseEnterTheUserName"]} value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}}/>
            </div>
            <div className="row marginTop" style={inputContainerStyle}>
              <span style={{width: 90, lineHeight: '32px'}}><FormattedMessage {...LoginMessages.Password} /></span>
              <Input type="password" placeholder={window.localeInfo["Header.PleaseEnterThePassword"]} className="marginRight" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/>
            </div>
            {
                this.state.hasKeystore
                ?
                <div></div>
                :
                (<div style={{marginTop:20}}>
                  <Button onClick={()=>this.importKeyStore()}>
                    <FormattedMessage {...LoginMessages.ImportTheKeyStore}/>
                  </Button>
                </div>)
            }
            <div style={{textAlign: 'center'}}>
              <ConfirmButton onClick={this.onHandleUnlock}><FormattedMessage {...HeaderMessages.Login} /></ConfirmButton>
            </div>
          </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setAccountInfo(info) {
            dispatch( setAccountInfo(info) )
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)
