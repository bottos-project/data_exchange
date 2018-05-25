import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { Button, Input, Form, message, InputNumber, Col, Row } from 'antd'
import BTFetch from '../../../../utils/BTFetch';
import {getBlockInfo} from '../../../../utils/BTCommonApi'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import BTCryptTool from 'bottos-js-crypto'
import BTIPcRenderer from "../../../../tools/BTIpcRenderer";
import BTNumberInput from '../../../../components/BTNumberInput'
import ConfirmButton from '@/components/ConfirmButton'
import {transactionPack} from '../../../../lib/msgpack/BTPackManager'
import {messageSign} from '@/lib/sign/BTSign'
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
        let params = {
            "version": 1,
            ...blockInfo,
            "sender": account_name,
            "contract": "assetmanager@bottoscon",
            "method": "datafilereg",
            "sig_alg": 1
        }

        let did = {
            "from": account_name,
            "to": fieldValues.to,
            "price": fieldValues.quantity,
            "remark": "April's rent"
        }

        let didBuf = transactionPack(did)
        params.param = didBuf
        let sign = messageSign(params,privateKey)
        params.param = BTCryptTool.buf2hex(didBuf)
        params.signatures = sign

        let url = '/user/transfer'
        BTFetch(url,'POST',params)
        .then(response=>{
            console.log({response})
        }).catch(error=>{
            console.log({error})
        })
    }

    // 转账
    async onHandleSubmit1(){
        message.destroy();
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


        //根据密码解密keysotre
        // let keyStoreObj = BTIPcRenderer.importFile()

        // console.log(keyStoreObj)
        // let decryptoStr = BTCryptTool.aesDecrypto(keyStoreObj,fieldValues.password);
        // let decryptoData = JSON.parse(decryptoStr);
        /*if(decryptoData.code!='0'){
            window.message.error(window.localeInfo["Header.TheWrongPassword"]);
            return;
        }*/
        // 通过密码获取from账户名
        let from = this.props.selectWallet;
        let to = fieldValues.to;
        let quantity = fieldValues.quantity;
        // 对keystore进行解密

        // 获取data
        let reqUrl = '/user/GetDataBin'
        let dataParams = {
            code:'currency',
            action:'transfer',
            args:{
                from:from,
                to:to,
                quantity:parseFloat(quantity)*Math.pow(10, 8)
            }
        }

        let getDataResult = await BTFetch(reqUrl,'POST',dataParams);
        if(!(getDataResult&&getDataResult.code=='0')){
            window.message.error(window.localeInfo["Wallet.FailedToTransferAccounts"])
            return
        };
        // 获取blockInfo
        let blockInfo = await getBlockInfo()
        if(!(blockInfo&&blockInfo.code=='0')){
            window.message.error(window.localeInfo["Wallet.FailedToTransferAccounts"])
            return
        };
        let blockInfoData = blockInfo.data;

        let scope = [from,to].sort()
        let transactionUrl = '/user/transfer'
        let transactionParams = {
                "ref_block_num": blockInfoData.ref_block_num,
                "ref_block_prefix": blockInfoData.ref_block_prefix,
                "expiration": blockInfoData.expiration,
                "scope": scope,
                "read_scope": [],
                "messages": [{
                    "code": "currency",
                    "type": "transfer",
                    "authorization": [],
                    "data": getDataResult.data.bin
                }],
                "signatures": []
        }

        BTFetch(transactionUrl,'POST',transactionParams).then(response=>{
            message.destroy()

            if(response){
                if(response.code==0){
                    window.message.success(window.localeInfo["Wallet.SuccessfulToTransferAccounts"])
                }else if(response.code==1301){
                    window.message.error(window.localeInfo["Wallet.TheTargetAccountIsInexistence"]);
                    return
                }else if(response.code==1302){
                    window.message.error(window.localeInfo["Wallet.InsufficientBalance"]);
                    return
                }else{
                    window.message.error(window.localeInfo["Wallet.FailedToTransferAccounts"]);
                    return
                }
            }else{
                window.message.error(window.localeInfo["Wallet.FailedToTransferAccounts"]);
                return
            }

            this.props.closeModal()
        }).catch(error=>{
            window.message.error(window.localeInfo["Wallet.FailedToTransferAccounts"])
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

const TransactionForm = Form.create()(Transaction)

function mapStateToProps(state){
    const account_info = state.headerState.account_info
    return { account_info }
}

export default connect(mapStateToProps)(TransactionForm)

// const mapStateToProps = (state) => {
//     console.log({
//         state
//     })
//     return {
//         visible: state.profileWalletState.quantity
//     }
// }


// const mapDispatchToProps = (dispatch) => {
//     return {
//         setQuantity(quantity) {

//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(BTTransaction)
