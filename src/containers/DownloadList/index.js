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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateDownload, toggleVisible } from '../../redux/actions/downloadAction'
import { Collapse, List } from 'antd';
import DownloadItem from './subviews/DownloadItem'
import HasDownloaded from './subviews/HasDownloaded'
import {FormattedMessage} from 'react-intl'
const { ipcRenderer } = window.electron

import './style.less'

import messages from '@/locales/messages'

const FileMessages = messages.File;

const Panel = Collapse.Panel;

/**
 * 这个组件是显示所有已下载的文件
 * 目前先放在页面的右下角
 * 之后再改位置
 * @extends Component
 */
class DownloadList extends Component {

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(this.channel)
  }

  componentDidMount() {
    this.channel = 'file_download'

    ipcRenderer.on(this.channel, (event, message) => {
      console.log('message', message);
      // this.setState({ percent: 100 })
      // let status = message.status
      // if (status == 'done') {
        this.props.updateDownload(message)
      // }
    })

  }

  listOut = (e) => {
    this.props.toggleVisible(false)
  }

  render() {
    const { downloads, visible } = this.props
    const className = 'download-list-simple' + (visible ? ' visible' : '')
    // const className = 'download-list-simple' + ' visible'

    const isDownloading = [], hasDownloaded = [];

    downloads.forEach(ele => {
      if (ele.status == 'done' || ele.status == 'inexistence') {
        hasDownloaded.push(ele)
        // for (let i = 0; i < 8; i++) {
        // }
      } else {
        isDownloading.push(ele)
        // for (let i = 0; i < 8; i++) {
        // }
      }
    })


    return (
      <div className={className}>
        <Collapse className='column' accordion defaultActiveKey='1'>
          <Panel className='download-list-collapse-panel' header={<FormattedMessage {...FileMessages.Downloading} />} key="1">
            <List
              dataSource={isDownloading}
              renderItem={item => (
                <List.Item key={item.filePath}>
                  <DownloadItem item={item} />
                </List.Item>
              )}
            />
          </Panel>
          <Panel className='download-list-collapse-panel' header={<FormattedMessage {...FileMessages.Complete} />} key="2">
            <List
              dataSource={hasDownloaded}
              renderItem={item => (
                <List.Item key={item.filePath}>
                  <HasDownloaded item={item} />
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
        <div className='download-list-out' onClick={this.listOut}>></div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const {downloads, visible} = state.downloadState
  return { downloads, visible }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDownload, toggleVisible}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadList);
