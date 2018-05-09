import React, { Component } from 'react';
import {Provider} from 'react-redux'
import {hashHistory} from 'react-router'
import configureStore from './redux/store/ConfigureStore'
import { setAccountInfo } from './redux/actions/HeaderAction'
import {LocaleProvider} from 'antd';
import { IntlProvider } from 'react-intl';
import appLocale from './locales'
// 通用样式
import './static/css/common.less'
import RouterMap from './router/routerMap'
import emitter from './utils/eventEmitter'

window.localeInfo = appLocale.messages;
// 将config文件设置为全局window对象
window.config = require('./utils/config')
const store = configureStore();
// console.log('store', store);
emitter.on('token_expire', function () {
  store.dispatch(setAccountInfo(null))
  hashHistory.push('/loginOrRegister')
})
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
