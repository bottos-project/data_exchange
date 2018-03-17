import React,{PureComponent} from 'react'
import {Popconfirm,Table, Upload, Icon, message} from 'antd';
import "./styles.less"
import BTFetch from "../../../../utils/BTFetch"
import BTCryptTool from '../../../../tools/BTCryptTool'
import {getBlockInfo,getDataInfo} from '../../../../utils/BTCommonApi'
const Dragger = Upload.Dragger;
const callback_data = ''
// console.log(getBlockInfo,getDataInfo)
const  props = {
    customRequest(info){
        //生成文件存储路径url
        const file=info.file;
        let param={
            "userName": "btd121",
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
                    message.error(`${info.file} 获取文件存储url失败`)
                }
            }).catch(error=>{
                message.error(`${info.file} 获取文件存储url失败`)
        });
        let myHeaders=new Headers();
        myHeaders.append('Content-Type','text/plain')

        //上传到存储路径中
        const status = info.file.status;
        function up_ajax(url){

           /* BTFetch(url,'put',{},{full_path:true})
                .then(res=>{
                    console.log(res);
                    inquire()
                }).catch(error=>{
                    message.error(`${info.file} 上传到存储路径失败 `);
            });*/
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
                "userName": "btd121",
                "fileName": file.name
            };
           BTFetch('/asset/getFileUploadStat','post',data,{service:'service'})
                .then(res=>{
                    if(res.code=='1'){
                        makeRequest();
                    }else{
                        message.error(`${info.file}文件上传失败`);
                        return ;
                    }
                }).catch(error=>{
                message.error(`${info.file} 文件上传失败 `);
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
                    "file_hash":"filehashtest",
                    "basic_info":{
                        "user_name":"btd121",
                        "session_id":"sessidtest",
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
            /*if(getDataInfos.code!=0 || !_blockInfo.code!=0){
                message.error('获取区块信息失败')
            };*/
            console.log();
            let blockInfo=_blockInfo.data;
            let data={
                "ref_block_num": blockInfo.ref_block_num,
                "ref_block_prefix": blockInfo.ref_block_prefix,
                "expiration": blockInfo.expiration,
                "scope": ["datafilemng"],
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
                        message.success(info.file+`文件上传成功`)
                    }else{
                        message.error(info.file+`文件上传失败`)
                    }
                }).catch(error=>{
                message.error(info.file+`文件上传失败`)
            });

        };

    },
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};



export default class BTMyAssetSet extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            data:[]||callback_data,
            hash:''
        }
    };

    columns(data) {
        console.log(data);
            return [
                {title: 'FileName', dataIndex: 'file_name', key: 'fileName'},
                {title: 'FileSize', dataIndex: 'file_size', key: 'fileSize'},
                {title: 'sampleName', dataIndex: 'sampleName', key: 'sampleName'},
                {title: 'sampleSize', dataIndex: 'sampleSize', key: 'sampleSize'},
                {title: 'Date', dataIndex: 'date', key: 'date'},
                {
                    title: "Download", dataIndex: 'file_name', key: 'x', render: (item)=>{
                        return(
                            <a href={this.state.href} onClick={()=>this.download(item)}>
                                <Icon type="download"/>
                            </a>
                        )
                    }
                },
                {
                    title: "Delete", dataIndex: 'delete', key: 'y', render: (text, record)=>{
                        return (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                                <a  href="#">Delete</a>
                            </Popconfirm>
                        );
                    }
                }
            ];
     }
     download(dataIndex){
        BTFetch('/asset/getDownLoadURL','post',{
            'userName':'btd121',
            'fileName':dataIndex
        }).then(res=>{
            console.log(res);
            if(res.code==1){
                this.setState({href:res.data});
                let iframe = document.createElement("iframe");
                iframe.style.display = "none";
                iframe.src = this.state.href;
                document.body.appendChild(iframe);
            }else{
                message.error(`${dataIndex} file download failed.`)
            }
        }).catch(error=>{
            message.error(`${dataIndex} file download failed.`)
        })
    }


    onDelete(key){
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }
    componentDidMount() {
            let getUrl=[];
            let param={
                'userName':'btd121',
                'fileName':'test.zip'
            };
            let data={
                "userName": "btd121",
                "random": Math.ceil(Math.random()*100),
                "signatures": "0xxxx"
            };
            BTFetch('/asset/queryUploadedData','post',data,{service:'service'})
                .then(res=>{
                    if( res.code == 1 ){
                        let data=JSON.parse(res.data);
                        console.log(data);
                        if(res.data == 'null' ){
                            return ;
                            message.warning('资源库为空')
                        }
                        this.setState({
                            data:data
                        })
                    }
                    console.log(this.state.data)
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
                    <p style={{color:"#666666"}} className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p style={{color:"#666666"}} className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dragger>
                <Table
                    className="shadow radius table"
                    bordered
                    columns={columns}
                    dataSource={this.state.data}
                />
            </div>
        )
    }
}



