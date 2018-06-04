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
import antdEn from 'antd/lib/locale-provider/en_US'
import antdZh from 'antd/lib/locale-provider/zh_CN'
// import {addLocaleData} from 'react-intl'
// import zh from 'react-intl/locale-data/zh'

import enMessages from './messages/en.js'
import zhMessages from './messages/zh.js'

// addLocaleData(zh);
const enLocale = {
  locale:'en-US',
  messages:enMessages,
  antd:antdEn
}
const zhLocale = {
  locale:'zh-CN',
  messages:zhMessages,
  antd:null
}

const storage = window.localStorage;
let locale = storage.getItem('locale')

const appLocale = (locale == 'en-US') ? enLocale : zhLocale;
// module.exports = appLocale;
export default appLocale;
