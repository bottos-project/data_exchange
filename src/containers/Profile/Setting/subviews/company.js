import React,{PureComponent} from 'react'
import { Tabs, Input, Ico,Button,Select } from 'antd';
import BTFetch from "../../../../utils/BTFetch"
import BTCryptTool from '../../../../tools/BTCryptTool'
// import {nativeImage} from 'electron'
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
            console.log(responseData)
        })


    }

    render(){
        // console.log(BTCryptTool.aesEncrypto('haoyu','btd121'))
        // console.log(BTCryptTool.aesDecrypto(this.props.data.encypted_info,'btd121'))
        return(
            <div>
                <div className="enterpriseInformation">
                    <div>
                        <span>user_type:</span>
                        <Select defaultValue="company"  onChange={(value)=>this.handleChange(value)} disabled>
                            <Option value="disabled" disabled>Disabled</Option>
                        </Select>
                    </div>
                    <div className="UserName">
                        <span>UserName:</span>
                        <span>{this.state.username}</span>
                    </div>
                    <div className="enterpriseName">
                        <span>company :</span>
                        <span>{this.state.company_name} </span>
                    </div>
                    <div className="enterpriseAddress">
                        <span>enterpriseAddress :</span>
                        <span>{this.state.company_address} </span>
                    </div>
                    <div className="accountType">
                        <span>RoleType:</span>
                        <select value={this.state.role_type} onChange={(e)=>this.onChangeRoleType(e)}>
                            <option value="0">consumer</option>
                            <option value="1">provider</option>
                            <option value="2">arbiter</option>
                        </select>
                    </div>
                    <div className="mailBox">
                        <span>Email:</span>
                        <Input value={this.state.email} onChange={(e)=>this.onChangeEmail (e)}/>
                    </div>
                    {/*<div className="address">*/}
                    {/*<span>enterpriseAddress:</span>*/}
                    {/*<Input value={this.state.EAddress} onChange={(e)=>this.onChangeEAddress(e)}/>*/}
                    {/*<Button>modify</Button>*/}
                    {/*</div>*/}
                    <div className="submit" >
                        <Button onClick={()=>this.onClickE()}>submit</Button>
                    </div>
                </div>
            </div>

        )
    }
}




