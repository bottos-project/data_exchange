import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd'
const Option = Select.Option;

import { arTypeKeyMap } from '@/utils/keyMaps'
// 对应关系
const {0: x, ...keyMap} = arTypeKeyMap
// console.log('arTypeKeyMap', arTypeKeyMap);
// console.log('keyMap', keyMap);
// console.log('x', x);
// if (keyMap[0]) {
  delete keyMap[0]
// }
const optionList = []

for (var key in keyMap) {
  optionList.push(
    <Option key={key} value={key}>{keyMap[key]}</Option>
  )
}


class BTTypeSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    const onChange = this.props.onChange
    if (onChange) {
      onChange(value)
    }
  }

  render() {
    return (
      <Select defaultValue={this.props.defaultValue} style={{ width: 120 }} onChange={this.handleChange}>
        {optionList}
      </Select>
    );
  }

}

BTTypeSelect.propTypes = {
  defaultValue: PropTypes.string
};

export default BTTypeSelect;
