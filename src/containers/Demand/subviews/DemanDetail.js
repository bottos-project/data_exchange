import BTFetch from "../../../utils/BTFetch";
import {getBlockInfo, getDataInfo} from "../../../utils/BTCommonApi";
import {message} from "antd/lib/index";
import React,{PureComponent} from 'react'
import { Carousel,Button,Tag,Input } from 'antd';
import BTAssetList from './BTAssetList'
import {browerHistory} from 'react-router'
import './styles.less'
const { TextArea } = Input;


export default class BTDemanDetail extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            exampledata:[],
        }
    }
    commitAsset(){
        this.assetListModal.setState({
            visible:true
        })
    }
   async handleFile(fileInfo){
        console.log({
            fileInfo
        })
        let asset=fileInfo.value;
        if(!fileInfo.value){
            message.error('暂无提交资产');
            return ;
        };
        let param={
            "code":"datadealmng",
            "action":"datapresale",
            "args":{
                "data_presale_id":"idtest",
                "basic_info":{
                    "user_name":"btd121",
                    "session_id":"sessionidtest",
                    "asset_id":fileInfo.value,
                    "data_req_id":this.props.location.state.requirement_id,
                    "consumer":"buyer",
                    "random_num":Math.ceil(Math.random()*100),
                    "signature":"sigtest"
                }
            }
        };
        let block=await getBlockInfo();
        let getDate=await getDataInfo(param);
        if(block.code!=0||getDate.code!=0){
            message.error('获取区块信息失败');
            return;
        }
        let data={
            "ref_block_num": block.data.ref_block_num,
            "ref_block_prefix": block.data.ref_block_prefix,
            "expiration": block.data.expiration,
            "scope": ["datadealmng"],
            "read_scope": [],
            "messages": [{
                "code": "datadealmng",
                "type": "datapresale",
                "authorization": [],
                "data": getDate.data.bin
            }],
            "signatures": []
        };
        BTFetch('/user/AddNotice','post',data)
            .then(res=>{
                if(res.code==1&&res.data!='null'){
                    message.success('推销资产成功')
                }else{
                    message.error('推销资产失败')
                }
            })
    }
    componentDidMount(){
        let param={
            userName:'btd121',
            random:Math.ceil(Math.random()*100),
            signature:'0xxxx'
        };
        BTFetch('/asset/query','post',param)
                    .then(res=>{
                        if(res.code==1){
                            if(res.data=='null'){
                                message.warning('暂无数据');
                                return;
                            };
                            console.log(JSON.parse(res.data))
                            this.setState({
                                exampledata:JSON.parse(res.data),
                            })
                        }else{
                            message.warning('获取文件资源库失败')
                            return;
                        }
                    })
                    .catch(error=>{
                        message.warning('获取文件资源库失败')
            })
    }
    download(href){
        console.log(href);
        let iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = href;
        document.body.appendChild(iframe);
    }
    render(){
        let data = this.props.location.state||[];
        let date=(new Date((data.expire_time)*1000)).toLocaleString()
        return(
            <div className="demandDetailBox">
                <BTAssetList exampledata={this.state.exampledata} ref={(ref)=>this.assetListModal = ref} handleFile={(fileInfo)=>this.handleFile(fileInfo)}/>

                <h2>数据详情</h2>
                <div className="mainData">
                    <h1>{data.requirement_name}</h1>
                    <p><span>资产类型:</span>{data.feature_tag}</p>
                    <p><span>期望价格:</span>{data.price}</p>
                    <p><span>下架时间:</span>{date}</p>
                </div>
                    <ul>
                        <li><Button onClick={()=>this.download(data.sample_path)} type="danger">下载样例</Button></li>
                        <li><Button type="primary" onClick={()=>this.commitAsset()}>提供资产</Button></li>
                    </ul>
                <div className="dataDescription">
                    <span>数据描述</span>
                    <TextArea disabled rows={4}>{data.description}</TextArea>
                </div>
            </div>
        )
    }
}
