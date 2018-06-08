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
import './tabs.less'

function Tab(props) {
  var className = 'custom-tabs-tab' + (props.active ? ' custom-tabs-tab-active' : '')
  function handleChange() {
    if (!props.active) { props.handleChange() }
  }
  return (
    <div onClick={handleChange} className={className}>{props.children}</div>
  )
}

class CustomTabBar extends PureComponent {
  constructor(props) {
    super(props);
    let activeKey = props.activeKey != undefined ? props.activeKey : (
      props.defaultActiveKey != undefined ? props.defaultActiveKey : ''
    )
    this.state = { activeKey }
  }

  handleChange = (activeKey) => {
    this.setState({ activeKey });
    var onChange = this.props.onChange;
    if (onChange) {
      let value = this.props.keyMap[activeKey]
      onChange(activeKey, value);
    }
  }

  render() {
    let { keyMap, activeKey, children, style } = this.props
    activeKey = activeKey != undefined ? activeKey : this.state.activeKey
    var list = []
    for (var key in keyMap) {
      list.push(
        <Tab key={key} active={key == activeKey} handleChange={this.handleChange.bind(this, key)}>{keyMap[key]}</Tab>
      )
    }
    return (
      <div className='custom-tabs-bar route-children-bg' style={style}>
        {list}
        {children}
      </div>
    )
  }
}

CustomTabBar.defaultProps = {
  style: {}
};

CustomTabBar.propTypes = {
  keyMap: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default CustomTabBar;
