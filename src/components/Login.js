import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import BTCryptTool from 'bottos-js-crypto'
import { Icon, Input, Button, message, Row, Col } from 'antd'
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
const { TextArea } = Input;
const electron = window.electron
const clipboard = electron.clipboard


class Login extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            keyStore: null,
            verify_data:'',
            verify_id:'',
            verify_code:''
        }

        this.onHandleUnlock = this.onHandleUnlock.bind(this)
    }

    componentDidMount(){
        this.requestVerificationCode()
    }

    requestVerificationCode = () => {

        BTFetch('/user/getVerify', 'get').then(res => {
          if(res && res.code==1){
              this.setState({
                  verify_data:res.data.verify_data,
                  verify_id:res.data.verify_id
              })
          }
        })
  
      }

    async onHandleUnlock(){
        message.destroy()
        // if(this.state.username==''){
        //     message.error(window.localeInfo["Header.PleaseEnterTheUserName"]);
        //     return
        // }

        if(this.state.password == ''){
            message.error(window.localeInfo["Header.PleaseEnterThePassword"]);
            return
        }
        let keyStoreObj = JSON.parse(this.state.keyStore)
        let username = keyStoreObj.account;
        let password = this.state.password;
        // let blockInfo = await this.getBlockInfo();

        // if(!(blockInfo&&blockInfo.code=="0")) {
        //     message.error(window.localeInfo["Header.LoginFailure"]);
        //     return
        // }

        // let data = await this.getDataInfo(username)
        // if(!(data && data.code=="0")){
        //     message.error(window.localeInfo["Header.LoginFailure"]);
        //     return
        // }

        let result = BTIPcRenderer.decryptKeystore({password,keyStoreObj})
        if(result.error){
            message.error(window.localeInfo["Header.TheWrongPassword"]);
            return;
        }

        let privateKey = result.privateKey;

        let signature = this.getSignature(username,privateKey)
        let params = {
            ...signature,
            username,
            verify_id:this.state.verify_id,
            verify_value:this.state.verify_code
        }

        let url = '/user/login'
        BTFetch(url,'POST',params)
            .then(response=>{
                console.log({response})
                if(response){
                    if(response && response.code==1){
                        window.message.success(window.localeInfo["Header.LoginSucceed"])
                        let accountInfo = {username,privateKey}
                        this.props.setAccountInfo(accountInfo)
                        hashHistory.push('/profile/asset')
                    }else if(response.code==1001){
                        message.warning('verify code is wrong');
                    }else{
                        message.error(window.localeInfo["Header.LoginFailure"]);
                    }
                }
            }).catch(error=>{
                message.error(window.localeInfo["Header.LoginFailure"]);
            })
    }


    getSignature(username,privateKeyStr){
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

    importKeyStore = () => {
      let keyStoreInfo = BTIPcRenderer.importFile()
      if(!keyStoreInfo.error){
        let keyStoreObj = keyStoreInfo.result
        this.setState({
          keyStore: keyStoreObj,
          username: keyStoreInfo.username
        })
        window.message.success(window.localeInfo["Header.ImportKeyStoreSuccess"])
      }else{
        message.error(window.localeInfo["Header.ImportKeyStoreFaild"])
      }
    }

    parseKeystore = ()=>{
        let keyStore = clipboard.readText()
        console.log({keyStore})
        this.setState({
            keyStore:keyStore
        })
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
      const rowStyle = {
        maxWidth: 560,
        marginTop: 20,
      }
      return (
        <div className="container column login-container">
          <div className='route-children-container-title'><FormattedMessage {...HeaderMessages.Login} /></div>
          <Row style={rowStyle}>
            <Col span={5} style={{ textAlign: 'right' }}>
              <span className='label'><FormattedMessage {...LoginMessages.Account} /></span>
            </Col>
            <Col span={18}>
              <TextArea
                disabled={!!this.state.username}
                placeholder={window.localeInfo["Header.PleaseEnterTheUserName"]}
                rows={6}
                value={this.state.keyStore}
                onChange={(e)=>this.setState({keyStore:e.target.value})}
              />
            </Col>
          </Row>

          {this.state.username && <div className='flex center'>
            <Icon type="file" />{this.state.username}.keystore
          </div>}

          <Row style={rowStyle}>
            {/* <Col span={5} style={{height: '100%'}}></Col> */}
            <Col span={18} offset={5}>
              <Row type='flex' justify='space-around'>
                <Button type='primary' onClick={this.parseKeystore}>粘贴 Keystore 文本</Button>

                <Button type='primary' onClick={this.importKeyStore}>
                  <FormattedMessage {...LoginMessages.ImportTheKeyStore}/>
                </Button>
              </Row>
            </Col>
          </Row>

          <Row style={rowStyle}>
            <Col span={5} style={{ textAlign: 'right' }}>
              <span className='label'><FormattedMessage {...LoginMessages.Password} /></span>
            </Col>
            <Col span={18}>
              <Input type="password" placeholder={window.localeInfo["Header.PleaseEnterThePassword"]} className="marginRight" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/>
            </Col>
          </Row>

          <Row style={rowStyle}>
                <Col span={5} style={{ textAlign: 'right' }}>
                    <span className="label"><FormattedMessage {...LoginMessages.VerifyCode} /></span>
                </Col>
                <Col span={7}>
                    <Input placeholder={window.localeInfo["Header.PleaseEnterTheVerificationCode"]} className="marginRight" onChange={(e)=>{this.setState({verify_code:e.target.value})}}/>
                </Col>
                <Col span={8}>
                    {this.state.verify_data
                    ?
                    <img height='28px'
                        style={{marginBottom: 6, cursor: 'pointer'}}
                        onClick={this.requestVerificationCode}
                        src={this.state.verify_data} />
                    :
                    <Icon type='spin' style={{backgroundColor:'red'}}/>
                    }
                </Col>
           </Row>

          <div className='flex center marginTop'>
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
