import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { message } from 'antd'
message.config({top: 100, duration: 2, maxCount: 1})
window.message = message

ReactDOM.render(<App />, document.getElementById('root'));
