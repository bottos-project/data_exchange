import React,{PureComponent} from 'react'
import {Popconfirm,Table, Upload, Icon, message} from 'antd';
import "./styles.less"
import BTFetch from "../../../../utils/BTFetch"
import BTCryptTool from '../../../../tools/BTCryptTool'
import {getBlockInfo,getDataInfo} from '../../../../utils/BTCommonApi'

const Dragger = Upload.Dragger;
// const md5File=require('md5-file');
// const md5File = require('md5-file/promise')
// const fs=require('fs');
const callback_data = ''
const props = {
    customRequest(info){
        //生成文件存储路径url
        const file=info.file;
        var param={
            "userName": "btd121",
            "fileName": file.name,
            "fileSize": file.size,
            "filePolicy": "public",
            "fileNumber": "1",
            "fileHash":BTCryptTool.sha256(JSON.stringify(info.file)),
            "signatures": "0xxxx"
        }

        var myHeaders=new Headers();
        myHeaders.append('Content-Type','text/plain')
        fetch('http://10.104.21.10:8080/v2/asset/getFileUploadURL',{
            method:'POST',
            header:myHeaders,
            body:JSON.stringify(param)
        })
            .then(response=>response.json())
            .then(res=>{
                console.log(res)
                if(res.code==1){
                    let url=res.data;
                    up_ajax(url);
                }
            }).catch(error=>{
            console.log(error)
        })
        //上传到存储路径中
        const status = info.file.status;
        function up_ajax(url){
            var myHeaders=new Headers();
            myHeaders.append('Content-Type','text/plain; charset=utf-8');
            console.log(url)
            fetch(url,{
                method:'PUT',
                header:myHeaders,
                body:info.file
            })
            // .then(response=>response.json())
                .then(res=>{
                    info.onSuccess();
                    console.log(res)
                    inquire();//查询状态
                    // inquire_data()//查询注册链上参数

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
            var data={
                "userName": "btd121",
                "fileName": file.name
            }
            fetch('http://10.104.21.10:8080/v2/asset/getFileUploadStat',{
                method:'POST',
                header:myHeaders,
                body:JSON.stringify(data)
            })
                .then(response=>response.json())
                .then(result=>{
                    console.log(result)
                    if(result.msg=='OK'){
                        inquire_data();
                    }
                }).catch(error=>{
                console.log(error)
            })
        }
        //获取注册到链上data 信息
        function fetch_all(url,method,data){
            fetch(url,{
                method:method,
                header:myHeaders,
                body:JSON.stringify(data)
            }).then(response=>response.json())
        }
        function inquire_data(){
            var data={
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
            }
            fetch('http://10.104.14.169:8888/v1/chain/abi_json_to_bin',{
                method:'POST',
                header:myHeaders,
                body:JSON.stringify(data)
            })
                .then(response=>response.json())
                .then(res=>{
                    console.log(res);
                    let binargs=res.binargs;
                    lian(binargs);
                })
        }
        // 注册到链上
        async function lian(binargs){
            let blockInfo = (await getBlockInfo()).data;
            var data={
                "ref_block_num": blockInfo.ref_block_num,
                "ref_block_prefix": blockInfo.ref_block_prefix,
                "expiration": blockInfo.expiration,
                "scope": ["datafilemng"],
                "read_scope": [],
                "messages": [{
                    "code": "datafilemng",
                    "type": "datafilereg",
                    "authorization": [],
                    "data": binargs
                }],
                "signatures": []
            }
            console.log(data)
            fetch('http://10.104.21.10:8080/v2/asset/registerFile',{
                method:'POST',
                header:myHeaders,
                body:JSON.stringify(data)
            }).then(response=>response.json())
                .then(res=>{
                    if(res.code==1){
                        alert(`注册成功！！！`);
                        var data={
                            "userName": "btd121",
                            "random": Math.ceil(Math.random()*100),
                            "signatures": "0xxxx"
                        };
                        fetch('http://10.104.21.10:8080/v2/asset/queryUploadedData',{
                            method:'POST',
                            header:myHeaders,
                            body:JSON.stringify(data)
                        })
                            .then(response=>response.json())
                            .then(res=>{
                                if(res.code=='1'){
                                    let _data=JSON.parse(res.data);
                                    console.log(_data);
                                    if(_data == null){
                                        return
                                    }
                                    // callback_data = _data;
                                    // return callback_data
                                }

                            })
                    }else{
                        alert('error！！！')
                    }
                    console.log(res)
                })
        }
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
            data:''||callback_data,
            none_hash:'',
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
                        console.log({
                            item
                        })
                        return(
                            <a onClick={()=>this.download(item)}>
                                <Icon type="download" style={{color: "black", fontWeight: 900}}/>
                            </a>
                        )
                    }
                },
                {
                    title: "Delete", dataIndex: 'delete', key: 'x', render: (text, record)=>{
                        return (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                                <a  href="#" style={{color: "#6d6df5"}}>Delete</a>
                            </Popconfirm>
                        );
                    }
                }
                /*{
                    title: 'Delete', dataIndex: 'delete',
                    render: (text, record) => {
                        return (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                                <a  href="#" style={{color: "#6d6df5"}}>Delete</a>
                            </Popconfirm>
                        );
                    },
                },*/
            ];
     }
     download(dataIndex){
        console.log(dataIndex);
        BTFetch('http://10.104.20.80:8080/v2/asset/getDownLoadURL','post',{
            'userName':'btd121',
            'fileName':dataIndex
        },{
            full_path:true,
        }).then(res=>{
            console.log(res);
            if(res.code==1){
                debugger;
                this.setState({href:res.data});
            }
        })
    }


    onDelete(key){
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }
    componentDidMount() {
        var getUrl=[];
        var param={
            'userName':'btd121',
            'fileName':'test.zip'
        };
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','text/plain');
            var data={
                "userName": "btd121",
                "random": Math.ceil(Math.random()*100),
                "signatures": "0xxxx"
            };
            fetch('http://10.104.21.10:8080/v2/asset/queryUploadedData',{
                method:'POST',
                header:myHeaders,
                body:JSON.stringify(data)
            })
                .then(response=>response.json())
                .then(res=>{
                    if(res.code=='1'){
                        let data=JSON.parse(res.data);
                        console.log(data);
                        if(data == null){
                            return
                        }
                        this.setState({
                            data:data
                        })
                    }
                    console.log(this.state.data)
                })


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
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dragger>
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.data}
                />
                <input style={{display:'none'}} id='none_hash' ref='none_hash' value={this.state.none_hash} />
            </div>
        )
    }
}



