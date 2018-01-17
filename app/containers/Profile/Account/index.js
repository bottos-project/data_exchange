import React,{PureComponent} from 'react'
import { Tabs, Input, Ico,Button } from 'antd';
const TabPane = Tabs.TabPane;
import './styles.less';

function callback(key) {
    console.log(key)
}
export default class BTAccount extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>BTAccount
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="个人资料" key="1">
                        <div className="personalInformation">
                            <div className="UserName">
                                <span>UserName:</span>
                                <span>Jack</span>
                                <Input style={{width:"80px"}} placeholder="changing username" />
                                <Button>修改</Button>
                            </div>
                            <div className="realName">
                                <span>realName:</span>
                                <span>Tom</span>
                                <Input style={{width:"80px"}} placeholder="changing username" />
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="安全设置" key="2">


                    </TabPane>
                </Tabs>
            </div>
        )
    }
}




