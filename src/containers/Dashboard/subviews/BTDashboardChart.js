import React,{PureComponent} from 'react'
import { LineChart, Line,SimpleLineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from 'recharts';
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const DashboardMessages = messages.Dashboard;
export default class BTDashboardChart extends PureComponent{
    render(){
        return(
            <div>
                <div className="dashboardChartTitle">
                    <h3 style={{color:"#666666"}}>{this.props.type}</h3>
                </div>
                <div className="dashboardChart shadow radius">
                    <LineChart style={{margin:'0 auto'}} width={1000}  height={250} data={this.props.num}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={this.props.dkey} stroke="#C86DD7"/>
                       {/* <Line type="monotone" dataKey="assetNumPerDay" stroke="#3023AE"/>
                         <Line type="monotone" dataKey="data" stroke="#8884d8" />
                        <Line type="monotone" dataKey="requirement" stroke="#0596d8" />*/}
                    </LineChart>
                </div>
            </div>
        )
    }
}
