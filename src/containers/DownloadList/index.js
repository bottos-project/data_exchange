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
import { updateDownload } from '../../redux/actions/downloadAction'
import { Collapse, List } from 'antd';
import DownloadItem from './subviews/DownloadItem'
const { ipcRenderer } = window.electron

import './style.less'

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

    // const { downloads } = this.props
    //
    // downloads.forEach(el => {
    //   if (el.status == 'done') {
    //
    //   }
    // })

  }

  render() {
    const { downloads } = this.props
    return (
      <div className='download-list-simple'>
        <Collapse>
          <Panel header="This is Download List" key="1">
            <List
              dataSource={downloads}
              renderItem={item => (
                <List.Item key={item.filePath}>
                  <DownloadItem item={item} />
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const {downloads, visible} = state.downloadState
  return { downloads, visible }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDownload(f) {
      dispatch( updateDownload(f) )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadList);
