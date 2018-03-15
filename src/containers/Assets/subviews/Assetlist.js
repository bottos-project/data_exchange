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
        if(this.state.data.username == 'btd121'){
            message.warning('不允许购买自己的资产！！！');
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
        let _getDataBin=(await getDataInfo(data));
        if(_getDataBin.code != 0){
            message.error('获取区块数据失败');
            return;
        }
        //数组排序
        let array=[
            "assetmng",
            "btd121",
            this.state.data.username,
            "datadealmng",
            "datafilemng"
        ].sort();
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
        BTFetch('/exchange/consumerBuy','post',param,{
            full_path:false,
            service:'service'
        }).then(res=>{
            console.log(res);
            if(res.code == 1){
                message.success('购买成功')
            }else{
                message.error('购买失败')
            }
        })
    }
    async addShopCart(data){
        console.log(data)
        let _block=(await getBlockInfo());
        if(_block.code!=0){
            message.error('获取区块信息失败');
            return;
        }
        let block=_block.data;
        //获取生成data的参数
        let param={
            "code":"favoritemng",
            "action":"favoritepro",
            "args":{
                "user_name":"btd121",
                "session_id":"idtest",
                "op_type":"add",
                "goods_type":"typetest",
                "goods_id":data.asset_id,
                "signature":"signatest"
            }
        };

        let _getDataBin=(await getDataInfo(param));
        if(_getDataBin.code!=0){
            message.error('获取区块数据失败');
            return;
        }
        let favorite={
            "ref_block_num": block.ref_block_num,
            "ref_block_prefix": block.ref_block_prefix,
            "expiration": block.expiration,
            "scope": [
                "btd121"],
            "read_scope": [],
            "messages": [{
            "code": "favoritemng",
            "type": "favoritepro",
            "authorization": [],
            "data": _getDataBin.data.bin
        }],
            "signatures": []
        };
        BTFetch('/user/FavoriteMng','post',favorite,{full_path:false,service:'service'})
            .then(res=>{
                // console.log(res)
                if(res.code==1){
                    message.success('加入购物车成功')
                }else{
                    message.error('加入购物车失败')
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
        return (
            <div className="assetList">
                <div>
                    <div>
                        <div className="headAndShop">
                            <h4><Link to={linkto}>{data.asset_name}</Link></h4>
                            <Link onClick={()=>this.addShopCart(data)}><Icon type="shopping-cart"/></Link>
                        </div>
                        <p>发布人：{data.username}</p>
                        <p>{data.feature_tag}</p>
                        <div>
                            <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" width='12' alt=""/>
                            <span>{data.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
