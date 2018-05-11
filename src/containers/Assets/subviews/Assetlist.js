import React, {Component} from 'react'
import { Link, hashHistory } from 'react-router'
import querystring from 'querystring'
import './styles.less'
import BTFetch from '../../../utils/BTFetch'
import { Spin, Icon, Button, message } from 'antd'
import {getBlockInfo, getDataInfo} from "../../../utils/BTCommonApi";
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from "../../../tools/localStore";
import collectionState, { getTimeSecond } from "@/tools/sessionStorage";
import uuid from 'node-uuid'
const AssetMessages = messages.Asset;


const lockTimeSecond = 20

const typeMap = {
  1: 'voice',
  2: 'video',
  3: 'nature',
  4: 'picture',
  5: 'text'
}

class Assetlist extends Component {
    constructor(props){
        super(props)

        let spin = false
        let cs = collectionState.get('asset', props.list.asset_id)
        if (typeof cs == 'number' && getTimeSecond() - cs < lockTimeSecond) {
          spin = true
        }

        this.state = { spin }

        this.addShopCart = this.addShopCart.bind(this)
    }

    // NOTE: 这段代码是购买资产的逻辑，现在这个功能从这个页面上去掉了
    // 如果 3.0 版本不需要这个功能，就可以删掉了
    // async buy() {
    //     if(this.props.list.username == this.state.username){
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
    //                  "asset_id":this.props.list.asset_id,
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
    //         this.props.list.username,
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
      let data = this.props.list;

      message.destroy();
      if(!getAccount()){
          message.warning(window.localeInfo["Asset.PleaseLogInFirst"])
          return;
      }
      let _block = await getBlockInfo()
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
      let favorite = {
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

      this.lockCollect(20)

      BTFetch('/user/FavoriteMng','post',favorite).then(res=>{
          if(res.code==1){
              message.success(window.localeInfo["Asset.SuccessfulCollect"])
          }else{
              message.error(window.localeInfo["Asset.FailedCollect"])
          }
      })

    }

    lockCollect(t) {
      // 锁定收藏按钮，不让用户连续点击
      this.setState({ spin: true });
      // 设置
      collectionState.set('asset', this.props.list.asset_id)

      this.timeKey = setTimeout(() => {
        this.setState({ spin: false });
        collectionState.delete('asset', this.props.list.asset_id)
      }, t * 1000);

    }

    handleClick = () => {
      // console.log('hashHistory', hashHistory);
      const q = '?' + querystring.stringify(this.props.list)
      hashHistory.push('/assets/detail' + q)
    }

    componentWillUnmount() {
      if (this.timeKey) {
        clearTimeout(this.timeKey)
      }
    }

    render() {
        let data = this.props.list;
        const asset_type = data.asset_type
        if (asset_type.length == 8) {
          var type = asset_type[5]
        }
        let className = 'assetList ' + typeMap[type]
        return (
            <div className={className} onClick={this.handleClick}>
                <div className="headAndShop">
                  <h4 className='txt_cut'>
                    {data.asset_name}
                  </h4>
                  <a>{
                    this.state.spin ?
                    <Spin size="small" />
                    :
                    <Icon type="star-o" onClick={this.addShopCart} />
                  }</a>
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

export default Assetlist
