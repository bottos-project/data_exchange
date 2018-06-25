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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFile } from '@/redux/actions/uploaderAction'
import { Upload, Icon } from 'antd';
import BTCryptTool from 'bottos-crypto-js'
import { getSignaturedParam } from '../../../utils/BTCommonApi'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from "@/tools/localStore";
import { getDateAndTime } from '@/utils/dateTimeFormat'
import Base from 'webuploader/base'
import uploader from './uploader'
import { checkCacheFile } from './uploader/continue'
import { BTDownloadFile } from '@/utils/BTDownloadFile'
import BTTable from '@/components/BTTable'
import { getCacheFileState } from '@/utils/uploadingFileCache'
import myEmitter from '../../../utils/eventEmitter'
import ProgressList from './subviews/ProgressList'
import './style.less'

const PersonalAssetMessages = messages.PersonalAsset;

const Dragger = Upload.Dragger;

const GigaByte = Math.pow(2, 30)
const MegaByte = 1 << 20

function beforeUpload(file) {
  // console.log('file.size', file.size)
  if (file.size > 2 * GigaByte) {
  // if (file.size > 200 * MegaByte) {
    // 文件大小大于 2G
    // 不支持上传
    window.message.error(window.localeInfo["PersonalAsset.UploadFileSize200M"])
    return false;
  }
}

function findByGuid(arr, guid) {
  return arr.find(ele => ele.guid == guid)
}

const columns = [
  {title: <FormattedMessage {...PersonalAssetMessages.AssetFileName}/>, dataIndex: 'file_name',
    render: (item) => <div>{item}</div>
  },
  {title: <FormattedMessage {...PersonalAssetMessages.AssetFileSize}/>, dataIndex: 'file_size',
    render: size => Base.formatSize( size )
  },
  {title: <FormattedMessage {...PersonalAssetMessages.UploadTime}/>, dataIndex: 'create_time',
    render: getDateAndTime
  },
  {
    title: <FormattedMessage {...PersonalAssetMessages.Download}/>, dataIndex: 'file_hash',
    render: (file_hash) => (
        <a onClick={() => BTDownloadFile(file_hash, getAccount().username) }>
            <Icon type="download"/>
        </a>
    )
  }
]

class BTMyAssetSet extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            hash:'',
            username:'',
            fileList: []
        }
    };

    customRequest = ({ file, onSuccess }) => {
      const account_info = this.props.account_info
      if (account_info == null) {
        return message.info(window.localeInfo["Header.PleaseLogInFirst"]);;
      }
      //生成文件存储路径url
      // console.log('origin file', file)

      let hadFile = this.props.fileList.find(item => item.path == file.path)
      if (hadFile && hadFile.status != 'error') {
        return message.info('重复上传');
      }

      uploader.addFile(file)
    }

    changeTableData = () => {
      this.table.onChange(1, 12)
    }

    componentDidMount() {
      let filesGuidArr = getCacheFileState()
      console.log('filesGuidArr', filesGuidArr);
      // 如果有以前没有传完的记录
      // 则遍历这个记录的数组，然后向后端发起请求
      // console.log('this.props.fileList', this.props.fileList);
      for (var cachedFile of filesGuidArr) {
        if ( findByGuid(this.props.fileList, cachedFile.guid)) {
          continue
        }
        // console.log('cachedFile', cachedFile);
        cachedFile.cache = true
        cachedFile.status = 'inited'
        // cachedFile.id = cachedFile.guid
        delete cachedFile.id
        console.log('cachedFile', cachedFile);
        checkCacheFile(cachedFile)
        // cachedFile.name =
        // this.props.addFile({})
      }

      console.log('this.table', this.table);
      myEmitter.on('registerFile', this.changeTableData)
    }

    componentWillUnmount() {
      myEmitter.removeListener('registerFile', this.changeTableData)
    }

    render(){
      if (!getAccount()) {
        return null
      }
        return (
            <div className="set">
                <Dragger
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  customRequest={this.customRequest}
                  >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p style={{color:"#666666"}} className="ant-upload-text">
                        <FormattedMessage {...PersonalAssetMessages.ClickOrDragFileToThisAreaToUpload}/>
                    </p>
                </Dragger>
                <ProgressList />
                <BTTable
                  ref={t => this.table = t}
                  columns={columns}
                  rowKey='file_hash'
                  url='/asset/queryUploadedData'
                  options={{...getSignaturedParam(getAccount()), fileType: 1}}
                  catchError={error => console.error(error)}
                />

            </div>
        )
    }
}

function mapStateToProps(state) {
  const account_info = state.headerState.account_info
  const fileList = state.uploaderState.fileList
  return { account_info, fileList }
}

function mapDispatchToProps(dispatch) {
  return {
    addFile(f) {
      dispatch( addFile(f) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BTMyAssetSet)
