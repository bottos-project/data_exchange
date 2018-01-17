import React from 'react'
import { render } from 'react-dom'
import {Provider} from 'react-redux'
import {hashHistory} from 'react-router'
import configureStore from './redux/store/ConfigureStore'
import 'antd/dist/antd.less';

const store = configureStore()
// 通用样式
import './static/css/common.less'
import RouterMap from './router/routerMap'

render(
    <Provider store={store}>
    <RouterMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
)
