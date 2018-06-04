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
import React, { Component } from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import Login from './Login'
import Register from './Register'

import { FormattedMessage } from 'react-intl'
import messages from '../../locales/messages'
const HeaderMessages = messages.Header;

import CustomTabBar from '../CustomTabBar'


const keyMap = {
  Login: <FormattedMessage {...HeaderMessages.Login} />,
  Register: <FormattedMessage {...HeaderMessages.Register} />
}

class LoginOrRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'Login'
    };
  }
  handleChange = (key) => {
    this.setState({
      activeKey: key
    });
  }
  render() {
    return (
      <div className='container column' style={{height: '100%'}}>
        <CustomTabBar onChange={this.handleChange} keyMap={keyMap} activeKey={this.state.activeKey} />
        <div className='route-children-bg' style={{flex: 1, height: '100%'}}>
          <Tabs
            defaultActiveKey="Login"
            activeKey={this.state.activeKey}
            >
              <TabPane tab={<FormattedMessage {...HeaderMessages.Login} />} key="Login"><Login /></TabPane>
              <TabPane tab={<FormattedMessage {...HeaderMessages.Register} />} key="Register"><Register /></TabPane>
            </Tabs>
        </div>
      </div>
    );
  }

}

export default LoginOrRegister;
