import React,{PureComponent} from 'react'
import { Tabs, Input, Ico,Button,Select } from 'antd';
import './styles.less';
import BTPerson from "./subviews/person"
import BTCompany from "./subviews/company"
const TabPane = Tabs.TabPane;

export default class BTAccount extends PureComponent {
    constructor(props) {
        super(props);
    }
        render(){
            return (
                <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="个人资料" key="1">
                            <BTPerson/>
                        </TabPane>
                        <TabPane tab="公司资料" key="2">
                            <BTCompany/>
                        </TabPane>
                    </Tabs>
                </div>

            )
        }
}

