import React,{PureComponent} from 'react'
import {Modal,Button,Input,Form,message,InputNumber} from 'antd'
import BTFetch from '../../../../utils/BTFetch';
import {getBlockInfo} from '../../../../utils/BTCommonApi'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import BTCryptTool from '../../../../tools/BTCryptTool'
import BTIPcRenderer from "../../../../tools/BTIpcRenderer";
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

export default class BTTransaction extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            keyStore:{},
        }
    }

    commitTransaction(){
        this.setState({
            visible:false
        })
    }

    onHandleCancel(){
        this.setState({
            visible:false

        })
    }

    render(){
        return(
            <Modal
                visible={this.state.visible}
                onOk={()=>this.commitTransaction()}
                onCancel={()=>this.onHandleCancel()}
                footer={null}
            >
                <TransactionForm {...this.props} closeModal={()=>this.onHandleCancel()}/>
            </Modal>
        )
    }
}


class Transaction extends PureComponent{
    constructor(props){
        super(props)
    }

    // 转账
    async onHandleSubmit(){
        message.destroy();
        const { getFieldDecorator,getFieldsValue,getFieldValue,setFields } = this.props.form;
        let fieldValues = getFieldsValue()

        if(!fieldValues.to){
            message.error(window.localeInfo["Wallet.PleaseEnterTheTargetAccount"])

            return}
        if(!fieldValues.quantity){
            message.error(window.localeInfo["Wallet.PleaseEnterTheMoneyToBeTransferred"])
            return}
       /* if(!fieldValues.password) {
            message.error(window.localeInfo["Wallet.PleaseEnterThePassword"])
            return}*/
        if(fieldValues.quantity<=0){
            message.error(window.localeInfo["Wallet.PleaseEnterAvalidTransferAmount"])
            return}


        //根据密码解密keysotre
        // let keyStoreObj = BTIPcRenderer.importFile()

        // console.log(keyStoreObj)
        // let decryptoStr = BTCryptTool.aesDecrypto(keyStoreObj,fieldValues.password);
        // let decryptoData = JSON.parse(decryptoStr);
        /*if(decryptoData.code!='0'){
            message.error(window.localeInfo["Header.TheWrongPassword"]);
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
                quantity:parseFloat(quantity)*Math.pow(10,10)
            }
        }
        let getDataResult = await BTFetch(reqUrl,'POST',dataParams);
        if(!(getDataResult&&getDataResult.code=='0')){
            message.error(window.localeInfo["Wallet.FailedToTransferAccounts"])
            return
        };
        // 获取blockInfo
        let blockInfo = await getBlockInfo()
        if(!(blockInfo&&blockInfo.code=='0')){
            message.error(window.localeInfo["Wallet.FailedToTransferAccounts"])
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
                    message.success(window.localeInfo["Wallet.SuccessfulToTransferAccounts"])
                }else if(response.code==1301){
                    message.error(window.localeInfo["Wallet.TheTargetAccountIsInexistence"]);
                    return
                }else if(response.code==1302){
                    message.error(window.localeInfo["Wallet.InsufficientBalance"]);
                    return
                }else{
                    message.error(window.localeInfo["Wallet.FailedToTransferAccounts"]);
                    return
                }
            }else{
                message.error(window.localeInfo["Wallet.FailedToTransferAccounts"]);
                return
            }

            setFields({
                from:'',
                to:'',
                password:'',
                quantity:''
            })
            this.props.closeModal()
        }).catch(error=>{
            message.error(window.localeInfo["Wallet.FailedToTransferAccounts"])
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form onSubmit={()=>this.onHandleSubmit()} style={{marginTop:15}}>
                        <FormItem label={<FormattedMessage {...WalletMessages.TargetAccount}/>} {...formItemLayout}>
                            {getFieldDecorator('to', {
                                rules: [{ required: true, message: '请填写对方账号!' }],
                            })(<Input />)}
                        </FormItem>

                        <FormItem label={<FormattedMessage {...WalletMessages.TransferAmount}/>} {...formItemLayout}>
                            {getFieldDecorator('quantity', {
                                rules: [{ required: true, message: '请填写转账金额!' }],
                            })(<div><InputNumber min={0} max={Math.pow(10,10)}/><span style={{color:'purple',fontSize:20,marginLeft:10}}>{this.props.coinName}</span></div>)}
                        </FormItem>

                       {/* <FormItem label={<FormattedMessage {...WalletMessages.Password}/>} {...formItemLayout}>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请填写账户密码!' }],
                            })(<Input type="password"/>)}
                        </FormItem>*/}

                        <div className="container marginRight" style={{justifyContent:'flex-end'}}>
                            <Button onClick={()=>this.onHandleSubmit()}>
                                <FormattedMessage {...WalletMessages.Submit}/>
                            </Button>
                        </div>
                    </Form>
            </div>
        )
    }
}

const TransactionForm = Form.create()(Transaction)
