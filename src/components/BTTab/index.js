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
