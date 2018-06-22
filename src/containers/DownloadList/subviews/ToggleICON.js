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
// import cloneDeep from 'lodash/cloneDeep'
import { Icon } from 'antd';
const { ipcRenderer } = window.electron


class ToggleICON extends Component {

  pause = (e) => {
    const { guid } = this.props
    // console.log('guid pause', guid)
    ipcRenderer.send('file_download:pause', {
      guid
    })
  }

  restart = (e) => {
    // console.log('e target restart', e.target);
    const { guid, status } = this.props
    console.log('this.props', this.props);
    let params = { guid }
    if (status == 'cached') {
      params = {...this.props}
    }
    ipcRenderer.send('file_download:resume', params)
  }


  render() {
    const { status } = this.props
    // console.log('status', status);
    if (status == 'downloading') {
      return <Icon type="pause-circle-o" onClick={this.pause} />;
    } else {
      return <Icon type="play-circle-o" onClick={this.restart} />;
    }

  }
}

ToggleICON.propTypes = {
  status: PropTypes.string.isRequired,
  filePath: PropTypes.string.isRequired,
};

export default ToggleICON
