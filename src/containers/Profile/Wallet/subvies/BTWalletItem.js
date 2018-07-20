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
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {Modal,Input,Button} from 'antd'
import BTIpcRenderer from '../../../../tools/BTIpcRenderer'
import BTCryptTool from 'bottos-crypto-js'
import {Link} from 'react-router'
import messages from '../../../../locales/messages'
import {FormattedMessage} from 'react-intl'
const WalletMessages = messages.Wallet;

class BTWalletItem extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            deleteVisible: false,
            confirmAccount: '',
            canDelete: false,
            password:'',
            newPassword:'',
            reNewPassword:''
        }
    }


    showDeleteModal = () => {
      this.setState({
        deleteVisible: true
      });
    }

    inputAccount = (event) => {
      let value = event.target.value
      // console.log('value', value);
      this.setState({
        confirmAccount: value,
        canDelete: value === this.props.accountName
      });
    }

    deleteKeystore = () => {
      const { account_info, accountName } = this.props
      let username = account_info.username
      let result = BTIpcRenderer.getKeyStore({username:username,account_name:accountName})
      console.log('result', result);
      if (result.error) {
        console.error(result.error);
        return ;
      } else {
        return result.keyStoreObj
      }
    }


    onHandleOk(){
        if(this.state.password == '') {window.message.error(window.localeInfo['Wallet.PleaseEnterTheOriginalPassword']);return}
        if(this.state.newPassword == '') {window.message.error(window.localeInfo['Wallet.PleaseEnterTheNewPassword']);return}
        if(this.state.reNewPassword == '') {window.message.error(window.localeInfo['Wallet.PleaseEnterTheNewPasswordAgain']);return}
        // 使用原密码解密账户
       try{
        let keyStoreFile = BTIpcRenderer.getKeyStore(this.props.accountName)
        let keyStoreStr = JSON.parse(keyStoreFile.result)
        let keyStoreString = BTCryptTool.aesDecrypto(keyStoreStr,this.state.password)
        let keyStore = JSON.parse(keyStoreString)

        if(this.state.newPassword!=this.state.reNewPassword){
            window.message.error(window.localeInfo['Header.IncorrectPasswordEnteredTwice'])
            return;
        }
        let privateKeyStr = JSON.stringify(keyStore)
        let cryptStr = BTCryptTool.aesEncrypto(privateKeyStr,this.state.newPassword)
        // 存储keystore文件到本地
        BTIpcRenderer.saveKeyStore(keyStore.account_name,cryptStr)
        window.message.success(window.localeInfo['Wallet.ThePasswordHasBeenModifiedSuccessfully'])
        this.setState({
            visible:false,
            password:'',
            newPassword:'',
            reNewPassword:''
        })
       }catch(error){
           window.message.error(window.localeInfo['Wallet.FailedToModifyThePassword'])
       }
    }

    onHandleCancel(){
      this.setState({
        visible:false,
        password:'',
        newPassword:'',
        reNewPassword:''
      })
    }

    render(){
        return(
          <div className="container route-children-bg accountItem">

            <Modal visible={this.state.deleteVisible}
              title={<FormattedMessage {...WalletMessages.SureToDeleteKeystore} />}
              onOk={this.deleteKeystore}
              onCancel={()=>this.setState({deleteVisible: false})}
              okText={<FormattedMessage {...messages.OK} />}
              cancelText={<FormattedMessage {...messages.Cancel} />}
              okButtonProps={{ disabled: !this.state.canDelete }}
            >
              <FormattedMessage {...WalletMessages.DeleteConfirm} />
              <Input value={this.state.confirmAccount} onChange={this.inputAccount} />
            </Modal>

            {/* <Modal
                visible={this.state.visible}
                onOk={()=>this.onHandleOk()}
                onCancel={()=>this.onHandleCancel()}
                okText={<FormattedMessage {...messages.OK} />}
                cancelText={<FormattedMessage {...messages.Cancel} />}
            >
                <Input style={{marginTop:20,marginBottom:20}} type="password" placeholder={window.localeInfo['Wallet.PleaseEnterTheOriginalPassword']} value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/>
                <Input style={{marginBottom:20}} type="password" placeholder={window.localeInfo['Wallet.PleaseEnterTheNewPassword']} value={this.state.newPassword} onChange={(e)=>this.setState({newPassword:e.target.value})}/>
                <Input type="password" placeholder={window.localeInfo['Wallet.PleaseEnterTheNewPasswordAgain']} value={this.state.reNewPassword} onChange={(e)=>this.setState({reNewPassword:e.target.value})}/>
            </Modal> */}

            <div className="flex accountLeft">
                <div>
                    <Link to={{
                        pathname:'/profile/wallet',
                        query:{selectWallet:this.props.accountName}
                    }}><span className="font25 colorTitle">{this.props.accountName}</span></Link>

                    {/* <span>可用现金</span> */}
                </div>
                {/* <div className="font25 colorRed">{this.props.accounts}</div> */}
            </div>

            <div>
                <Button type="primary" onClick={()=>this.exportAccount(this.props.accountName)}>
                    <FormattedMessage {...WalletMessages.ExportTheAccount }/>
                </Button>
                {/* <Button style={{marginLeft: 20}} type="danger" onClick={this.showDeleteModal}>
                  <FormattedMessage {...WalletMessages.DeleteKeystore}/>
                </Button> */}
            </div>

          </div>
        )
    }
}

const mapStateToProps = (state) => {
  const { account_info } = state.headerState
  return { account_info }
}

export default connect(mapStateToProps)(BTWalletItem)
