import React,{PureComponent} from 'react'
import { LineChart, Line,SimpleLineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from 'recharts';


const data = [
    {name: '1-17', data: 2400, amt: 2400},
    {name: '1-18', data: 5798, amt: 2210},
    {name: '1-19', data: 7800, amt: 2290},
    {name: '1-20', data: 3908, amt: 2000},
    {name: '1-21', data: 4400, amt: 2181},
    {name: '1-22', data: 1400, amt: 2500},
    {name: '1-23', data: 8700, amt: 2100},
];


export default class BTDashboardChartData extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <LineChart width={730} height={250} data={data}
                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="data" stroke="#8884d8" />
                </LineChart>
            </div>
        )
    }
}