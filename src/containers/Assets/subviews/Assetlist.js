import React, {Component} from 'react'
import { Link, hashHistory } from 'react-router'
import querystring from 'querystring'
import './styles.less'
import BTFetch from '../../../utils/BTFetch'
import {Icon,Button,message} from 'antd'
import {getBlockInfo, getDataInfo} from "../../../utils/BTCommonApi";
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from "../../../tools/localStore";
import uuid from 'node-uuid'
const AssetMessages = messages.Asset;
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

export default class Assetlist extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: this.props.list,
        }

        this.addShopCart = this.addShopCart.bind(this)
    }

    commitAsset() {
        this.assetListModal.setState({
            visible:true
        })
    }

    // NOTE: 这段代码是购买资产的逻辑，现在这个功能从这个页面上去掉了
    // 如果 3.0 版本不需要这个功能，就可以删掉了
    // async buy() {
    //     if(this.state.data.username == this.state.username){
    //         message.warning(window.localeInfo["Asset.YouAreNotAllowedToBuyYourOwnAssets"])
    //         return;
    //     }
    //     //获取区块信息
    //     let _block=(await getBlockInfo());
    //     if(_block.code != 0){
    //         message.error(window.localeInfo["Asset.FailedToGetTheBlockMessages"])
    //         return;
    //     }
    //     let block=_block.data;
    //     //获取data信息
    //      let data={
    //          "code":"datadealmng",
    //          "action":"datapurchase",
    //          "args":{
    //              "data_deal_id":uuid.v1(),
    //              "basic_info":{
    //                  "user_name":"btd121",
    //                  "session_id":"sessidtest",
    //                  "asset_id":this.state.data.asset_id,
    //                  "random_num":Math.ceil(Math.random()*100),
    //                  "signature":"0xxxxxxxx"
    //              }
    //          }
    //      };
    //     let _getDataBin=(await getDataInfo(data));
    //     if(_getDataBin.code != 0){
    //         message.error(window.localeInfo["Asset.FailedToGetTheBlockMessages"])
    //         return;
    //     }
    //     //数组排序
    //     let array=[
    //         "assetmng",
    //         this.state.username,
    //         this.state.data.username,
    //         "datadealmng",
    //         "datafilemng"
    //     ].sort();
    //
    //     let param={
    //       "ref_block_num": block.ref_block_num,
    //       "ref_block_prefix": block.ref_block_prefix,
    //       "expiration": block.expiration,
    //       "scope": array,
    //       "read_scope": [],
    //       "messages": [{
    //         "code": "datadealmng",
    //         "type": "datapurchase",
    //         "authorization": [],
    //         "data": _getDataBin.data.bin
    //       }],
    //       "signatures": []
    //     }
    //
    //     BTFetch('/exchange/consumerBuy','post',param)
    //         .then(res=>{
    //         console.log(res);
    //         if(res.code == 1){
    //             message.success(window.localeInfo["Asset.SuccessfulPurchase"])
    //         }else if(res.code == 4001){
    //             message.warning(window.localeInfo["Asset.InsufficientBalance"])
    //         }else if(res.code == 4002){
    //             message.warning(window.localeInfo["Asset.UnexpectedError"])
    //         }else{
    //             message.error(window.localeInfo["Asset.FailedPurchase"])
    //         }
    //     }).catch(error=>{
    //
    //     })
    // }

    async addShopCart(e) {
      e.preventDefault()
      e.stopPropagation()
      let data = this.state.data;
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
        }

        BTFetch('/user/FavoriteMng','post',favorite)
          .then(res=>{
              if(res.code==1){
                  message.success(window.localeInfo["Asset.SuccessfulCollect"])
              }else{
                  message.error(window.localeInfo["Asset.FailedCollect"])
              }
          })

    }

    handleClick = () => {
      // console.log('hashHistory', hashHistory);
      const q = '?' + querystring.stringify(this.state.data)
      hashHistory.push('/assets/detail' + q)
    }

    render() {
        let data = this.state.data;
        return (
            <div className="assetList" onClick={this.handleClick}>
                <div className="headAndShop">
                    <h4 className='one_txt_cut'>
                        {data.asset_name}
                    </h4>
                  <a><Icon type="star-o" onClick={this.addShopCart} /></a>
                </div>
                <p>
                    <FormattedMessage {...AssetMessages.Publisher}/>
                    {data.username}
                </p>
                <p>{data.feature_tag}</p>
                <div>
                    <FormattedMessage {...AssetMessages.ExpectedPrice}/>
                    <span>{data.price/Math.pow(10,10)}</span>
                    <img src="./img/token.png" width='18' alt="" style={{paddingLeft:'4px'}}/>
                </div>
            </div>
        )
    }
}
