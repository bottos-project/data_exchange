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
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { message } from 'antd'
message.config({top: 100, duration: 2, maxCount: 1})
window.message = message

document.addEventListener('dragover', function (e) {
  // console.log('dragover e', e);
  e.preventDefault()
})
document.addEventListener('drop', function (e) {
  // console.log('drop e', e);
  e.preventDefault()
})

ReactDOM.render(<App />, document.getElementById('root'));
