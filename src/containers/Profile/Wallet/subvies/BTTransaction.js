import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { Button, Input, Form, message, InputNumber, Col, Row } from 'antd'
import BTFetch from '../../../../utils/BTFetch';
import {getBlockInfo, getSignaturedFetchParam} from '@/utils/BTCommonApi'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import BTIPcRenderer from "../../../../tools/BTIpcRenderer";
import BTNumberInput from '../../../../components/BTNumberInput'
import ConfirmButton from '@/components/ConfirmButton'
import {transactionPack} from '../../../../lib/msgpack/BTPackManager'
import { SIGPOLL } from 'constants';
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
    constructor(props){
        super(props)

        this.state = {
            quantity:''
        }
    }

    async onHandleSubmit(){
        let account_name = this.props.selectWallet
        let blockInfo = await getBlockInfo()
        let accountInfo = this.props.account_info;
        let username = accountInfo.username
        const { getFieldDecorator,getFieldsValue,getFieldValue,setFields } = this.props.form;
        let fieldValues = getFieldsValue()
        if(!fieldValues.to){
            window.message.error(window.localeInfo["Wallet.PleaseEnterTheTargetAccount"])

            return}
        if(!fieldValues.quantity){
            window.message.error(window.localeInfo["Wallet.PleaseEnterTheMoneyToBeTransferred"])
            return}
        if(!fieldValues.password) {
            window.message.error(window.localeInfo["Wallet.PleaseEnterThePassword"])
            return}
        if(fieldValues.quantity<=0){
            window.message.error(window.localeInfo["Wallet.PleaseEnterAvalidTransferAmount"])
            return}
        let keyStoreResult = BTIPcRenderer.getKeyStore({username:username,account_name:account_name})
        let keyStoreObj = keyStoreResult.keyStoreObj
        let privateKeyResult = BTIPcRenderer.decryptKeystore({password:fieldValues.password,keyStoreObj})
        if(privateKeyResult.error){
            window.message.error("密码错误")
            return
        }
        let privateKeyStr = privateKeyResult.privateKey
        let privateKey = Buffer.from(privateKeyStr,'hex')
        let did = {
            "from": account_name,
            "to": fieldValues.to,
            "price": fieldValues.quantity,
            "remark": "April's rent"
        }
        let didBuf = transactionPack(did)

        let fetchParam = {
          "version": 1,
          ...blockInfo,
          "sender": account_name,
          "contract": "bottos",
          "method": "transfer",
          "sig_alg": 1
        }

        fetchParam.param = didBuf

        console.log('privateKey', privateKey);
        getSignaturedFetchParam({fetchParam, privateKey})

        let url = '/user/transfer'
        BTFetch(url,'POST', fetchParam)
        .then(response=>{
            console.log({response})
        }).catch(error=>{
            console.log({error})
        })
    }

    onChange(value){
        this.setState({
            quantity:value
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className='transaction-form-container route-children-bg'>
              <Form onSubmit={()=>this.onHandleSubmit()} style={{marginTop: 25}}>
                <Row>
                  <Col span='18'>
                    <FormItem label={<FormattedMessage {...WalletMessages.TargetAccount}/>} {...formItemLayout}>
                      {getFieldDecorator('to', {
                        rules: [{ required: true, message: '请填写对方账号!' }],
                      })(<Input />)}
                    </FormItem>

                    <FormItem label={<FormattedMessage {...WalletMessages.TransferAmount}/>} {...formItemLayout}>
                      {getFieldDecorator('quantity', { rules: [{ required: true, message: '请填写转账金额!' }], })(
                        <BTNumberInput value={this.state.quantity} onChange={(e)=>this.onChange(e)}/>
                      )}
                      <div><span style={{color:'purple',fontSize:20,marginLeft:10}}>{this.props.coinName}</span></div>
                      {/* })(<div className="flex row"><InputNumber value={this.state.quantity} onChange={(e)=>this.onChange(e)}/><div><span style={{color:'purple',fontSize:20,marginLeft:10}}>{this.props.coinName}</span></div></div>)} */}
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

let pk = Buffer.from('aaab', 'hex')
console.log('pk', pk);

const TransactionForm = Form.create()(Transaction)

function mapStateToProps(state){
    const account_info = state.headerState.account_info
    return { account_info }
}

export default connect(mapStateToProps)(TransactionForm)
