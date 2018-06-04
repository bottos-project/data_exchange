import React,{PureComponent} from 'react'
import { Tabs, Input, Ico,Button,Select,message } from 'antd';
import BTFetch from "../../../../utils/BTFetch"
import BTCryptTool from 'bottos-crypto-js'
// import {nativeImage} from 'electron'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const SettingMessages = messages.Setting;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class BTCompany extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            username:this.props.name,
            email:'haoyu@163.com',
            role_type:this.props.data.role_type,
            user_type:"company",
            company_name:this.props.data.company_name,
            company_address:this.props.data.company_address
        }
    }
    //公司资料修改
    handleChange(value){
        this.setState({
            user_type:`${value}`
        })
    }
    onChangeEmail(e){
        this.setState(
            {
                email:e.target.value,
            }
        )
    }
    // onChangeEAddress(e){
    //     this.setState(
    //         {
    //             EAddress:e.target.value,
    //         }
    //     )
    // }
    onChangeRoleType(e){
        this.setState(
            {
                role_type:e.target.value,
            }
        )
    }

    //公司资料提交
    onClickE() {
        var param = {
            "username":this.state.username,
            "owner_pub_key": "0xxxx",
            "active_pub_key": "0xxxxx",
            "signature_acct": "0xxxxxx",
            "user_info":{
                "encrypted_info":1,
                "user_type":0,
                "role_type":1
            },
            "signature_user": "0xxxxxx"
        }
        // var param={
        //     username:this.state.username,
        //     user_info:{
        //         encypted_info:BTCryptTool.aesEncrypto((this.state.email),this.state.username),
        //         user_type:this.state.user_type,
        //         role_type:this.state.role_type,
        //         company_name:this.state.company_name,
        //         company_address:this.state.company_address
        //     },
        //     signature_user:''
        // }
        // console.log(param,BTCryptTool.aesDecrypto(param.user_info.encypted_info,this.state.username))
        // debugger;
        BTFetch("/user/UpdateUserInfo","post",param).then((responseData) => {
            // console.log(responseData)
            if(responseData.code==0){
                window.message.success('修改信息成功')
            }else{
                window.message.error('修改信息失败')
            }
        })


    }

    render(){
        // console.log(BTCryptTool.aesEncrypto('haoyu','btd121'))
        // console.log(BTCryptTool.aesDecrypto(this.props.data.encypted_info,'btd121'))
        return(
            <div>
                <div className="enterpriseInformation">
                    <div>
                        <span>
                            <FormattedMessage {...SettingMessages.userType}/>
                        </span>
                        <Select defaultValue="company"  onChange={(value)=>this.handleChange(value)} disabled>
                            <Option value="disabled" disabled>Disabled</Option>
                        </Select>
                    </div>
                    <div className="UserName">
                        <span>
                            <FormattedMessage {...SettingMessages.userName}/>
                        </span>
                        <Input value={this.state.username} disabled />
                    </div>
                    <div className="enterpriseName">
                        <span>
                            <FormattedMessage {...SettingMessages.EnterpriseName}/>
                        </span>
                        <Input value={this.state.company_name} disabled />
                    </div>
                    <div className="enterpriseAddress">
                        <span>
                            <FormattedMessage {...SettingMessages.EnterpriseAddress}/>
                         </span>
                        <Input value={this.state.company_address} disabled/>
                    </div>
                    {/*<div className="accountType">*/}
                        {/*<span>RoleType:</span>*/}
                        {/*<select value={this.state.role_type} onChange={(e)=>this.onChangeRoleType(e)}>*/}
                            {/*<option value="0">consumer</option>*/}
                            {/*<option value="1">provider</option>*/}
                            {/*<option value="2">arbiter</option>*/}
                        {/*</select>*/}
                    {/*</div>*/}
                    <div className="mailBox">
                        <span>
                           <FormattedMessage {...SettingMessages.EnterpriseEmail}/>
                        </span>
                        <Input value={this.state.email} onChange={(e)=>this.onChangeEmail (e)}/>
                    </div>
                    {/*<div className="address">*/}
                    {/*<span>enterpriseAddress:</span>*/}
                    {/*<Input value={this.state.EAddress} onChange={(e)=>this.onChangeEAddress(e)}/>*/}
                    {/*<Button>modify</Button>*/}
                    {/*</div>*/}
                    <div className="submit" >
                        <Button onClick={()=>this.onClickE()}>
                            <FormattedMessage {...SettingMessages.Submit}/>
                        </Button>
                    </div>
                </div>
            </div>

        )
    }
}




