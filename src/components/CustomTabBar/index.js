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
    this.state = {
      activeKey: props.activeKey || ''
    };
  }
  handleChange = (activeKey) => {
    console.log('activeKey', activeKey);
    this.setState({ activeKey });
    var onChange = this.props.onChange;
    if (onChange) {
        onChange(activeKey);
    }
  }
  render() {
    const { keyMap, activeKey, children, style } = this.props
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
  activeKey: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default CustomTabBar;
