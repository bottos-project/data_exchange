import React,{PureComponent} from 'react'
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
            password:''
        }
    }

    importAccount = () => {
        this.setState({
            visible:true,
            keyStoreStr:''
        })
    }

    importKeyStore(){
        let keyStoreStr = BTIpcRenderer.importFile()
        this.setState({
            keyStoreStr
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
        try {
            let keyStoreCryptStr = BTCryptTool.aesDecrypto(this.state.keyStoreStr,this.state.password)
            let keyStore = JSON.parse(keyStoreCryptStr);
            let accountInfo = {
                username:account.username,
                account_name:keyStore.account_name
            }
            BTIpcRenderer.saveKeyStore(accountInfo,this.state.keyStoreStr);
            this.setState({password:'',visible:false})
            window.location.reload()
        } catch(error) {
            message.error('密码错误')
        }
    }

    onHandleCancel(){
        this.setState({
            visible:false
        })
    }

    render() {
      return (
        <div className="route-children-bg accountListHeader flex center">
          <ColorfulButton style={{margin: '0 20px'}}>
            <FormattedMessage {...WalletMessages.CreateNewAccount}/>
          </ColorfulButton>
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
