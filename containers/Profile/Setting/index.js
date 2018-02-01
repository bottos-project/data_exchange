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
            <div className="container">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="个人资料" key="1">
                        <div className="personalInformation">
                            <div className="UserName">
                                <span>UserName:</span>
                                <Input style={{width:"80px",height:"20px"}} defaultValue="Jack" />
                                <Button>modify</Button>
                            </div>
                            <div className="realName">
                                <span>realName:</span>
                                <span>Tom</span>
                            </div>
                            <div className="accountType">
                                <span>accountType:</span>
                                    <Select defaultValue="provider" style={{ width:"120px", marginTop:"-30px"}} onChange={handleChange}>
                                        <Option value="demandSide">Demand side</Option>
                                        <Option value="provider">Provider</Option>
                                        <Option value="both">both</Option>
                                    </Select>
                                <Button>modify</Button>
                            </div>
                            <div className="phoneNumber">
                                <span>phoneNumber:</span>
                                <Input style={{width:"120px",height:"20px"}} defaultValue="13761234905" />
                                <Button>modify</Button>
                            </div>
                            <div className="mailBox">
                                <span>mailBox:</span>
                                <Input style={{width:"160px",height:"20px"}} defaultValue="cnyuanjia@gmail.com" />
                                <Button>modify</Button>
                            </div>
                            <div className="address">
                                <span>address:</span>
                                <Input style={{width:"160px",height:"20px"}} defaultValue="" />
                                <Button>modify</Button>
                            </div>
                            <div className="submit" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <Button>submit</Button>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="公司资料" key="2">
                        <div className="enterpriseInformation">
                            <div className="UserName">
                                <span>UserName:</span>
                                <Input style={{width:"80px",height:"20px"}} defaultValue="Jack" />
                                <Button>modify</Button>
                            </div>
                            <div className="enterpriseName">
                                <span>enterpriseName:</span>
                                <span>enterpriseName</span>
                            </div>
                            <div className="accountType">
                                <span>accountType:</span>
                                <Select defaultValue="provider" style={{ width:"120px", marginTop:"-30px"}} onChange={handleChange}>
                                    <Option value="demandSide">Demand side</Option>
                                    <Option value="provider">Provider</Option>
                                    <Option value="both">both</Option>
                                </Select>
                                <Button>modify</Button>
                            </div>
                            <div className="phoneNumber">
                                <span>enterprisePhoneNumber:</span>
                                <Input style={{width:"120px",height:"20px"}} defaultValue="888-888-888" />
                                <Button>modify</Button>
                            </div>
                            <div className="mailBox">
                                <span>enterpriseMailBox:</span>
                                <Input style={{width:"160px",height:"20px"}} defaultValue="cn@gmail.com" />
                                <Button>modify</Button>
                            </div>
                            <div className="address">
                                <span>enterpriseAddress:</span>
                                {<Input style={{width:"160px",height:"20px"}} defaultValue="google" /*onChange={(e)=>this.setState({address:e.target.value})}*/ />}
                                <Button>modify</Button>
                            </div>
                            <div className="code">
                                <span>组织机构代码:</span>
                                <span>000</span>
                            </div>
                            <div className="submit" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <Button>submit</Button>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}




