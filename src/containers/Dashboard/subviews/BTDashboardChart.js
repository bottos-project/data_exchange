import React,{PureComponent} from 'react'

import { LineChart, Line,SimpleLineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from 'recharts';


// const data = [
//     {name: '1-17', data: 2400,requirement:5643, amt: 2400},
//     {name: '1-18', data: 5798,requirement:2345,  amt: 2210},
//     {name: '1-19', data: 7800,requirement:5745,  amt: 2290},
//     {name: '1-20', data: 3908,requirement:6787,  amt: 2000},
//     {name: '1-21', data: 4400,requirement:7875,  amt: 2181},
//     {name: '1-22', data: 1400,requirement:5643,  amt: 2500},
//     {name: '1-23', data: 8700,requirement:6856,  amt: 2100},
// ];


const data = [
    {name:'2018-03-05',requireNumPerDay:30,assetNumPerDay:40,txNumPerDay:23},
    {name:'2018-03-05',requireNumPerDay:13,assetNumPerDay:44,txNumPerDay:23},
    {name:'2018-03-05',requireNumPerDay:30,assetNumPerDay:24,txNumPerDay:23},
    {name:'2018-03-05',requireNumPerDay:25,assetNumPerDay:48,txNumPerDay:23},
    {name:'2018-03-05',requireNumPerDay:11,assetNumPerDay:18,txNumPerDay:23},
    {name:'2018-03-05',requireNumPerDay:36,assetNumPerDay:35,txNumPerDay:23},
    {name:'2018-03-05',requireNumPerDay:22,assetNumPerDay:39,txNumPerDay:23},
    {name:'2018-03-05',requireNumPerDay:31,assetNumPerDay:23,txNumPerDay:23},
    {name:'2018-03-05',requireNumPerDay:32,assetNumPerDay:19,txNumPerDay:23},
    {name:'2018-03-05',requireNumPerDay:23,assetNumPerDay:10,txNumPerDay:23},
    {name:'2018-03-05',requireNumPerDay:3,assetNumPerDay:39,txNumPerDay:23},
    {name:'2018-03-05',requireNumPerDay:13,assetNumPerDay:40,txNumPerDay:23},
]


// const TabPane = Tabs.TabPane;

export default class BTDashboardChart extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div >
                <div className="container row marginBottom" style={{alignItems:'center'}}>
                    <LineChart width={820} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="requireNumPerDay" stroke="red"/>
                        <Line type="monotone" dataKey="assetNumPerDay" stroke="red"/>
                        <Line type="monotone" dataKey="txNumPerDay" stroke="red"/>
                        {/* <Line type="monotone" dataKey="data" stroke="#8884d8" />
                        <Line type="monotone" dataKey="requirement" stroke="#0596d8" /> */}
                    </LineChart>
                    <div>
                        <div>注册人数：1000000</div>
                        <div>
                            <span>交易金额：</span>
                            <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:15,height:15}} alt=""/>
                            <span>30000</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}