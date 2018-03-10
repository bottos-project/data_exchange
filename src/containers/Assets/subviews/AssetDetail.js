import React,{PureComponent} from 'react'
import { Carousel,Button,Tag } from 'antd';
import BTFetch from '../../../utils/BTFetch'
import {getBlockInfo,getDataInfo} from '../../../utils/BTCommonApi'
// 此处样式在Demand/subviews/styles.less中控制

export default class BTAssetDetail extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            data:this.props.location.query
        }
    }
    async buy(){
        //获取区块信息
        if(this.state.data.username == 'btd121'){
            alert('不允许购买自己的资产！！！')
            return;
        }
        // console.log(this.state.data)
        let block=(await getBlockInfo()).data;
        // console.log(this.state.data,block);
        //获取data信息
        let data={
            "code":"datadealmng",
            "action":"datapurchase",
            "args":{
                "data_deal_id":"dealidtest",
                "basic_info":{
                    "user_name":"12",
                    "session_id":"sessidtest",
                    "asset_id":this.state.data.asset_id,
                    "random_num":Math.ceil(Math.random()*100),
                    "signature":"0xxxxxxxx"
                }
            }
        };
        let getDataBin=(await getDataInfo(data)).data.bin;
        console.log(getDataBin)
        let param={
            "ref_block_num": block.ref_block_num,
            "ref_block_prefix": block.ref_block_prefix,
            "expiration": block.expiration,
            "scope": [
                "assetmng",
                '12',
                "datadealmng",
                this.state.data.username
            ],
            "read_scope": [],
            "messages": [{
                "code": "datadealmng",
                "type": "datapurchase",
                "authorization": [],
                "data": getDataBin
            }],
            "signatures": []
        };
        BTFetch('http://10.104.21.10:8080/v2/exchange/consumerBuy','post',param,{
            full_path:true
        }).then(res=>{
            console.log(res);
            if(res.code == 1){
                alert('ConsumerBuy Successful!');
            }else{
                alert('ConsumerBuy Failed!');
            }
        })
    }
    render(){
        let data=this.props.location.query;
        return(
            <div>
            <div className="detailContentStyle">
                <div style={{padding:20}}>
                    <p><span>资产ID:</span>{data.asset_id}</p>
                    <p><span style={{fontSize:15,fontWeight:'bold'}}>标题:</span>{data.asset_name}</p>
                    <p><span style={{fontSize:15,fontWeight:'bold'}}>资产类型:</span>{data.type}</p>
                    <p><span style={{fontSize:15,fontWeight:'bold'}}>期望价格:</span>{data.price}</p>
                    <p><span style={{fontSize:15,fontWeight:'bold'}}>下架时间:</span>{data.expire_time}</p>
                    <div>
                        <Tag color="cyan">{data.feature_tag}</Tag>
                        {/*<Tag color="cyan">实用</Tag>*/}
                        {/*<Tag color="cyan">有价值</Tag>*/}
                    </div>

                    <div className="detailOptions">
                        <ul>
                            <li><Button onClick={(e)=>this.buy(e)} type="primary" className="buyButton">购买</Button></li>
                            <li><Button type="primary"><a href={data.sample_path}>下载样例</a></Button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="detailDescribe">
                <p>{data.description}</p>
            </div>
            </div>
        )
    }
}