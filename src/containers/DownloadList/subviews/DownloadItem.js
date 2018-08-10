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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteDownload, updateDownload } from '../../../redux/actions/downloadAction'
import { Progress, Icon, Popconfirm } from 'antd';
import { join } from 'path'
import ToggleICON from './ToggleICON';
import BTIpcRenderer from '@/tools/BTIpcRenderer'
import {FormattedMessage} from 'react-intl'
import Base from 'webuploader/base'

import messages from '@/locales/messages'
const { ipcRenderer } = window.electron

const FileMessages = messages.File;

function cancel(e) {
  // console.log('cancel', e);
}

var fileSizeCache = {}

function calcTotal(urlList, guid) {
  let cacheSize = fileSizeCache[guid]
  if (cacheSize != undefined) {
    return cacheSize;
  }
  let all = true;
  let total = urlList.map(el => el.totalBytes).reduce(function (accumulator, currentValue, currentIndex) {
    if (currentValue == undefined) {
      currentValue = urlList[0].totalBytes
      all = false
    }
    return accumulator + currentValue
  })
  if (all) {
    fileSizeCache[guid] = total
  }
  return total;
}

class DownloadItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
    };
  }

  handleClose = (e) => {
    const { item, deleteDownload } = this.props
    const { status, filePath } = item
    console.log('status', status);
    deleteDownload(filePath)
    BTIpcRenderer.deleteDownLoadCache(item)
  }

  componentDidMount() {
    const { item } = this.props
    const { status, filePath, urlList, dirname, guid } = item

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
      let total = calcTotal(urlList, guid)
      let percent = Number.parseInt(received / total * 100)
      this.setState({ percent })

    }

    this.channel = 'file_download:' + filePath

    ipcRenderer.on(this.channel, (event, message) => {
      // console.log('message', message);
      let urlList = message.urlList
      // console.log('urlList', urlList);
      let chunks = urlList.length
      let received = 0
      for (var i = 0; i < urlList.length; i++) {
        received += urlList[i].receivedBytes
      }
      let total = calcTotal(urlList, guid)
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
    const item = this.props.item
    const { filePath, status, basename, guid } = item
    // const { status,  }
    // console.log('filePath', filePath);
    let pathArr = filePath.split('\\')
    let name = basename || pathArr.pop()

    let total = fileSizeCache[guid] ? Base.formatSize(fileSizeCache[guid]) : '--'
    // console.log('name', name);
    // let name = basename(filePath) ? basename(filePath) : filePath
    return (
      <div className='download-list-item'>

        <span className='download-item-icon'>
          <img src='./img/unkown.svg' />
        </span>

        <div className='download-item-info-container'>
          <span className={status}>
            {name}
          </span>
          <div> {total} </div>
        </div>

        <span className='download-list-toggle-icon'>
          <ToggleICON {...item} />
        </span>

        <Popconfirm placement="bottomRight"
          title={<FormattedMessage {...FileMessages.SureToDelete} />}
          onConfirm={this.handleClose} onCancel={cancel}
          okText={<FormattedMessage {...messages.OK} />}
          cancelText={<FormattedMessage {...messages.Cancel} />}
          >
          <span className='download-item-delete'>
            <FormattedMessage {...FileMessages.DeleteTask} />
          </span>
        </Popconfirm>

        <Progress showInfo={false} percent={this.state.percent} />

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDownload, deleteDownload}, dispatch)
}

export default connect(null, mapDispatchToProps)(DownloadItem);
