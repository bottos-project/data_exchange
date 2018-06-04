/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
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
    return debounce(() => {
      const width = this.chartDiv.clientWidth - 20
      console.log('width', width);
      this.setState({
        width: Math.max(width, 800)
      });
    }, 200)
  }

  componentDidMount() {
    this.debounced = this.changeWidth()
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
