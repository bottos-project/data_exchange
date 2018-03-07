import React, { Component } from 'react';
import {Provider} from 'react-redux'
import {hashHistory} from 'react-router'
import configureStore from './redux/store/ConfigureStore'
import {LocaleProvider} from 'antd';
import { IntlProvider } from 'react-intl';
import 'antd/dist/antd.less';
import './static/iconfont/iconfont.css'
import appLocale from './locales'
// 通用样式
import './static/css/common.less'
import RouterMap from './router/routerMap'

const store = configureStore();


export default class App extends Component {
  constructor(props){
    super(props)
  }

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
