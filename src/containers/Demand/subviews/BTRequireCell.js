import React,{PureComponent} from 'react'
import { hashHistory } from 'react-router'
import querystring from 'querystring'

import {message, Icon} from 'antd'
import BTFetch from '../../../utils/BTFetch'
import {getBlockInfo,getDataInfo} from '../../../utils/BTCommonApi'
import './styles.less'
import BTFavoriteStar from '@/components/BTFavoriteStar'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from "../../../tools/localStore";
import collectionState, { getTimeSecond } from "@/tools/sessionStorage";
import uuid from 'node-uuid'
const DemandMessages = messages.Demand;


const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
export default class BTRequireCell extends PureComponent{
  constructor(props){
      super(props)

      let spin = false
      let cs = collectionState.get('require', props.requirement_id)
      if (typeof cs == 'number' && getTimeSecond() - cs < lockTimeSecond) {
        spin = true
      }

      this.state = { spin }

      this.addShopCart = this.addShopCart.bind(this)
  }

    handleClick = () => {
      // console.log('hashHistory', hashHistory);
      const { linkto, ...queryObject } = this.props
      const q = '?' + querystring.stringify(queryObject)
      hashHistory.push(linkto + q)
    }

    async addShopCart(e) {
      e.preventDefault()
      e.stopPropagation()

      message.destroy();
      if(!getAccount()){
          message.warning(window.localeInfo["Asset.PleaseLogInFirst"])
          return;
      }
      //获取生成data的参数
      let data = this.props;
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
      collectionState.set('asset', this.props.asset_id)

      this.timeKey = setTimeout(() => {
        this.setState({ spin: false });
        collectionState.delete('asset', this.props.asset_id)
      }, t * 1000);

    }

    render(){
        let data = this.props;
        let linkto = this.props.linkto || '/';
        let path = {
            pathname:linkto,
            state:data
        }
        let time=new Date((data.expire_time)*1000).toLocaleDateString({...DemandMessages.En});
        return (
            <div className="assetList" onClick={this.handleClick}>
              <div className="headAndShop">
                <h4 className='txt_cut'>
                  {data.requirement_name}
                </h4>
                <BTFavoriteStar type='asset' id={data.requirement_id} />
              </div>
              <p>
                <FormattedMessage {...DemandMessages.Publisher}/>
                {data.username}
              </p>
              <div>
                <FormattedMessage {...DemandMessages.ExpectedPrice}/>
                <span>{data.price/Math.pow(10,10)}</span>
                <img src="./img/token.png" width='18' style={{paddingLeft:'4px'}} alt=""/>
              </div>
              <span>
                <FormattedMessage {...DemandMessages.ExpireTime}/>
                {/*{data.expire_time}*/}
                {time}
              </span>
            </div>
        )
    }
}
