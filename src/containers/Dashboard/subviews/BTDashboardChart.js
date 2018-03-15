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
    {name:'03-03',requireNumPerDay:30,assetNumPerDay:40,},
    {name:'03-04',requireNumPerDay:13,assetNumPerDay:44,},
    {name:'03-05',requireNumPerDay:30,assetNumPerDay:24,},
    {name:'03-06',requireNumPerDay:25,assetNumPerDay:48,},
    {name:'03-07',requireNumPerDay:11,assetNumPerDay:18,},
    {name:'03-08',requireNumPerDay:36,assetNumPerDay:35,},
    {name:'03-09',requireNumPerDay:22,assetNumPerDay:39,},
]


// const TabPane = Tabs.TabPane;

export default class BTDashboardChart extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
                <div>
                    <div className="dashboardChartTitle">
                        <h3 style={{color:"#666666"}}>市场供需</h3>
                        <div>
                            <div>
                                <span style={{display:"block",width:"15px",height:"15px",background:"#3023AE",borderRadius:"15px",margin:"0 10px"}}> </span>
                                <span>总需求</span>
                            </div>
                            <div>
                                <span style={{display:"block",width:"15px",height:"15px",background:"#C86DD7",borderRadius:"15px",margin:"0 10px"}}> </span>
                                <span>总发布</span>
                            </div>
                        </div>
                    </div>
                    <div className="dashboardChart shadow radius">
                        <LineChart width={960} height={250} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="requireNumPerDay" stroke="#C86DD7"/>
                            <Line type="monotone" dataKey="assetNumPerDay" stroke="#3023AE"/>
                            {/* <Line type="monotone" dataKey="data" stroke="#8884d8" />
                            <Line type="monotone" dataKey="requirement" stroke="#0596d8" /> */}
                        </LineChart>
                    </div>
                </div>
        )
    }
}