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
import { Icon } from 'antd';
import { hashHistory } from 'react-router'

function back() {
  console.log('hashHistory', hashHistory);
  hashHistory.goBack()
}

function CloseBack(props) {
  var style = props.style
  return (
    <div onClick={back} className='close-back' {...props}>
      <Icon type="close" style={{ fontSize: 18 }} />
    </div>
  );

}

export default CloseBack;
