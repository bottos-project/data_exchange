import React,{PureComponent} from 'react'
import {Tabs } from 'antd';

import BTDashboardChartData from "./BTDashboardChartData"
import BTDashboardChartPopular from "./BTDashboardChartPopular"
import BTDashboardChartPrice from "./BTDashboardChartPrice"
import BTDashboardChartDemand from "./BTDashboardChartDemand"

const TabPane = Tabs.TabPane;

export default class BTDashboardChart extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Tabs>
                    <TabPane tab="数据总量" key="8">
                        <BTDashboardChartData/>
                    </TabPane>
                    <TabPane tab="注册人数" key="9">
                        <BTDashboardChartPopular/>
                    </TabPane>
                    <TabPane tab="交易金额" key="99">
                        <BTDashboardChartPrice/>
                    </TabPane>
                    <TabPane tab="需求总量" key="79">
                        <BTDashboardChartDemand/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}