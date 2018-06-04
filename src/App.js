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
