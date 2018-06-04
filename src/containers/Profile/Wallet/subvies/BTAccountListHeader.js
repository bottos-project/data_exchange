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
import { Link } from 'react-router'
import {FormattedMessage} from 'react-intl'
import {message,Modal,Button,Input} from 'antd'
import BTIpcRenderer from '../../../../tools/BTIpcRenderer'
import * as localStore from '../../../../tools/localStore'
import BTCryptTool from 'bottos-crypto-js'
import ColorfulButton from '@/components/BTButton/ColorfulButton'

import messages from '../../../../locales/messages'
const WalletMessages = messages.Wallet;


export default class BTAccountListHeader extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            password:'',
            keyStoreObj:'',
            account_name:''
        }
    }

    importAccount = () => {
        this.setState({visible:true})
    }

    importKeyStore(){
        let keyObj = BTIpcRenderer.importFile()
        let keyStoreObj = JSON.parse(keyObj.result)
        this.setState({
            visible:true,
            keyStoreObj:keyStoreObj,
            account_name:keyStoreObj.account
        })
    }

    onHandleOk(){
        if(this.state.password=='') {
            window.message.error(window.localeInfo['Wallet.PleaseEnterThePasswordOfKeystore'])
            return
        }

        let account = localStore.getAccount()
        if(account==undefined) {
            window.message.error(window.localeInfo['Wallet.PleaseLogInFirst'])
            return
        }

        let localStorage = window.localStorage
        let account_info = JSON.parse(localStorage.account_info)
        let username = account_info.username
        let password = this.state.password
        let privateKey = BTIpcRenderer.decryptKeystore({password,keyStoreObj:this.state.keyStoreObj})
        if(privateKey.error){
            window.message.error(window.localeInfo["Header.ThePasswordAndTheKeystoreDoNotMatch"])
            return
        }
        let isSave = BTIpcRenderer.saveKeyStore({username:username,account_name:this.state.account_name},this.state.keyStoreObj)
        isSave ? window.message.success('success') : message.error("failed")
        this.setState({visible:false})
        // window.location.reload()
    }

    onHandleCancel(){
        this.setState({
            visible:false
        })
    }

    render() {
      return (
        <div className="route-children-bg accountListHeader flex center">
          {/* <Link to='/profile/wallet/walletlist/new'> */}
            {/* <ColorfulButton style={{margin: '0 20px'}}>
                <FormattedMessage {...WalletMessages.CreateNewAccount}/>
            </ColorfulButton> */}
          {/* </Link> */}
          <ColorfulButton style={{margin: '0 20px'}} onClick={this.importAccount}>
            <FormattedMessage {...WalletMessages.ImportTheAccount}/>
          </ColorfulButton>
          <Modal
            visible={this.state.visible}
            onOk={()=>this.onHandleOk()}
            onCancel={()=>this.onHandleCancel()}
          >
            <Button onClick={()=>this.importKeyStore()}>
              <FormattedMessage {...WalletMessages.ImportTheKeyStore}/>
            </Button>
            <Input style={{marginBottom:10}} type="password" name="password" placeholder="请输入导入keystore的密码" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}></Input>
          </Modal>
        </div>
      )
    }
}
