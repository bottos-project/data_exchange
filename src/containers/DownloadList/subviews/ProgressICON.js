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
import { join } from 'path'
import cloneDeep from 'lodash/cloneDeep'
import { Progress, Icon } from 'antd';
const { ipcRenderer } = window.electron

function calcTotal(urlList) {
  return urlList.map(el => el.totalBytes).reduce(function (accumulator, currentValue, currentIndex) {
    if (currentValue == undefined) {
      currentValue = urlList[0].totalBytes
    }
    return accumulator + currentValue
  })
}

class ProgressICON extends Component {

  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
    };
  }


  pause = (e) => {
    const { guid } = this.props
    // console.log('guid pause', guid)
    ipcRenderer.send('file_download:pause', {
      guid
    })
  }

  restart = (e) => {
    // console.log('e target restart', e.target);
    const { guid, status, urlList, filePath } = this.props
    console.log('this.props', this.props);
    console.log('urlList', urlList);
    let params = { guid }
    if (status == 'cached') {
      params = {...this.props}
    }
    ipcRenderer.send('file_download:resume', params)
  }

  componentDidMount() {
    const { status, filePath, urlList, dirname } = this.props

    if (status == 'cached') {
      let received = 0
      for (let sliceInfo of urlList) {
        if (sliceInfo.status == 'done') {
          if (!window.existsSync(join(dirname, sliceInfo.sguid))) {
            console.log('分片不存在了');
          }
          received += sliceInfo.receivedBytes
        }
      }
      let total = calcTotal(urlList)
      let percent = Number.parseInt(received / total * 100)
      this.setState({ percent })

    }

    this.channel = 'file_download:' + filePath

    ipcRenderer.on(this.channel, (event, message) => {
      // console.log('message', message);
      let urlList = message.urlList
      // console.log('urlList', urlList);
      let chunks = urlList.length
      let total = urlList[0].totalBytes * chunks
      let received = 0
      for (var i = 0; i < urlList.length; i++) {
        received += urlList[i].receivedBytes
      }
      if (received > urlList[0].totalBytes * (chunks - 1)) {
        total = calcTotal(urlList)
      }
      // console.log('received', received);
      // console.log('total', total);
      let percent = Number.parseInt(received / total * 100)
      this.setState({ percent })
    })

  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(this.channel)
  }

  render() {
    const { status } = this.props
    console.log('status', status);

    return <div className='download-list-item-progress'>
      <Progress showInfo={false} type="circle" width={20} percent={this.state.percent} />
      {
        status == 'downloading' ?
        <Icon type="pause" onClick={this.pause} /> :
        <Icon type="caret-right" onClick={this.restart} />
      }

    </div>

  }
}

ProgressICON.propTypes = {
  status: PropTypes.string.isRequired,
  filePath: PropTypes.string.isRequired,
};

export default ProgressICON
