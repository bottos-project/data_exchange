import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Popconfirm,Table, Upload, Icon, message} from 'antd';
import BTFetch from "../../../utils/BTFetch"
import BTCryptTool from '@bottos-project/bottos-crypto-js'
import {getBlockInfo,getDataInfo} from '../../../utils/BTCommonApi'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from "../../../tools/localStore";
import uuid from 'node-uuid'
import { getDateAndTime } from '@/utils/dateTimeFormat'
import Base from 'webuploader/base'
import uploader from './uploader'

import ProgressList from './subviews/ProgressList'
import './style.less'

const PersonalAssetMessages = messages.PersonalAsset;

const Dragger = Upload.Dragger;
const callback_data = ''

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
                render: (item) => (
                    <a onClick={()=>this.download1(item)}>
                        <Icon type="download"/>
                    </a>
                )
            },
        ];
    }

    download1(dataIndex){
        BTFetch('/asset/getDownLoadURL','post',{
            'userName':getAccount().username,
            'fileName':dataIndex
        }).then(res=>{
            console.log(this)
            if(res.code==1){
                this.setState({href:res.data});
                console.log(res.data);
                let a = document.createElement('a');
                let url = res.data;
                let filename = dataIndex;
                a.href = url;
                a.download=filename;
                a.click();
            }else{
                message.error(window.localeInfo["PersonalAsset.FailedToDownloadTheFile"])
            }
        }).catch(error=>{
            message.error(window.localeInfo["PersonalAsset.FailedToDownloadTheFile"])
        })
    }

    customRequest = ({ file, onSuccess }) => {
      const account_info = this.props.account_info
      if (account_info == null) {
        return message.info(window.localeInfo["Header.PleaseLogInFirst"]);;
      }
        //生成文件存储路径url
        console.log('origin file', file)
        let param={
            "userName": getAccount().username,
            "fileName": file.name,
            "fileSize": file.size,
            "filePolicy": "public",
            "fileNumber": "1",
            "fileHash":BTCryptTool.sha256(JSON.stringify(file)),
            "signatures": "0xxxx"
        };

        // 这部分是大文件上传的逻辑，先注释掉
        // 这里是 guid 的生成

        // if (file.size > 200 * MegaByte) {
         // 文件大小大于 200M
         // 需要分片上传
         console.log('uploader', uploader);
         uploader.addFile(file)

         // return false
       // }


        // param = {
        //     "guid": new Date().getTime() + getAccount().username,
        //     "file_name": file.name,
        //     "chunks"
        // }
        //
        // fetch('http://139.217.206.43:8080/v2/data/getFileUploadURL', {
        //   method: 'post',
        //   body: JSON.stringify(param)
        // }).then(res => {
        //   return res.json()
        // }).then(res => {
        //   console.log('res', res);
        //   if (res.result == 200 && res.message == 'OK') {
        //     // up_ajax.call(this, res.cache_url);
        //     fetch(res.cache_url, {
        //         method: 'PUT',
        //         body: file
        //     }).then(res => {
        //       console.log('res', res);
        //
        //       fetch('http://139.217.206.43:8080/v2/data/getUploadProgress', {
        //           method: 'POST',
        //           body: JSON.stringify({
        //             guid: param.guid,
        //             slice:
        //               "userName": getAccount().username,
        //               "fileName": file.name
        //           })
        //       }).then(res => {
        //         console.log('res', res);
        //
        //
        //
        //       })
        //
        //
        //     })
        //
        //   }
        // })

        return


        BTFetch('/asset/getFileUploadURL','post',param,{service:'service'})
        .then(res => {
            if(res.code==1){
                // 将文件添加到列表
                const fileList = this.state.fileList
                const {uid, name} = file
                this.setState({
                  fileList: fileList.concat({uid, name, status: 'uploading'})
                })

                let url=res.data;
                up_ajax.call(this, url);
            }else{
                message.error(`${file} window.localeInfo["PersonalAsset.FailedToGetUrlOfDocumentStorage"]`)
            }
        }).catch(error=>{
          message.error(`${file} window.localeInfo["PersonalAsset.FailedToGetUrlOfDocumentStorage"]`)
        });

        let myHeaders=new Headers();
        myHeaders.append('Content-Type', 'text/plain')

        //上传到存储路径中
        function up_ajax(url) {
          console.log('time1', new Date().getTime());
            fetch(url, {
                method: 'PUT',
                body: file
            })
            .then(res => {
                console.log('res', res)
                const fileList = this.state.fileList
                const {uid, name} = file
                this.setState({
                  fileList: fileList.slice(0, -1).concat({uid, name, status: 'done'})
                })

                console.log('time2', new Date().getTime());
                inquire();//查询状态

            }).catch(error => {
                console.error('错误', error)
            })
        }
        /*
        1.获取url
        2.文件存储
        3.查询状态
        4.获取注册链上的参数信息
        5.注册文件。
        */
        // 查询状态
        function inquire(){
            let data={
                "userName": getAccount().username,
                "fileName": file.name
            };
            BTFetch('/asset/getFileUploadStat','post',data,{service:'service'})
              .then(res=>{
                  if(res.code=='1'){
                      makeRequest();
                  }else{
                      message.error(window.localeInfo["PersonalAsset.FailedToUploadTheFile"])
                      return ;
                  }
              }).catch(error=>{
               message.error(window.localeInfo["PersonalAsset.FailedToUploadTheFile"])
            });

        }
        //获取注册到链上data 信息及注册到链上信息
        const makeRequest = async () => {
            let _blockInfo = await getBlockInfo();
            console.log(_blockInfo);
            let param={
                "code":"datafilemng",
                "action":"datafilereg",
                "args":{
                    "file_hash":uuid.v1(),
                    "basic_info":{
                        "user_name":getAccount().username,
                        "session_id":getAccount().token,
                        "file_size":file.size,
                        "file_name":file.name,
                        "file_policy":"policytest",
                        "file_number":1,
                        "signature":"0xxxxx",
                        "auth_path":"sigtest"
                    }
                }
            };
            let getDataInfos=(await getDataInfo(param));
            let blockInfo=_blockInfo.data;
            let getscope=[getAccount().username,"datafilemng"].sort();
            let data={
                "ref_block_num": blockInfo.ref_block_num,
                "ref_block_prefix": blockInfo.ref_block_prefix,
                "expiration": blockInfo.expiration,
                "scope": getscope,
                "read_scope": [],
                "messages": [{
                    "code": "datafilemng",
                    "type": "datafilereg",
                    "authorization": [],
                    "data": getDataInfos.data.bin
                }],
                "signatures": []
            };
            console.log(data);
            BTFetch('/asset/registerFile','post',data,{service:'service'})
                .then(res=>{
                    if(res.code==1){
                        message.success(window.localeInfo["PersonalAsset.SuccessfulToUploadTheFile"])
                    }else{
                        message.error(window.localeInfo["PersonalAsset.FailedToUploadTheFile"])
                    }
                }).catch(error=>{
                message.error(window.localeInfo["PersonalAsset.FailedToUploadTheFile"])
            });
        };

    }

    onDelete(key){
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }

    componentDidMount() {
            let data={
                "userName": getAccount().username||'',
                "random": Math.ceil(Math.random()*100),
                "signatures": "0xxxx"
            };
            BTFetch('/asset/queryUploadedData','post',data)
            .then(res => {
                if(res && res.code == 0 ){
                    if(res.data.rowCount == 0 ){
                       // message.warning(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])
                        return ;
                    }
                    this.setState({
                        data: res.data.row.map(ele => ({...ele, key: ele.file_hash}))
                    });

                }else{

                }
            }).catch(error=>{
                console.log(error)
            });


    }

    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(
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
                    dataSource={this.state.data}
                />
                {/*<iframe ref="ifile" style={{display:'none'}} />*/}
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
