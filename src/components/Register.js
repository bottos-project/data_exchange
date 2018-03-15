import React,{PureComponent} from 'react'
import {Modal,Form, Icon, Input, Button,Radio,Checkbox,message} from 'antd'
import BTFetch from '../utils/BTFetch'
import BTCryptTool from '../tools/BTCryptTool'
import './styles.less'
import BTIpcRenderer from '../tools/BTIpcRenderer'
import {exportFile} from '../utils/BTUtil'

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

export default class IsRegister extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            isRegist:false,
            fieldValues:{}
        }
    }
    
    handleCancel(){
       if(!this.state.isRegist){
            this.registForm.setFields({
                username:'',
                email:'',
                password:'',
                user_type:0,
                role_type:0
            })
       }

        this.setState({
            visible:false,
            isRegist:false
        })
    }

    registSuccess(params){
        this.setState({
            isRegist:params.isRegist,
            cryptStr:params.cryptStr,
            username:params.username
        })
    }

    render(){
        return (
        <Modal visible={this.state.visible}
                       width={400}
                       onOk={()=>this.handleOk()}
                       onCancel={()=>this.handleCancel()}
                       title='注册'
                       maskClosable='false'
                       footer={null}
        >
           {
               this.state.isRegist ? <BTRegistSuccess  handleCancel={()=>this.handleCancel()} {...this.state}/> : <RegistForm handleCancel={()=>this.handleCancel()} ref={(ref)=>this.registForm = ref} registSuccess={(params)=>{this.registSuccess(params)}}/>
           }
        </Modal>)
    }
}

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

class Regist extends PureComponent{
    constructor(props){
        super(props)
    }

    clearFields(){
        const {setFields} = this.props.form;

        setFields({
            username:'',
            email:'',
            password:'',
            user_type:0,
            role_type:0
        })
    }

    async onHandleSubmit(){
        message.destroy()
        const { getFieldDecorator,getFieldsValue,getFieldValue,setFields } = this.props.form;
        let fieldValues = getFieldsValue()
        
        // 获取表单参数
        let username = fieldValues.username;
        let user_type = fieldValues.user_type;
        let role_type = fieldValues.role_type;
        let email = fieldValues.email;
        let password = fieldValues.password;

        if(email==undefined){message.error('请输入邮箱'); return}
        if(username==undefined){message.error('请输入用户名'); return}
        if(password==undefined){message.error('请输入密码'); return}

        // 生成两对公私钥
        let owner_keys = await BTCryptTool.createPubPrivateKeys();
        let active_keys = await BTCryptTool.createPubPrivateKeys();

        // 两对公钥
        let owner_pub_key = owner_keys.publicKey;
        let active_pub_key = active_keys.publicKey;

        // 两对私钥
        let owner_private_key = owner_keys.privateKey;
        let active_private_key = active_keys.privateKey;

        // 两对sign时用的私钥
        let owner_private_wif = owner_keys.privateWif;
        let active_private_wif = active_keys.privateWif;

        // 生成encypted_info  owner_pub_key
        let info = {email}
        let encypted_info = BTCryptTool.aesEncrypto(JSON.stringify(info),password);
        let decrypted = BTCryptTool.aesDecrypto(encypted_info,password)

        // 创建签名  username +owner_pub_key +active_pub_key
        let signKey = username + owner_pub_key + active_pub_key;
        let signature_account = BTCryptTool.sign(signKey,owner_private_wif);

        // 创建signature_user  username +owner_pub_key +active_pub_key +info +signature_account
        let signature_user_key = username + owner_pub_key + active_pub_key + signature_account;
        let signature_user = BTCryptTool.sign(signature_user_key,owner_private_wif);

        // 发送注册请求
        let params = {};
        params = {
            username:username,
            user_info:{
                encypted_info:encypted_info.toString(),
                user_type,// 0:个人  1:公司
                role_type, // 0:数据提供  1:数据招募 2:数据审核
            },
            owner_pub_key:owner_pub_key.toString(),
            active_pub_key:active_pub_key.toString(),
            signature_account:signature_account,
            signature_user:signature_user
        }

        // 将两对私钥加密以后存储到本地
        let privateKeys = {
            account_name:username,
            code:'0',
            owner_private_key:owner_private_key.toString(),
            owner_private_wif,
            active_private_key:active_private_key.toString(),
            active_private_wif
        }

        // 对两对私钥进行加密后存储成keystore文件
        let reqUrl = '/user/register'
        BTFetch(reqUrl,'POST',params)
        .then(response=>{
            if(response && response.code=='0'){
                message.success('注册成功')
                let privateKeyStr = JSON.stringify(privateKeys)
                let cryptStr = BTCryptTool.aesEncrypto(privateKeyStr,password)
                console.log({cryptStr})
                // 存储keystore文件到本地
                BTIpcRenderer.saveKeyStore('keystore',cryptStr)
                this.props.registSuccess({
                    cryptStr,
                    isRegist:true,
                    username
                })
                this.clearFields()
            }else{
                message.error('注册失败')
            }
        })
        .catch(error=>{
            message.error('注册失败',error)
            this.setState({
                visible:false
            })
        })
        
    }

    // 将两对私钥加密后存储到本地
    exportKeystore(privateKeys,password){
        let privateKeyStr = JSON.stringify(privateKeys)
        let cryptStr = BTCryptTool.aesEncrypto(privateKeyStr,password)
        this.props.registSuccess({
            cryptStr,
            isRegist:true
        })
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <div className="register">
                <Form onSubmit={()=>{this.onHandleSubmit()}}>
                <FormItem
                    mapPropsToFields
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('user_type',{
                            getValueFromEvent:(e)=>{
                                if (!e || !e.target) {
                                    return e;
                                  }
                                  const { target } = e;
                                  return target.type === 'checkbox' ? target.checked : target.value;
                            },
                            initialValue:0
                        })(
                            <RadioGroup >
                                <Radio  value={0}>个人</Radio>
                                <Radio value={1}>公司</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('role_type',{
                            getValueFromEvent:(e)=>{return e.target.value},
                            initialValue:0
                        })(
                            <RadioGroup>
                                <Radio value={0}>数据提供</Radio>
                                <Radio value={1}>数据招募</Radio>
                                <Radio value={2}>数据审核</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('email',{})(
                            <Input placeholder="请输入email" id="error2" />
                        )
                    }
                    
                </FormItem>

                <FormItem {...formItemLayout} >
                {
                    getFieldDecorator('username',{
                        
                    })(
                        <Input placeholder="请输入用户名" id="error1" />
                    )
                }   
                </FormItem>

                <FormItem {...formItemLayout}>
                    {
                        getFieldDecorator('password',{

                        })(
                            <Input placeholder="请输入密码" type="password" id="error1"/>
                        )
                    }
                </FormItem>

                <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <Button type="primary" onClick={()=>this.onHandleSubmit()}>注册</Button>
                </div>
                
                </Form>
            </div>
        )
    }
}

const RegistForm = Form.create()(Regist); 


class BTRegistSuccess extends PureComponent{
    constructor(props){
        super(props)
    }

    downloadKeystore(){
        BTIpcRenderer.exportKeyStore(this.props.username,this.props.cryptStr);
    }

    render(){
        return(
            <div>
                <p>您的账号已注册成功，请备份您的keystore文件</p>
                <Button type="primary" onClick={()=>{this.downloadKeystore()}}>备份keystore文件</Button>
            </div>
        )
    }
}

