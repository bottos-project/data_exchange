import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Popconfirm,Table, Upload, Icon, message} from 'antd';
import BTFetch from "../../../utils/BTFetch"
import BTCryptTool from '@bottos-project/bottos-crypto-js'
import {getBlockInfo, getDataInfo, getSignaturedParam} from '../../../utils/BTCommonApi'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from "@/tools/localStore";
import uuid from 'node-uuid'
import { getDateAndTime } from '@/utils/dateTimeFormat'
import Base from 'webuploader/base'
import uploader, { file_test_url } from './uploader'

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
    message.error(window.localeInfo["PersonalAsset.UploadFileSize"])
    return false;
  }
}


function getDownloadFileIP(guid) {
  return fetch(file_test_url + '/data/getStorageIP', {
    method: 'POST',
    body: JSON.stringify({ guid }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => {
    console.log('res', res);
    // let _snode_ip = 私钥解密后的 snode_ip
    // ip 字段中，sguid 其实是 chunk
    // snode_ip 是加密后的，要通过私钥解密
    let ip = res.ip.map(({sguid, snode_ip}) => ({
        sguid: guid + sguid,
        snode_ip
      })
    )
    return { guid, ip }
  })
}

// getDownloadFileIP("e2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf9")

function getFileDownloadURL(param) {

  fetch(file_test_url + '/data/getFileDownloadURL', {
    method: 'POST',
    body: JSON.stringify(param),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json()).then(res => {
    console.log('getFileDownLoadURL res', res);
    let a = document.createElement('a');
    a.href = res.url
    a.download = param.fileName
    a.click();
  })

}


class BTMyAssetSet extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[{
              file_name: 'adf',
              file_size: 345345,
              create_time: 150134234,
            }],
            hash:'',
            username:'',
            token:'',
            fileList: []
        }
    };

    columns(data) {
        // console.log(data);
        return [
            {title: <FormattedMessage {...PersonalAssetMessages.AssetFileName}/>, dataIndex: 'file_name', key: 'fileName',
                render:(item)=>{
                    return <span>
                       {item.length < 30? item:item.substring(0,30)+'...'}
                    </span>
                }},
            {title: <FormattedMessage {...PersonalAssetMessages.AssetFileSize}/>, dataIndex: 'file_size', key: 'fileSize',
              render: size => Base.formatSize( size )
            },
            /*{title: <FormattedMessage {...PersonalAssetMessages.AssetSampleName}/>, dataIndex: 'sampleName', key: 'sampleName'},
            {title: <FormattedMessage {...PersonalAssetMessages.AssetSampleSize}/>, dataIndex: 'sampleSize', key: 'sampleSize'},*/
            {title: <FormattedMessage {...PersonalAssetMessages.UploadTime}/>, dataIndex: 'create_time', key: 'date',
              render: item => getDateAndTime(item)
            },
            {
                title: <FormattedMessage {...PersonalAssetMessages.Download}/>, dataIndex: 'file_name', key: 'x',
                render: (text, record) => (
                    <a onClick={()=>this.download1(record)}>
                        <Icon type="download"/>
                    </a>
                )
            },
        ];
    }

    async download1(record) {

      console.log('record', record);

      const guid = record.file_hash
      const fileName = record.file_name

      let param = await getDownloadFileIP(guid)

      console.log('getAccount()', getAccount());
      param.username = getAccount().username
      param.fileName = fileName

      getFileDownloadURL(param)

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
