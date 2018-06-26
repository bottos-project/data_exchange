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
import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import BTCryptTool from 'bottos-crypto-js'
import { Icon, Input, Button, Row, Col, Select } from 'antd'
import BTFetch from '@/utils/BTFetch';
import { getAccount } from '@/tools/localStore'
import { setAccountInfo, setSpin } from '@/redux/actions/HeaderAction'
import BTIPcRenderer from '@/tools/BTIpcRenderer'
import {importFile} from '@/utils/BTUtil'
import ConfirmButton from '../ConfirmButton'
import {FormattedMessage} from 'react-intl'
import messages from '@/locales/messages'
import {queryProtoEncode} from '@/lib/proto/index'
import { getWorker } from '@/workerManage'
import KeyStoreLogin from './KeyStoreLogin'

const LoginMessages = messages.Login;
const HeaderMessages = messages.Header;
const { TextArea } = Input;
const Option = Select.Option;

class Login extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            keyStore: null,
            verify_code:'',
            mode: 'username', // username or keystore
            accountList: BTIPcRenderer.getUserList()
        }

        this.onHandleUnlock = this.onHandleUnlock.bind(this)
    }

    getKeyStoreObj() {
      if (this.state.mode == 'username') {
        if(this.state.username==''){
          message.error(window.localeInfo["Header.PleaseSelectTheAccount"]);
          return
        }
        let account = this.state.username
        let result = BTIPcRenderer.getKeyStore({username:account,account_name:account})
        console.log('result', result);
        if (result.error) {
          console.error(result.error);
          return ;
        } else {
          return result.keyStoreObj
        }
      } else {
        return JSON.parse(this.state.keyStore);
      }

    }

    async onHandleUnlock(){
        message.destroy()


        if(this.state.password == ''){
            message.error(window.localeInfo["Header.PleaseEnterThePassword"]);
            return
        }
        let keyStoreObj = this.getKeyStoreObj()
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

        this.props.setSpin(true)

        let postData = {
          type: 'decryptKeystore',
          data: {password,keyStoreObj}
        }

        var myWorker = getWorker()
        myWorker.postMessage(postData);

        myWorker.onmessage = (e) => {
          let result = e.data
          // console.log('result', result);
          let privateKey = result.privateKey;

          let signature = this.getSignature(username,privateKey)
          let params = {
            ...signature,
            username,
            verify_id:this.props.verify_id,
            verify_value:this.state.verify_code
          }

          let url = '/user/login'
          BTFetch(url,'POST',params)
          .then(response => {
            console.log('response', response)
            if (response) {
              if (response && response.code == 1) {
                window.message.success(window.localeInfo["Header.LoginSucceed"])
                let accountInfo = {username,privateKey}
                this.props.setAccountInfo(accountInfo)
                this.saveKeyStore(keyStoreObj)
                hashHistory.push('/profile/asset')
              } else if (response.code==1001) {
                this.props.requestVerificationCode()
                message.warning(window.localeInfo["Header.VerificationCodeWrong"]);
              } else if (response.code==1000 && typeof response.details == 'string') {
                this.props.requestVerificationCode()
                try {
                  let details = JSON.parse(response.details)
                  if (details.errcode == 10204) {
                    message.info(window.localeInfo["Header.AccountIsNotExisted"]);
                  }
                  console.error(response.msg, );
                } catch (e) {
                  console.error(e);
                  message.error(window.localeInfo["Header.LoginFailure"]);
                }
              } else {
                this.props.requestVerificationCode()
                message.error(window.localeInfo["Header.LoginFailure"]);
              }
            }
            this.props.setSpin(false)
          }).catch(error=>{
            this.props.setSpin(false)
            message.error(window.localeInfo["Header.LoginFailure"]);
            console.error(error);
          })

        }

        myWorker.onerror = (e) => {
          console.error(e);
          window.message.error(window.localeInfo["Header.TheWrongPassword"]);
          this.props.setSpin(false)
        }

    }


    getSignature(username,privateKeyStr){
        let privateKey = Buffer.from(privateKeyStr,'hex')
        let random = window.uuid()
        let msg = {username,random}
        let query_pb = require('@/lib/proto/query_pb')
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

    // keyStore文件保存
    saveKeyStore(keyStoreObj) {
      let account = keyStoreObj.account;
      BTIPcRenderer.saveKeyStore({username:account,account_name:account},keyStoreObj)
    }

    changeMode = (mode) => {
      this.setState({mode})
    }

    changeKeyStore = (keyStore) => {
      this.setState({keyStore})
    }

    changeAccount = (username) => {
      this.setState({username})
    }

    render() {
      const rowStyle = {
        maxWidth: 560,
        marginTop: 20,
      }

      // console.log('this.state.accountList', this.state.accountList);
      let list = this.state.accountList.map(acc => {
        return <Option key={acc}>{acc}</Option>
      })
      // list.push(<Option key={1}>adfadfadfadf</Option>)

      return (
        <div className="container column login-container">

          <div className='route-children-container-title'><FormattedMessage {...HeaderMessages.Login} /></div>

          {
            this.state.mode == 'keystore'
            ?
            <KeyStoreLogin
              changeMode={this.changeMode}
              changeKeyStore={this.changeKeyStore}
              keyStore={this.state.keyStore}
              mode={this.state.mode}
            />
            :
            <Row style={rowStyle}>
              <Col span={5} style={{ textAlign: 'right' }}>
                <span className='label'><FormattedMessage {...LoginMessages.Account} /></span>
              </Col>
              <Col span={12}>
                <Select onChange={this.changeAccount} style={{width: '100%'}} placeholder={window.localeInfo["Header.PleaseSelectTheAccount"]}>
                  {list}
                </Select>
                {/* <Input placeholder={window.localeInfo["Header.PleaseSelectTheAccount"]} className="marginRight" onChange={(e)=>{}}/> */}
              </Col>
              <Col offset={1} span={5}>
                <Button onClick={this.changeMode.bind(this, 'keystore')}>导入新账户</Button>
              </Col>
            </Row>

          }


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
              <Col span={11}>
                  <Input placeholder={window.localeInfo["Header.PleaseEnterTheVerificationCode"]} className="marginRight" onChange={(e)=>{this.setState({verify_code:e.target.value})}}/>
              </Col>
              <Col span={8}>
                  {this.props.verify_data
                  ?
                  <img height='28px'
                      style={{marginBottom: 6, cursor: 'pointer'}}
                      onClick={this.props.requestVerificationCode}
                      src={this.props.verify_data} />
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
    },
    setSpin(isloading) {
      dispatch(setSpin(isloading))
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
