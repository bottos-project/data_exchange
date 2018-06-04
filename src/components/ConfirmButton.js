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
import { Button } from 'antd'

const style = {
  padding: '0 30px',
  backgroundImage: '-webkit-linear-gradient(7deg, #5F72D8 0%, #6366C7 31%, #6E479D 100%)',
  boxShadow: '0 0 5px 0 #896ACF',
  borderRadius: 5,
  color: 'white',
}

function ConfirmButton(props) {
  // console.log('props', props);
  return (
    <Button {...props} size='large' style={style}>
      {props.children}
    </Button>
  )
}

export default ConfirmButton;
