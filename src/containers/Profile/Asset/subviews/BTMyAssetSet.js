import React,{PureComponent} from 'react'
import {Popconfirm,Table, Upload, Icon, message} from 'antd';
import "./styles.less"
import BTFetch from "../../../../utils/BTFetch"
import BTCryptTool from '../../../../tools/BTCryptTool'
import {getBlockInfo,getDataInfo} from '../../../../utils/BTCommonApi'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";

const PersonalAssetMessages = messages.PersonalAsset;
const Dragger = Upload.Dragger;
const callback_data = ''
var fileHashArr=[];
const  props = {

    customRequest(info){
        //生成文件存储路径url
        const file=info.file;
        if(file.size > 204800){
            message.error(window.localeInfo["PersonalAsset.UploadFileSize"])
            return;
        }
        let param={
            "userName": getAccount().username,
            "fileName": file.name,
            "fileSize": file.size,
            "filePolicy": "public",
            "fileNumber": "1",
            "fileHash":BTCryptTool.sha256(JSON.stringify(info.file)),
            "signatures": "0xxxx"
        };
        BTFetch('/asset/getFileUploadURL','post',param,{service:'service'})
            .then(res=>{
                if(res.code==1){
                    let url=res.data;
                    up_ajax(url);
                }else{
                    message.error(`${info.file} window.localeInfo["PersonalAsset.FailedToGetUrlOfDocumentStorage"]`)
                }
            }).catch(error=>{
            message.error(`${info.file} window.localeInfo["PersonalAsset.FailedToGetUrlOfDocumentStorage"]`)

        });
        let myHeaders=new Headers();
        myHeaders.append('Content-Type','text/plain')

        //上传到存储路径中
        function up_ajax(url){
            fetch(url,{
                method:'PUT',
                header:myHeaders,
                body:info.file
            })
                .then(res=>{
                    info.onSuccess();
                    console.log(res)
                    inquire();//查询状态

                }).catch(error=>{
                console.log('错误')
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
                    "file_hash":window.uuid,
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

    },
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            // message.success(`${info.file.name} file uploaded successfully.`);
            //message.success(window.localeInfo["PersonalAsset.SuccessfulToUploadTheFile"])
        } else if (status === 'error') {
            message.error(window.localeInfo["PersonalAsset.FailedToUploadTheFile"])
        }
    },
};
export default class BTMyAssetSet extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            data:[]||callback_data,
            hash:'',
            username:'',
            token:''
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
                {title: <FormattedMessage {...PersonalAssetMessages.AssetFileSize}/>, dataIndex: 'file_size', key: 'fileSize'},
                /*{title: <FormattedMessage {...PersonalAssetMessages.AssetSampleName}/>, dataIndex: 'sampleName', key: 'sampleName'},
                {title: <FormattedMessage {...PersonalAssetMessages.AssetSampleSize}/>, dataIndex: 'sampleSize', key: 'sampleSize'},*/
                {title: <FormattedMessage {...PersonalAssetMessages.UploadTime}/>, dataIndex: 'create_time', key: 'date'},
                {
                    title: <FormattedMessage {...PersonalAssetMessages.Download}/>, dataIndex: 'file_name', key: 'x', render: (item)=>{
                        return(
                            <a onClick={()=>this.download1(item)}>
                                <Icon type="download"/>
                            </a>
                        )
                    }
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
                .then(res=>{
                    if(res && res.code == 0 ){
                        if(res.data.rowCount == 0 ){
                           // message.warning(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])
                            return ;
                        }
                        this.setState({
                            data:res.data.row
                        });
                        for(let i of res.data.row){
                            fileHashArr.push(i.file_hash)
                        }

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
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p style={{color:"#666666"}} className="ant-upload-text">
                        <FormattedMessage {...PersonalAssetMessages.ClickOrDragFileToThisAreaToUpload}/>
                    </p>
                </Dragger>
                <Table
                    className="shadow radius table"
                    bordered
                    columns={columns}
                    dataSource={this.state.data}
                />
                {/*<iframe ref="ifile" style={{display:'none'}} />*/}
            </div>
        )
    }
}



