import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd'
const Option = Select.Option;

// 对应关系
export const keyMap = {
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
      <Select defaultValue={this.props.defaultValue} style={{ width: 120 }} onChange={this.handleChange}>
        <Option value="11">Voice</Option>
        <Option value="12">Video</Option>
        <Option value="13">Picture</Option>
        <Option value="14">Text</Option>
      </Select>
    );
  }

}

BTTypeSelect.propTypes = {
  defaultValue: PropTypes.string
};

export default BTTypeSelect;
