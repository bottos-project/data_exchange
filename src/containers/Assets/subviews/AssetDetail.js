import React,{PureComponent} from 'react'
import { Carousel,Button,Tag, } from 'antd';
import BTFetch from '../../../utils/BTFetch'
import {getBlockInfo,getDataInfo} from '../../../utils/BTCommonApi'
import {Input} from "antd/lib/index";
import {message} from "antd/lib/index";
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from '../../../tools/localStore'
const AssetMessages = messages.Asset;
// 此处样式在Demand/subviews/styles.less中控制
const { TextArea } = Input;

// const username=JSON.parse(window.localStorage.account_info).username||'';
// const token=JSON.parse(window.localStorage.account_info).token||'';
export default class BTAssetDetail extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            data:this.props.location.query||[],
            username:'',
            token:''
        }
    }

    componentDidMount(){
        let account_info = getAccount()
        if(account_info){
            this.setState({
                username:account_info.username,
                token:account_info.token
            })
        }
    }


    async buy(){
        if(this.state.data.username == this.state.username){
            message.warn('不允许购买自己的资产！！！')
            return;
        }
        //获取区块信息
        let _block=(await getBlockInfo());
        if(_block.code != 0){
            message.error('获取区块信息失败');
            return;
        }
        let block=_block.data;
        //获取data信息
        let data={
            "code":"datadealmng",
            "action":"datapurchase",
            "args":{
                "data_deal_id":window.uuid,
                "basic_info":{
                    "user_name":this.state.username,
                    "session_id":this.state.token,
                    "asset_id":this.state.data.asset_id,
                    "random_num":Math.ceil(Math.random()*100),
                    "signature":"0xxxxxxxx"
                }
            }
        };
        /*let getDataBin=(await getDataInfo(data)).data.bin;
        console.log(getDataBin)*/
        let _getDataBin=(await getDataInfo(data));
        if(_getDataBin.code!=0){
            message.error('获取区块数据失败');
            return;
        }
        //数组排序
        let array=[
            "assetmng",
            this.state.username,
            this.state.data.username,
            "datadealmng",
            "datafilemng"
        ].sort();
        console.log(array);
        let param={
            "ref_block_num": block.ref_block_num,
            "ref_block_prefix": block.ref_block_prefix,
            "expiration": block.expiration,
            "scope": array,
            "read_scope": [],
            "messages": [{
                "code": "datadealmng",
                "type": "datapurchase",
                "authorization": [],
                "data": _getDataBin.data.bin
            }],
            "signatures": []
        };
        BTFetch('/exchange/consumerBuy','post',param)
            .then(res=>{
            console.log(res);
            if(res.code == 1){
                message.success('购买成功')
            }else{
                message.error('购买失败')
            }
        })
    }
    download(index){
        let iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = index;
        document.body.appendChild(iframe);
    }
    render(){
        let data=this.props.location.query;
        console.log(data);
        return(
            <div className="assetDetailBox">
                <h2>
                    <FormattedMessage {...AssetMessages.DataDetails}/>
                </h2>
                <div className="mainData">
                    <h1>{data.asset_name}</h1>
                    <p>
                        <span>
                            <FormattedMessage {...AssetMessages.AssetID}/>
                        </span>
                        {data.asset_id}
                        </p>
                    <p>
                        <span>
                            <FormattedMessage {...AssetMessages.AssetType}/>
                        </span>
                        {data.type}
                    </p>
                    <p>
                        <span>
                            <FormattedMessage {...AssetMessages.ExpectedPrice}/>
                        </span>
                        {data.price}
                    </p>
                    <p>
                        <span>
                            <FormattedMessage {...AssetMessages.ExpireTime}/>
                        </span>
                        {data.expire_time}
                        </p>
                    <Tag>{data.feature_tag}</Tag>
                </div>
                <ul>
                    <li>
                        <Button onClick={(e)=>this.buy(e)} type="primary" className="buyButton">
                            <FormattedMessage {...AssetMessages.BuyAssets}/>
                        </Button>
                    </li>
                    <li>
                        <Button onClick={(e)=>this.download(data.sample_path)} type="primary">
                                <FormattedMessage {...AssetMessages.DownLoadTheSample}/>
                        </Button>
                    </li>
                </ul>
                <div className="dataDescription">
                    <span>
                        <FormattedMessage {...AssetMessages.DataDescription}/>
                    </span>
                    <TextArea disabled rows={4}>{data.description}</TextArea>
                </div>
            </div>
        )
    }
}
