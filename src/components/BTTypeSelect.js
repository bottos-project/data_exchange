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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd'
const Option = Select.Option;

import { selectType } from '@/utils/keyMaps'

const optionList = []

for (var key in selectType) {
  optionList.push(
    <Option key={key} value={key}>{selectType[key]}</Option>
  )
}

class BTTypeSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    const onChange = this.props.onChange
    if (onChange) {
      onChange(value)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  render() {
    return (
      <Select value={this.state.value} style={{ width: 120 }} onChange={this.handleChange}>
        {optionList}
      </Select>
    );
  }

}

BTTypeSelect.propTypes = {
  defaultValue: PropTypes.string
};

export default BTTypeSelect;
