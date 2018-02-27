import React,{PureComponent} from 'react'
import { Tabs, Input, Ico,Button,Select } from 'antd';
import BTFetch from "../../../../utils/BTFetch"
const TabPane = Tabs.TabPane;
const Option = Select.Option;



export default class BTCompany extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            email:"",
            role_type:"provider",
            user_type:"company"
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
        BTFetch("","post",{
            user_type:this.state.user_type,
            email: this.state.email,
            username: this.state.username,
            role_type: this.state.role_type,
        }).then((responseData) => {
            console.log(responseData)
        })


    }

    render(){
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
                                <span>xxxx</span>
                            </div>
                            <div className="enterpriseName">
                                <span>company :</span>
                                <span>company </span>
                            </div>
                            <div className="enterpriseAddress">
                                <span>enterpriseAddress :</span>
                                <span>enterpriseAddress </span>
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




