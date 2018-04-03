import antdEn from 'antd/lib/locale-provider/en_US'
import antdZh from 'antd/lib/locale-provider/zh_CN'
import {addLocaleData} from 'react-intl'
import en from 'react-intl/locale-data/en'

import enMessages from './messages/en.js'
import zhMessages from './messages/zh.js'

addLocaleData(en);
const enLocale = {locale:'en-US',messages:enMessages,antd:antdEn}
const zhLocale = {locale:'zh-CN',messages:zhMessages,antd:null}

const storage = window.localStorage;
let locale = storage.getItem('locale')

const appLocale = (locale == 'en-US') ? enLocale : zhLocale;
// module.exports = appLocale;
export default appLocale;
