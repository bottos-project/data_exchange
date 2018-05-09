import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CustomTabBar from '../CustomTabBar'

class BTTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.defaultActiveKey || ''
    };
  }
  handleChange = (key) => {
    this.setState({
      activeKey: key
    });
  }

  render() {
    const { keyMap, defaultActiveKey, children } = this.props

    return (
      <div className='container column' style={{height: '100%'}}>
        <CustomTabBar onChange={this.handleChange} keyMap={keyMap} activeKey={this.state.activeKey} />
        <div className='route-children-bg' style={{flex: 1, height: '100%'}}>
          <Tabs
            defaultActiveKey={defaultActiveKey}
            activeKey={this.state.activeKey}
          >
            {children}
          </Tabs>
        </div>
      </div>
    );
  }

}

BTTab.propTypes = {
  keyMap: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  defaultActiveKey: PropTypes.string
}


export default BTTab;
