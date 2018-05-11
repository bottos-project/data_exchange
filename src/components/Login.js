import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import { Icon, Input, Button, message, Row, Col } from 'antd'
import BTCryptTool from '@bottos-project/bottos-crypto-js'
import BTFetch from '../utils/BTFetch';
import { getAccount } from '../tools/localStore'
import { setAccountInfo } from '../redux/actions/HeaderAction'
import BTIPcRenderer from '../tools/BTIpcRenderer'
import {importFile} from '../utils/BTUtil'

import ConfirmButton from './ConfirmButton'

import {FormattedMessage} from 'react-intl'
import messages from '../locales/messages'

const LoginMessages = messages.Login;
const HeaderMessages = messages.Header;

const { TextArea } = Input;

class Login extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            keyStore: null,

        }

        this.onHandleUnlock = this.onHandleUnlock.bind(this)
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

        if(!(blockInfo&&blockInfo.code=="0")) {
            message.error(window.localeInfo["Header.LoginFailure"]);
            return
        }

        let data = await this.getDataInfo(username)
        if(!(data && data.code=="0")){
            message.error(window.localeInfo["Header.LoginFailure"]);
            return
        }

        let keyStoreResult = BTIPcRenderer.getKeyStore({
            username:username,
            account_name:username
        });

        let keyStoreObj = this.state.keyStore

        if (keyStoreObj == '' && keyStoreResult.error) {
            message.error(window.localeInfo["Header.PleaseImportTheKeystoreFirst"]);
            return;
        } else {
          // WARNING: 这里的逻辑是，如果本地 userData 文件夹内的 keystore 文件存在
          // 那么就读这个文件，手动导入的文件无关
          // 如果这个文件被篡改的话，那么这个用户就无法登陆了
            if (!keyStoreResult.error) {
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

                    hashHistory.push('/profile/asset')

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

    importKeyStore = () => {
      let keyStoreInfo = BTIPcRenderer.importFile()
      if(!keyStoreInfo.error){
        console.log('keyStoreInfo', keyStoreInfo);
        let keyStoreObj = JSON.parse(keyStoreInfo.result)
        this.setState({
          keyStore: keyStoreObj,
          username: keyStoreInfo.username
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
                <Button type='primary'>粘贴 Keystore 文本</Button>

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
