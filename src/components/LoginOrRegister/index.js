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
