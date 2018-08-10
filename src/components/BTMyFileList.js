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
import { Radio, Input } from 'antd';
import {FormattedMessage} from 'react-intl'
import messages from '../locales/messages'

const RadioGroup = Radio.Group;

class BTMyFileList extends Component {

  handleOk() {

  }

  render() {
    var list = listData.map((item, index)=>{
      return (
        <Row key={item.asset_id} span={8}>
          <Radio value={item.asset_id}>{value.asset_name}</Radio>
        </Row>
      )
    })

    return (
      <Modal visible={this.props.visible}
        onOk={()=>this.handleOk()}
        onCancel={this.handleCancel}
        okText={<FormattedMessage {...messages.OK} />}
        cancelText={<FormattedMessage {...messages.Cancel} />}
      >

        <div style={{height:300,overflow:"auto",margin:20}}>
          <RadioGroup style={{ width: '100%' }}  onChange={(e)=>this.onChange(e)} defaultValue=''>
            <Col>
              {list}
            </Col>
          </RadioGroup>
        </div>
      </Modal>

    );
  }

}

export default BTMyFileList;
