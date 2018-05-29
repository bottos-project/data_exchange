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
const AssetMessages = messages.Asset;


const typeMap = {
  11: 'text',
  12: 'picture',
  13: 'voice',
  14: 'video',
}

class Assetlist extends Component {
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
    //         window.message.error(window.localeInfo["Asset.FailedToGetTheBlockMessages"])
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
    //         window.message.error(window.localeInfo["Asset.FailedToGetTheBlockMessages"])
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
    //             window.message.success(window.localeInfo["Asset.SuccessfulPurchase"])
    //         }else if(res.code == 4001){
    //             message.warning(window.localeInfo["Asset.InsufficientBalance"])
    //         }else if(res.code == 4002){
    //             message.warning(window.localeInfo["Asset.UnexpectedError"])
    //         }else{
    //             window.message.error(window.localeInfo["Asset.FailedPurchase"])
    //         }
    //     }).catch(error=>{
    //
    //     })
    // }

    handleClick = () => {
      // console.log('hashHistory', hashHistory);
      const q = '?' + querystring.stringify(this.props.list)
      hashHistory.push('/assets/detail' + q)
    }

    render() {
        let data = this.props.list;
        const asset_type = data.asset_type || 0
        let className = 'assetList ' + typeMap[asset_type]
        return (
            <div className={className} onClick={this.handleClick}>
                <h4 className='txt_cut'>
                  {data.asset_name}
                </h4>
                <p>
                  <FormattedMessage {...AssetMessages.Publisher}/>
                  {data.username}
                </p>
                <p>{data.feature_tag}</p>
                <div>
                  <FormattedMessage {...AssetMessages.ExpectedPrice}/>
                  <span>{data.price/Math.pow(10, 8)}</span>
                  <img src="./img/token.png" width='18' alt="" style={{paddingLeft:'4px'}}/>
                </div>
            </div>
        )
    }
}

export default Assetlist
