import React from 'react'
import { render } from 'react-dom'
import {Provider} from 'react-redux'
import {hashHistory} from 'react-router'
import 'antd/dist/antd.less';


// 通用样式
import './static/css/common.less'
import RouterMap from './router/routerMap'

render(
    <RouterMap history={hashHistory}/>,
    document.getElementById('root')
)
