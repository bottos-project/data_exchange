import React,{PureComponent} from 'react'
import BTAssetList from './BTAssetList'
import {Link} from 'react-router'
import {message} from 'antd'
import BTFetch from '../../../utils/BTFetch'
import {getBlockInfo,getDataInfo} from '../../../utils/BTCommonApi'
import './styles.less'

import {Icon} from 'antd'
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
export default class BTRequireCell extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            exampledata:[],
        }
    }
    commitAsset(){
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
        this.assetListModal.setState({
            visible:true
        });

    }

   async handleFile(fileInfo){
        console.log({
            fileInfo
        });
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
                    "user_name":"btd123",
                    "session_id":"sessionidtest",
                    "asset_id":fileInfo.value,
                    "data_req_id":this.props.requirement_id,
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
    render(){
        let data = this.props;
        let linkto = this.props.linkto || '/'
        let path = {
            pathname:linkto,
            state:data
        }
        return (
                <div className="assetList">
                    <BTAssetList exampledata={this.state.exampledata} ref={(ref)=>this.assetListModal = ref} handleFile={(fileInfo)=>this.handleFile(fileInfo)}/>
                    <div>
                        <h4 className="headAndShop"><Link to={path}>{data.requirement_name}</Link></h4>
                        <p>发布人：{data.username}</p>
                        <span>有效时间：{data.expire_time}</span>
                        <div>
                            <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" width='12' alt=""/>
                            <span>{data.price}</span>
                        </div>
                    </div>
                </div>
        )
    }
}