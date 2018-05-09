import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import { LineChart, Line, SimpleLineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from 'recharts';
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const DashboardMessages = messages.Dashboard;

export default class BTDashboardChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth - 260 - 40 - 20
    };
    this.changeWidth = this.changeWidth.bind(this)
  }

  changeWidth() {
    // console.dir(this.chartDiv);
    const width = this.chartDiv.clientWidth - 20
    console.log('width', width);
    this.setState({
      width: Math.max(width, 800)
    });
  }

  componentDidMount() {
    this.debounced = debounce(this.changeWidth, 200)
    window.addEventListener('resize', this.debounced)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debounced)
  }

  render() {
      return(
          <div>
              <div className="dashboardChartTitle">
                  <h3 style={{color:"#666666"}}>{this.props.type}</h3>
              </div>
              <div className="dashboardChart shadow radius" ref={div => this.chartDiv = div}>
                  <LineChart style={{margin:'0 auto'}} width={this.state.width} height={250} data={this.props.num}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey={this.props.dkey} stroke="#C86DD7" strokeWidth={2} />
                     {/* <Line type="monotone" dataKey="assetNumPerDay" stroke="#3023AE"/>
                       <Line type="monotone" dataKey="data" stroke="#8884d8" />
                      <Line type="monotone" dataKey="requirement" stroke="#0596d8" />*/}
                  </LineChart>
              </div>
          </div>
      )
  }
}
