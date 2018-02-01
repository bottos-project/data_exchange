import React,{PureComponent} from 'react'
import { Tabs, Input, Ico,Button,Select } from 'antd';
const TabPane = Tabs.TabPane;
import './styles.less';

function callback(key) {
    console.log(key)
}

const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}

export default class BTAccount extends PureComponent{
    constructor(props){
        super(props)

        // this.state = {
        //     address:''
        // }
    }

    render(){
        return(
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="个人资料" key="1">
                        <div className="personalInformation">
                            <div className="UserName">
                                <span>UserName:</span>
                                <Input  defaultValue="Jack" />
                                <Button>modify</Button>
                            </div>
                            <div className="realName">
                                <span>realName:</span>
                                <span>Tom</span>
                            </div>
                            <div className="accountType">
                                <span>accountType:</span>
                                    <Select defaultValue="provider"  onChange={handleChange}>
                                        <Option value="demandSide">Demand side</Option>
                                        <Option value="provider">Provider</Option>
                                        <Option value="both">both</Option>
                                    </Select>
                                <Button>modify</Button>
                            </div>
                            <div className="phoneNumber">
                                <span>phoneNumber:</span>
                                <Input  defaultValue="13761234905" />
                                <Button>modify</Button>
                            </div>
                            <div className="mailBox">
                                <span>mailBox:</span>
                                <Input  defaultValue="cnyuanjia@gmail.com" />
                                <Button>modify</Button>
                            </div>
                            <div className="address">
                                <span>address:</span>
                                <Input defaultValue="" />
                                <Button>modify</Button>
                            </div>
                            <div className="submit" >
                                <Button>submit</Button>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="公司资料" key="2">
                        <div className="enterpriseInformation">
                            <div className="UserName">
                                <span>UserName:</span>
                                <Input defaultValue="Jack" />
                                <Button>modify</Button>
                            </div>
                            <div className="enterpriseName">
                                <span>enterpriseName:</span>
                                <span>enterpriseName</span>
                            </div>
                            <div className="accountType">
                                <span>accountType:</span>
                                <Select defaultValue="provider" onChange={handleChange}>
                                    <Option value="demandSide">Demand side</Option>
                                    <Option value="provider">Provider</Option>
                                    <Option value="both">both</Option>
                                </Select>
                                <Button>modify</Button>
                            </div>
                            <div className="phoneNumber">
                                <span>enterprisePhoneNumber:</span>
                                <Input defaultValue="888-888-888" />
                                <Button>modify</Button>
                            </div>
                            <div className="mailBox">
                                <span>enterpriseMailBox:</span>
                                <Input defaultValue="cn@gmail.com" />
                                <Button>modify</Button>
                            </div>
                            <div className="address">
                                <span>enterpriseAddress:</span>
                                {<Input defaultValue="google" /*onChange={(e)=>this.setState({address:e.target.value})}*/ />}
                                <Button>modify</Button>
                            </div>
                            <div className="code">
                                <span>组织机构代码:</span>
                                <span>000</span>
                            </div>
                            <div className="submit" >
                                <Button>submit</Button>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
        )
    }
}




