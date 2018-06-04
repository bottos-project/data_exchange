import React,{PureComponent} from 'react'
import { Tabs, Input, Ico,Button,Select } from 'antd';
import './styles.less';
import BTPerson from "./subviews/person"
import BTCompany from "./subviews/company"
import BTFetch from '../../../utils/BTFetch'
import BTCryptTool from 'bottos-crypto-js'
import BTSettingTitle from "./subviews/BTSettingTitle";
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const SettingMessages = messages.Setting;
const TabPane = Tabs.TabPane;

export default class BTAccount extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            user_type:'0',
            data:'',
            name:''
        }
    }
    componentDidMount(){
        var reqURL='/user/getUserInfo';
        let username='btd121'
        //生成公私钥
        //生成签名username+random（随机数） ======>sign_query
        var random=Math.ceil(Math.random()*100)
        //签名username+random;
        let sign_query = BTCryptTool.sign(username+random,"5Ka9JiQBLG9rpAwEU54qB2PpXcChY4LoMbQA3N24xWJPVgfQjLe")
        var params={
            // 随机数+签名
            username:username,
            random:random,
            signature:sign_query
        }
        console.log(params)
        BTFetch(reqURL,'POST',params)
            .then(response=>{
                console.log({response})
                if(response && response.code=='0'){
                    var data=JSON.parse(JSON.parse(response.data).rows[0].basic_info.info);
                    var name=JSON.parse(response.data).rows[0].user_name;
                    console.log(data);
                    this.setState({
                        user_type:data.role_type,
                        name:name,
                        data:data
                    })
                    console.log(data,name)
                    // var a=BTCryptTool.aesEncrypto('23423sss','btd121')
                    // var b=BTCryptTool.aesDecrypto(a,'btd121');
                    // console.log({
                    //     a:a.toString(),
                    //     b
                    // })
                    // var email=BTCryptTool.aesDecrypto(data.encypted_info.toString(),'btd121');
                    // debugger
                }
            })
            .catch(error=>{
                console.log(error,'查询失败')
            })
    }
    render(){
        return (
            <div style={{width:"100%"}}>
                <div>
                    <BTSettingTitle/>
                </div>
                <div>
                    <Tabs defaultActiveKey="1">
                        {
                            this.state.user_type == 1 ?
                                (<TabPane  tab={<FormattedMessage {...SettingMessages.PersonalInformation}/>} key="1">
                                    <BTPerson name={this.state.name} data={this.state.data} />
                                </TabPane>)  :
                                (<TabPane tab={<FormattedMessage {...SettingMessages.EnterpriseInformation}/>} key="2">
                                    <BTCompany name={this.state.name}  data={this.state.data} />
                                </TabPane>)
                        }
                        {/* <TabPane tab="个人资料" key="1">
                                <BTPerson/>
                            </TabPane>
                            <TabPane tab="公司资料" key="2">
                                <BTCompany/>
                            </TabPane> */}
                    </Tabs>
                </div>
            </div>

        )
    }
}

