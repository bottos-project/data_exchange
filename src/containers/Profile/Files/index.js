import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Popconfirm,Table, Upload, Icon, message} from 'antd';
import BTFetch from "../../../utils/BTFetch"
import BTCryptTool from '@bottos-project/bottos-crypto-js'
import {getBlockInfo, getDataInfo, getSignaturedParam} from '../../../utils/BTCommonApi'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from "@/tools/localStore";
import { getDateAndTime } from '@/utils/dateTimeFormat'
import Base from 'webuploader/base'
import uploader from './uploader'
import { BTDownloadFile } from '@/utils/BTDownloadFile'

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
    window.message.error(window.localeInfo["PersonalAsset.UploadFileSize"])
    return false;
  }
}

class BTMyAssetSet extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            hash:'',
            username:'',
            token:'',
            fileList: []
        }
    };

    columns(data) {
      // console.log(data);
      return [
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
        },
      ];
    }

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

      console.log('uploader', uploader);
      uploader.addFile(file)

    }

    onDelete(key){
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }

    componentDidMount() {

        BTFetch('/asset/queryUploadedData', 'post', {
          ...getSignaturedParam(getAccount()),
          pageSize: 12,
          pageNum: 1,
          fileType: 1
        }).then(res => {
            if (res.code == 1 && res.data.rowCount > 0) {
              // message.warning(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])
              this.setState({ data: res.data.row })
            }
        }).catch(error => console.error(error))

    }

    render(){
        const { data } = this.state;
        const columns = this.columns(data);
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
                <Table
                    className="shadow radius table"
                    columns={columns}
                    dataSource={data}
                    rowKey='file_hash'
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

export default connect(mapStateToProps)(BTMyAssetSet)
