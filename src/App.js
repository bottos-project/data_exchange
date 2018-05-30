import React, { Component } from 'react';
import {Provider} from 'react-redux'
import {hashHistory} from 'react-router'
import store from './redux/store'
import { setAccountInfo } from './redux/actions/HeaderAction'
import {LocaleProvider} from 'antd';
import { IntlProvider } from 'react-intl';
import appLocale from './locales'
import RouterMap from './router/routerMap'

window.localeInfo = appLocale.messages;
// 将config文件设置为全局window对象
window.config = require('./utils/config')
// console.log('store', store);

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={appLocale.antd}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
            <Provider store={store}>
                <RouterMap history={hashHistory}/>
            </Provider>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

export default App
