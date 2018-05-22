import React,{PureComponent} from 'react'
import { Link } from 'react-router'
import {FormattedMessage} from 'react-intl'
import {message,Modal,Button,Input} from 'antd'
import BTIpcRenderer from '../../../../tools/BTIpcRenderer'
import * as localStore from '../../../../tools/localStore'
import BTCryptTool from '@bottos-project/bottos-crypto-js'
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
        console.log({keyObj})
        this.setState({
            visible:true,
            keyStoreObj:JSON.parse(keyObj.result),
            account_name:keyObj.account_name
        })
    }

    onHandleOk(){
        if(this.state.password=='') {
            message.error('请输入KeyStore文件的密码')
            return
        }

        let account = localStore.getAccount()
        if(account==undefined) {
            message.error('请先登录')
            return
        }

        let localStorage = window.localStorage
        let username = localStorage.username
        let password = this.state.password
        let privateKey = BTIpcRenderer.decryptKeystore({password,keyStoreObj:this.state.keyStoreObj})
        if(privateKey.error){
            message.error(window.localeInfo["Header.ThePasswordAndTheKeystoreDoNotMatch"])
            return
        }
        BTIPcRenderer.saveKeyStore({username:username,account_name:this.state.account_name},this.state.keyStoreObj)
        this.setState({visible:false})
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
