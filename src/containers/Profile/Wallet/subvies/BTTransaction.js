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
import {connect} from 'react-redux'
import {setSpin} from '../../../../redux/actions/HeaderAction'
import PropTypes from 'prop-types';
import { Button, Input, Form, message, InputNumber, Col, Row } from 'antd'
import BTFetch from '../../../../utils/BTFetch';
import {getBlockInfo, getSignaturedFetchParam} from '@/utils/BTCommonApi'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import BTIPcRenderer from "../../../../tools/BTIpcRenderer";
import BTNumberInput from '../../../../components/BTNumberInput'
import ConfirmButton from '@/components/ConfirmButton'
import { getWorker } from '@/workerManage'
import {transactionPack} from '../../../../lib/msgpack/BTPackManager'
import myEmitter from '../../../../utils/eventEmitter'
import TokenSymbol from '@/components/TokenSymbol'

import { SIGPOLL } from 'constants';
import * as BTCrypto from 'bottos-crypto-js'
const WalletMessages = messages.Wallet;
const FormItem = Form.Item;


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};


class Transaction extends PureComponent{

    async onHandleSubmit(){
        let {resetFields} = this.props.form
        // let account_info = this.props.account_info
        let selectedAccount = this.props.selectedAccount
        let token_type = this.props.token_type
        let localStorage = window.localStorage

        const { getFieldDecorator,getFieldsValue,getFieldValue,setFields,setFieldsValue } = this.props.form;
        let fieldValues = getFieldsValue()

        let quantity = Number(fieldValues.quantity)
        if(!fieldValues.to){
          window.message.error(window.localeInfo["Wallet.PleaseEnterTheTargetAccount"])
          return
        }
        if (fieldValues.to == selectedAccount) {
          window.message.error(window.localeInfo["Wallet.CannotTransferToSelf"])
          return
        }
        if(!quantity){
          window.message.error(window.localeInfo["Wallet.PleaseEnterTheMoneyToBeTransferred"])
          return
        }
        if(!fieldValues.password) {
          window.message.error(window.localeInfo["Wallet.PleaseEnterThePassword"])
          return
        }
        if (quantity <= 0) {
          window.message.error(window.localeInfo["Wallet.PleaseEnterAvalidTransferAmount"])
          return
        }
        if (quantity * Math.pow(10,8) > this.props.balance) {
          window.message.error(window.localeInfo["Wallet.PleaseEnterAvalidTransferAmount"])
          return
        }

        let blockInfo = await getBlockInfo()

        let keyStoreResult = BTIPcRenderer.getKeyStore({username: selectedAccount, account_name: selectedAccount})
        console.log('keyStoreResult', keyStoreResult);
        let keyStoreObj = keyStoreResult.keyStoreObj
        // 开启遮罩
        this.props.setSpin(true)
        var myWorker = getWorker();
        let postData = {
          type: 'decryptKeystore',
          data: {password:fieldValues.password,keyStoreObj}
        }
        myWorker.postMessage(postData);
        myWorker.onmessage = (e)=>{
            let data = e.data
            let privateKeyStr = data.privateKey
            let privateKey = Buffer.from(privateKeyStr,'hex')
            let did = {
                "from": selectedAccount,
                "to": fieldValues.to,
                token_type,
                "price": quantity * Math.pow(10,8)
            }
            let didBuf = transactionPack(did)
            let fetchParam = {
            "version": 1,
            ...blockInfo,
            "sender": selectedAccount,
            "contract": token_type === "BTO" ? "bottos" : "commontoken",
            "method": "transfer",
            "sig_alg": 1
            }

            fetchParam.param = didBuf
            getSignaturedFetchParam({fetchParam, privateKey})
            let url = '/user/transfer'

            // return ;
            BTFetch(url,'POST', fetchParam)
            .then(res=>{
              if (!res) {
                throw new Error('transfer error')
              }
              if (res.code == 1) {
                  message.success(window.localeInfo["Wallet.SuccessfulToTransferAccounts"])
                  this.props.balanceReduce(quantity)
                  setTimeout(() => {
                    // 在一秒之后触发 transfer 事件
                    myEmitter.emit('transfer', res);
                  }, 1000);
                  resetFields()
              } else if (res.code == 10105) {
                  message.error(window.localeInfo["Wallet.TheTargetAccountIsInexistence"])
              } else {
                throw new Error('transfer error')
              }
              this.props.setSpin(false)
            }).catch(error=>{
              console.error('err', error);
              this.props.setSpin(false)
              window.message.error(window.localeInfo["Wallet.FailedToTransferAccounts"])
            })
        }

        myWorker.onerror = (e)=>{
            message.error(window.localeInfo["Wallet.TheWrongPassword"])
            this.props.setSpin(false)
        }
    }

    render(){
      const { getFieldDecorator } = this.props.form;
      return (
        <div className='transaction-form-container'>
          <Form className='route-children-bg'
            onSubmit={()=>this.onHandleSubmit()}
            style={{marginTop: 5, paddingTop: 20}}
            >
            <Row>
              <Col span='18'>
                <FormItem label={<FormattedMessage {...WalletMessages.TargetAccount}/>} {...formItemLayout}>
                  {getFieldDecorator('to', {
                    rules: [{ required: true, message: '请填写对方账号!' }],
                  })(<Input />)}
                </FormItem>

                <FormItem label={<FormattedMessage {...WalletMessages.TransferAmount}/>} {...formItemLayout} onValuesChange={console.log("onValuesChange")}>
                  {getFieldDecorator('quantity', { rules: [{ required: true, message: '请填写转账金额!' }], })(
                    <BTNumberInput />
                    // {/* <React.Fragment><BTNumberInput /> {<TokenSymbol type={this.props.token_type} />}</React.Fragment> */}
                  )}
                  {/* <div><span style={{color:'purple',fontSize:20,marginLeft:10}}>{this.props.coinName}</span></div> */}
                  <TokenSymbol type={this.props.token_type} />
                </FormItem>

                <FormItem label={<FormattedMessage {...WalletMessages.Password}/>} {...formItemLayout}>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请填写账号密码!' }],
                  })(<Input type="password"/>)}
                </FormItem>
              </Col>
              <Col span='6'>
                <div className="container marginRight" style={{ height: 100, paddingTop: 60, paddingLeft: 30 }}>
                    <ConfirmButton onClick={()=>this.onHandleSubmit()}>
                        <FormattedMessage {...WalletMessages.Submit}/>
                    </ConfirmButton>
                </div>
              </Col>
            </Row>
              {/**<FormItem label={<FormattedMessage {...WalletMessages.Password}/>} {...formItemLayout}>
                  {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请填写账户密码!' }],
                  })(<Input type="password"/>)}
              </FormItem>**/}
          </Form>
        </div>
      )
    }
}

const TransactionForm = Form.create()(Transaction)

TransactionForm.propTypes = {
  token_type: PropTypes.oneOf(['BTO', 'DTO']),
  selectedAccount: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};


const mapStateToProps = (state) => {
  const account_info = state.headerState.account_info
  const { selectedAccount } = state.walletState
  return { account_info, selectedAccount }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSpin(isloading) {
          dispatch(setSpin(isloading))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm)
