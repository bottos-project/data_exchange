import React,{PureComponent} from 'react'
import {Link} from 'react-router'
import './styles.less'
import BTFetch from '../../../utils/BTFetch'
import {Icon,Button,message} from 'antd'
import {getBlockInfo, getDataInfo} from "../../../utils/BTCommonApi";
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
export default class Assetlist extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            data:this.props.list,
        }
    }
    commitAsset(){
        this.assetListModal.setState({
            visible:true
        })
    };
    async buy(){
        //获取区块信息
        let block=(await getBlockInfo()).data;
        console.log(this.state.data,block);
        //获取data信息
        let data={
            "code":"datadealmng",
            "action":"datapurchase",
            "args":{
                "data_deal_id":"dealidtest",
                "basic_info":{
                    "user_name":"btd121",
                    "session_id":"sessidtest",
                    "asset_id":this.state.data.asset_id,
                    "random_num":Math.ceil(Math.random()*100),
                    "signature":"0xxxxxxxx"
                }
            }
        };
        let dataInfo = await getDataInfo(data);
        if(dataInfo == undefined || dataInfo.code==500) {
            message.error('购买失败')
            return
        };
        let getDataBin = dataInfo.data.bin;
        let param={
            "ref_block_num": block.ref_block_num,
            "ref_block_prefix": block.ref_block_prefix,
            "expiration": block.expiration,
            "scope": ["assetmng",
                "btd121",
                "datadealmng",
                "saleertest"],
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
        let data = this.state.data;
        console.log(data);
        let linkto = {
            pathname:'/assets/detail',
            query:data,
        };
        return <div className='list'>
            {/*<BTAssetList ref={(ref)=>this.assetListModal = ref}/>*/}
            <div className="img">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt="logo" width="250"/>
                <p></p>
            </div>
            <div className="main">
                <div className='title'>
                    <h4><Link to={linkto}>{data.asset_name}</Link></h4>
                    <p>发布人：{data.username}</p>
                </div>
                <div className="tag">
                    <span>{data.feature_tag}</span>
                    {/*<span>数据挖掘</span>*/}
                    {/*<span>表情</span>*/}
                    {/*<span>微笑</span>*/}
                </div>
                <div className="font">
                    {data.description}

                </div>
                {/*<ul className="ant-list-item-action infomation" style={{marginLeft:0}}>*/}
                {/*<li><IconText type="star-o" text="156" /></li>*/}
                {/*<li><IconText type="like-o" text="156" /></li>*/}
                {/*<li><IconText type="message" text="2" /></li>*/}
                {/*</ul>*/}
            </div>
            <div className="down">
                <em></em>
                <div className="icon">
                    <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" width='32' alt=""/>
                    <span>{data.price}</span>
                </div>
                <div className='bottom'>
                    {/* <span onClick={(e)=>this.buy(e)}>购买</span> */}
                    <Button type="primary" onClick={(e)=>{this.buy(e)}}>购买</Button>
                    <Link to="/profile/shopcart"><Icon type="shopping-cart" style={{fontSize:30,color:'black'}}/></Link>
                </div>
                {/*<p onClick={()=>this.commitAsset()}>提交资产</p>*/}
            </div>
        </div>
    }
}
