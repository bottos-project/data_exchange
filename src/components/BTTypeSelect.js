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
