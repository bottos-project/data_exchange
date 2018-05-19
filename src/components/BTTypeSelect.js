import React, { PureComponent } from 'react';
import { Select } from 'antd'
const Option = Select.Option;

// 对应关系
const keyMap = {
  11: 'Voice',
  12: 'Video',
  13: 'Picture',
  14: 'Text',
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
      <Select defaultValue="11" style={{ width: 120 }} onChange={this.handleChange}>
        <Option value="11">Voice</Option>
        <Option value="12">Video</Option>
        <Option value="13">Picture</Option>
        <Option value="14">Text</Option>
      </Select>
    );
  }

}

export default BTTypeSelect;
