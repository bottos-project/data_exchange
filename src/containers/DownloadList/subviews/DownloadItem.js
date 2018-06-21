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
import { Icon, Popconfirm } from 'antd';
import ProgressICON from './ProgressICON';
import BTIpcRenderer from '@/tools/BTIpcRenderer'
import {FormattedMessage} from 'react-intl'
import messages from '@/locales/messages'

const FileMessages = messages.File;

function cancel(e) {
  // console.log('cancel', e);
}

class DownloadItem extends PureComponent {

  handleClose = (e) => {
    const { status, filePath } = this.props.item
    console.log('status', status);
    if (status == 'downloading') {
      return ;
    }
    this.props.deleteDownload(filePath)
    BTIpcRenderer.deleteDownLoadCache(this.props.item)
    // console.log('要处理');

  }

  componentDidMount() {

    const { item, updateDownload } = this.props
    const { status, filePath } = item

    if (status == 'done' && !window.existsSync(filePath)) {
      console.log('不存在啊');
      updateDownload({
        ...item,
        status: 'inexistence',
      })
    }

  }

  render() {
    const item = this.props.item
    const { filePath, status, basename } = item
    // const { status,  }
    // console.log('filePath', filePath);
    let pathArr = filePath.split('\\')
    let name = basename || pathArr.pop()
    // console.log('name', name);
    // let name = basename(filePath) ? basename(filePath) : filePath
    return (
      <div className='download-list-item'>
        <span className={status}>
          {name}
        </span>

        <span className='download-list-item-status'>
          <ProgressICON {...item} />
        </span>

        <Popconfirm placement="bottomRight"
          title={<FormattedMessage {...FileMessages.SureToDelete} />}
          onConfirm={this.handleClose} onCancel={cancel}
          okText={<FormattedMessage {...messages.OK} />}
          cancelText={<FormattedMessage {...messages.Cancel} />}
          >
          <span className='download-list-item-close'>
            <Icon type="close" />
          </span>
        </Popconfirm>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDownload, deleteDownload}, dispatch)
}

export default connect(null, mapDispatchToProps)(DownloadItem);
