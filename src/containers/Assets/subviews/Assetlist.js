import React,{PureComponent} from 'react'
import {Link} from 'react-router'
import './styles.less'
import BTFetch from '../../../utils/BTFetch'
import {Icon,Button,message} from 'antd'
import {getBlockInfo, getDataInfo} from "../../../utils/BTCommonApi";
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from "../../../tools/localStore";

const AssetMessages = messages.Asset;
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
            username:'',
            token:''
        }
    }

    componentDidMount(){
      /* if(getAccount()){
           this.setState({
               username:getAccount().username,
               token:getAccount().token,
           })
       }*/
    }

    commitAsset(){
        this.assetListModal.setState({
            visible:true
        })
    };
    async buy(){
        if(this.state.data.username == this.state.username){
            message.warning(window.localeInfo["Asset.YouAreNotAllowedToBuyYourOwnAssets"])
            return;
        }
        //获取区块信息
        let _block=(await getBlockInfo());
        if(_block.code != 0){
            message.error(window.localeInfo["Asset.FailedToGetTheBlockMessages"])
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
            message.error(window.localeInfo["Asset.FailedToGetTheBlockMessages"])
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
                message.success(window.localeInfo["Asset.SuccessfulPurchase"])
            }else if(res.code == 4001){
                message.warning(window.localeInfo["Asset.InsufficientBalance"])
            }else if(res.code == 4002){
                message.warning(window.localeInfo["Asset.UnexpectedError"])
            }else{
                message.error(window.localeInfo["Asset.FailedPurchase"])
            }
        }).catch(error=>{

        })
    }
    async addShopCart(data){
        message.destroy();
        if(!getAccount()){
            message.warning(window.localeInfo["Asset.PleaseLogInFirst"])
            return;
        }
        let _block=(await getBlockInfo());
        if(_block.code!=0){
            message.error(window.localeInfo["Asset.FailedToGetTheBlockMessages"])
            return;
        }
        let block=_block.data;
        //获取生成data的参数
        let param={
            "code":"favoritemng",
            "action":"favoritepro",
            "args":{
                "user_name":getAccount().username,
                "session_id":getAccount().token,
                "op_type":"add",
                "goods_type":data.asset_type,
                "goods_id":data.asset_id,
                "signature":"signatest"
            }
        };

        let _getDataBin=(await getDataInfo(param));
        if(_getDataBin.code!=0){
            message.error(window.localeInfo["Asset.FailedToGetTheBlockMessages"])
            return;
        }
        let favorite={
            "ref_block_num": block.ref_block_num,
            "ref_block_prefix": block.ref_block_prefix,
            "expiration": block.expiration,
            "scope": [
                getAccount().username
            ],
            "read_scope": [],
            "messages": [{
            "code": "favoritemng",
            "type": "favoritepro",
            "authorization": [],
            "data": _getDataBin.data.bin
        }],
            "signatures": []
        };
        BTFetch('/user/FavoriteMng','post',favorite)
            .then(res=>{
                if(res.code==1){
                    message.success(window.localeInfo["Asset.DeleteCollect"])
                }else{
                    message.error(window.localeInfo["Asset.FailedCollect"])
                }
            })

    }
    render(){
        let data = this.state.data;
        let linkto = {
            pathname:'/assets/detail',
            query:data,
        };
        return (
            <div className="assetList">
                <div>
                    <div>
                        <div className="headAndShop">
                            <h4><Link to={linkto}>{data.asset_name.length<25?data.asset_name:data.asset_name.substring(0,25)+'...'}</Link></h4>
                            <Link onClick={()=>this.addShopCart(data)}><Icon type="star-o"/></Link>
                        </div>
                        <p>
                            <FormattedMessage {...AssetMessages.Publisher}/>
                            {data.username}
                        </p>
                        <p>{data.feature_tag}</p>
                        <div>
                            <FormattedMessage {...AssetMessages.ExpectedPrice}/>
                            <span>{data.price}</span>
                            <img src="./img/token.png" width='18' alt="" style={{paddingLeft:'4px'}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
