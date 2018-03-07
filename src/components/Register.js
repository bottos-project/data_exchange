import React,{PureComponent} from 'react'
import {Modal,Form, Icon, Input, Button,Radio,Checkbox,message} from 'antd'
import BTFetch from '../utils/BTFetch'
import BTCryptTool from '../tools/BTCryptTool'
import './styles.less'

const RadioGroup = Radio.Group;
const FormItem = Form.Item;




export default class IsRegister extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }
     handleOk(){

    }

    handleCancel(){
        this.setState({
            visible:false
        })
    }
    render(){
        return (
        <Modal visible={this.state.visible}
                       onOk={()=>this.handleOk()}
                       onCancel={()=>this.handleCancel()}
                       title='注册'
                       okText='注册'
                       cancelText='取消'
                       maskClosable='false'
                       footer={null}
        >
            <RegistForm/>
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

    onHandleSubmit(self){
        const { getFieldDecorator,getFieldsValue,getFieldValue } = self;
        let fieldValues = getFieldsValue()

        // 获取表单参数
        let username = fieldValues.username;
        let user_type = fieldValues.user_type;
        let role_type = fieldValues.role_type;
        let email = fieldValues.email;
        
        // 生成两对公私钥
        let owner_keys = BTCryptTool.createPubPrivateKeys(username+'owner_pub_key');
        let active_keys = BTCryptTool.createPubPrivateKeys(username+'active_pub_key');

        let owner_pub_key = owner_keys.publicKey;
        let active_pub_key = active_keys.publicKey;

        // 生成encypted_info  owner_pub_key
        let info = {email}
        let encypted_info = BTCryptTool.aesEncrypto(JSON.stringify(info),username);
        // let decrypted = BTCryptTool.aesDecrypto(encypted_info,username)

        // 创建签名  username +owner_pub_key +active_pub_key
        let owner_private_key = owner_keys.privateKey;
        let signKey = username + owner_pub_key + active_pub_key;
        let signature_account = BTCryptTool.sign(signKey,owner_pub_key);

        // 创建signature_user  username +owner_pub_key +active_pub_key +info +signature_account
        let signature_user_key = username + owner_pub_key + active_pub_key + signature_account;
        let signature_user = BTCryptTool.sign(signature_user_key,owner_private_key);

        // console.log({
        //     owner_keys,
        //     active_keys,
        //     signature_account,
        //     signature_user,
        //     encypted_info
        // })

        // 发送注册请求
        let params = {};
        params = {
            username:username,
            user_info:'sdkjflsdfj',
                encypted_info:"encypted_info",
                user_type:user_type,  // 0:个人  1:公司
                role_type:role_type,
            owner_pub_key:owner_pub_key.toString(),
            active_pub_key:active_pub_key.toString(),
            signature_account:signature_account,
            signature_user:signature_user
        }

        console.log({
            params
        })

        // let reqUrl = '/user/register'

        // BTFetch(reqUrl,'POST',params)
        // .then(response=>{
        //     if(response && response.code=='1'){
        //         message.success('注册成功')
        //         this.setState({
        //             visible:false
        //         })
        //     }

        // })
        // .catch(error=>{
        //     message.error('注册失败')
        //     this.setState({
        //         visible:false
        //     })
        // })
    }

    render(){
        const self = this.props.form;
        const {getFieldDecorator} = self;
        return(
            <div>
                <Form onSubmit={()=>{this.onHandleSubmit(self)}}>
                <FormItem
                    mapPropsToFields
                    {...formItemLayout}
                    label="注册类型"
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
                            <RadioGroup>
                                <Radio value={0}>个人</Radio>
                                <Radio value={1}>公司</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户角色"
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
                    label="用户名"
                >
                {
                    getFieldDecorator('username',{
                        
                    })(
                        <Input placeholder="请输入用户名" id="error1" />
                    )
                }
                    
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="email"
                >
                    {
                        getFieldDecorator('emial',{})(
                            <Input placeholder="请输入email" id="error2" />
                        )
                    }
                    
                </FormItem>

                <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <Button type="primary" htmlType="submit">注册</Button>
                </div>
                
                </Form>
            </div>
        )
    }
}

const RegistForm = Form.create()(Regist);
