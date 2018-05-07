import React, { Component } from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import Login from './Login'
import Register from './Register'

import { FormattedMessage } from 'react-intl'
import messages from '../locales/messages'
const HeaderMessages = messages.Header;


const style = {
  background: '#FFF',
  boxShadow: '0 0 10px 0 rgba(0,0,0,0.07)',
  borderRadius: 10,
}

function callback(key) {
  console.log(key);
}

class LoginOrRegister extends Component {

  render() {
    return (
      <React.Fragment>
        <Tabs defaultActiveKey="Login" onChange={callback}>
          <TabPane tab={<FormattedMessage {...HeaderMessages.Login} />} key="Login"><Login /></TabPane>
          <TabPane tab={<FormattedMessage {...HeaderMessages.Register} />} key="Register"><Register /></TabPane>
        </Tabs>

      </React.Fragment>
    );
  }

}

export default LoginOrRegister;
