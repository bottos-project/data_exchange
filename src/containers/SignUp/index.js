import React,{PureComponent} from 'react'
import { Tabs, Input, Ico,Button,Select } from 'antd';
import "../../containers/styles.less"
const TabPane = Tabs.TabPane;


function callback(key) {
    console.log(key)
}

const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}

export default class BTSignUp extends PureComponent{
    constructor(props){
        super(props)

        // this.state = {
        //     address:''
        // }
    }

    render(){
        return(
                <Tabs defaultActiveKey="1" onChange={callback}  className="TabsStyle">
                    <TabPane tab="个人注册" key="1" >
                        <div className="personalInformation" >
                            <div>
                                <span>UserName:</span>
                                <Input />
                            </div>
                            <div>
                                <span>Password:</span>
                                <Input />
                            </div>
                            <div>
                                <span>Repeat:</span>
                                <Input/>
                            </div>
                            <div>
                                <span>realName:</span>
                                <Input/>
                            </div>
                            <div className="accountType">
                                <span>accountType:</span>
                                <Select defaultValue="provider"  onChange={handleChange}>
                                    <Option value="demandSide">Demand side</Option>
                                    <Option value="provider">Provider</Option>
                                    <Option value="both">both</Option>
                                </Select>
                            </div>
                            <div className="phoneNumber">
                                <span>phoneNumber:</span>
                                <Input/>
                            </div>
                            <div className="mailBox">
                                <span>mailBox:</span>
                                <Input />
                            </div>
                            <div className="address">
                                <span>address:</span>
                                <Input />
                            </div>
                        </div>
                        <div className="submit" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Button>submit</Button>
                        </div>
                    </TabPane>
                    <TabPane tab="公司注册" key="2">
                        <div className="enterpriseInformation" style={{width:"400px"}}>
                            <div>
                                <span>UserName:</span>
                                <Input />
                            </div>
                            <div>
                                <span>enterpriseName:</span>
                                <Input />
                            </div>
                            <div className="accountType">
                                <span>accountType:</span>
                                <Select defaultValue="provider" onChange={handleChange}>
                                    <Option value="demandSide">Demand side</Option>
                                    <Option value="provider">Provider</Option>
                                    <Option value="both">both</Option>
                                </Select>
                            </div>
                            <div>
                                <span>enterprisePhoneNumber:</span>
                                <Input/>
                            </div>
                            <div>
                                <span>enterpriseMailBox:</span>
                                <Input />
                            </div>
                            <div>
                                <span>enterpriseAddress:</span>
                                {<Input  /*onChange={(e)=>this.setState({address:e.target.value})}*/ />}
                            </div>
                            <div>
                                <span>组织机构代码:</span>
                                {<Input/>}
                            </div>
                        </div>
                        <div className="submit" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Button>submit</Button>
                        </div>
                    </TabPane>
                </Tabs>
        )
    }
}




