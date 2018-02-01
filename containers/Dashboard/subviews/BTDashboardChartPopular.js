import React,{PureComponent} from 'react'
import { LineChart, Line,SimpleLineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from 'recharts';


const data = [
    {name: '1-17', popular: 7600, amt: 2400},
    {name: '1-18', popular: 3698, amt: 2210},
    {name: '1-19', popular: 8600, amt: 2290},
    {name: '1-20', popular: 4608, amt: 2000},
    {name: '1-21', popular: 9800, amt: 2181},
    {name: '1-22', popular: 6700, amt: 2500},
    {name: '1-23', popular: 7800, amt: 2100},
];


export default class BTDashboardChartPopular extends PureComponent{
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
                <Line type="monotone" dataKey="popular" stroke="#8884d8" />
              </LineChart>
            </div>
        )
    }
}