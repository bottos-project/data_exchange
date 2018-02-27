import React,{PureComponent} from 'react'
import { Tabs, Input, Ico,Button,Select } from 'antd';
import BTFetch from "../../../../utils/BTFetch"
const Option = Select.Option;



export default class BTPerson extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            email:"",
            role_type:"provider",
            user_type:"person"
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
        BTFetch("/user","post",{
                user_type:this.state.user_type,
                username: this.state.username,
                email: this.state.email,
                role_type: this.state.role_type,
        }).then((responseData)=>{
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
                                <span>Jack</span>
                            </div>
                            <div className="accountType">
                                <span>RoleType:</span>
                                <select value={this.state.role_type} onChange={(e)=>this.onChangeRoleType(e)}>
                                    <option value="consumer">consumer</option>
                                    <option value="provider">provider</option>
                                    <option value="arbiter">arbiter</option>
                                </select>
                            </div>
                            <div className="mailBox">
                                <span>Email:</span>
                                <Input value={this.state.email} onChange={(e)=>this.onChangeEmail (e)}/>
                            </div>
                            <div className="address">
                                <span>address :</span>
                                <span>address </span>
                            </div>
                            <div className="submit" >
                                <Button onClick={()=>this.onClickP()}>submit</Button>
                            </div>
                        </div>
            </div>

        )
    }
}




