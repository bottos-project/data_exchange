import React,{PureComponent} from 'react'
import { Tabs, Input, Ico,Button,Select } from 'antd';
import BTFetch from "../../../../utils/BTFetch"
import BTCryptTool from '../../../../tools/BTCryptTool'
// import saveAs from '../../../../tools/FileSaver'
const Option = Select.Option;



export default class BTPerson extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            username:this.props.name,
            email:"",
            role_type:this.props.data.role_type,
            user_type:0,
            download:''
        }
    }
    //个人资料修改
    onChangeUserName(e){
        this.setState(
            {
                username:e.target.value,
            }
        )
    }

    onChangeEmail(e){
        this.setState(
            {
                email:e.target.value,
            }
        )
    }
    onChangeRoleType(e){
        this.setState(
            {
                role_type:e.target.value,
            }
        )
    }
    //个人资料提交
    onClickP() {
        var email=BTCryptTool.aesEncrypto(this.state.email,this.state.username);
        // var ceshi=BTCryptTool.aesDecrypto(this.state.email,this.state.username);
        // console.log(ceshi)
        var param1 = {
            username:this.state.username,
            owner_pub_key: "0xxxx",
            active_pub_key: "0xxxxx",
            signature_acct: "0xxxxxx",
            user_info:{
                encrypted_info:1,
                user_type:0,
                role_type:1
            },
            signature_user: "0xxxxxx"
        }
        // var param={
        //     username:this.state.username,
        //     user_info:{
        //         encypted_info:BTCryptTool.aesEncrypto(this.state.email,this.state.username),
        //         user_type:this.state.user_type,
        //         role_type:this.state.role_type,

        //     },
        //     signature_user:''
        // };
        var a=BTCryptTool.aesEncrypto('234134321',this.state.username)
        var b=BTCryptTool.aesDecrypto(a,this.state.username)
        console.log(param1,a,b,param1)
        debugger
        BTFetch("/user/UpdateUserInfo","post",param1).then((responseData)=>{
            console.log(responseData)
        })
    }


    render(){
        return(
            <div>
                <div className="personalInformation">
                    <div>
                        <span>user_type:</span>
                        <Select defaultValue="person"  onChange={(value)=>this.handleChange(value)} disabled>
                            <Option value="disabled" disabled>Disabled</Option>
                        </Select>
                    </div>
                    <div className="UserName">
                        <span>UserName:</span>
                        <Input value={this.state.username} disabled />
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
                    <div className="address">
                        <span>address :</span>
                        <Input value={this.state.address}/>
                    </div>
                    <div className="submit" >
                        <Button onClick={()=>this.onClickP()}>submit</Button>
                    </div>
                </div>
                {/* <input type='file' id='files' style={{display:'none'}} onChange={(e)=>this.import()} /> */}
                {/* <input type='button' id='import' value='导入' onClick={()=>this.files()}/>
                        <input type='button' id='import1' value='导出' onClick={()=>this.show11()} /> */}
                {/* <input type='button' id='import1' value='导出' onClick={()=>this.show11()} /> */}
            </div>

        )
    }
}




