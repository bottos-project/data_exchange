import React,{PureComponent} from 'react'

import { LineChart, Line,SimpleLineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from 'recharts';

// import BTDashboardChartData from "./BTDashboardChartData"
// import BTDashboardChartPopular from "./BTDashboardChartPopular"
// import BTDashboardChartPrice from "./BTDashboardChartPrice"
// import BTDashboardChartDemand from "./BTDashboardChartDemand"



const data = [
    {name: '1-17', data: 2400,requirement:5643, amt: 2400},
    {name: '1-18', data: 5798,requirement:2345,  amt: 2210},
    {name: '1-19', data: 7800,requirement:5745,  amt: 2290},
    {name: '1-20', data: 3908,requirement:6787,  amt: 2000},
    {name: '1-21', data: 4400,requirement:7875,  amt: 2181},
    {name: '1-22', data: 1400,requirement:5643,  amt: 2500},
    {name: '1-23', data: 8700,requirement:6856,  amt: 2100},
];

// const TabPane = Tabs.TabPane;

export default class BTDashboardChart extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                {/*<Tabs>*/}
                    {/*<TabPane tab="数据总量" key="8">*/}
                        {/*<BTDashboardChartData/>*/}
                    {/*</TabPane>*/}
                    {/*<TabPane tab="注册人数" key="9">*/}
                        {/*<BTDashboardChartPopular/>*/}
                    {/*</TabPane>*/}
                    {/*<TabPane tab="交易金额" key="99">*/}
                        {/*<BTDashboardChartPrice/>*/}
                    {/*</TabPane>*/}
                    {/*<TabPane tab="需求总量" key="79">*/}
                        {/*<BTDashboardChartDemand/>*/}
                    {/*</TabPane>*/}
                {/*</Tabs>*/}
                <div style={{display:"flex", flexDirection: "row",flexWrap: "nowrap",alignItems:"center"}}>
                    <LineChart width={730} height={250} data={data}
                               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="data" stroke="#8884d8" />
                        <Line type="monotone" dataKey="requirement" stroke="#0596d8" />
                    </LineChart>
                    <div style={{fontSize:16}}>
                        <div>注册人数：1000000</div>
                        <div style={{display:"flex", flexDirection: "row",flexWrap: "nowrap",alignItems:"center"}}>
                            <span>交易总金额：</span>
                            <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>
                            <span>30000</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}