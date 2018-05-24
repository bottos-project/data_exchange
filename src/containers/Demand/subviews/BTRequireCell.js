import React,{PureComponent} from 'react'
import { hashHistory } from 'react-router'
import querystring from 'querystring'

import { Icon } from 'antd'
import BTFetch from '../../../utils/BTFetch'
import {getBlockInfo,getDataInfo} from '../../../utils/BTCommonApi'
import './styles.less'
import BTFavoriteStar from '@/components/BTFavoriteStar'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from "../../../tools/localStore";
import collectionState, { getTimeSecond } from "@/tools/sessionStorage";
const DemandMessages = messages.Demand;


const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
export default class BTRequireCell extends PureComponent{

    handleClick = () => {
      // console.log('hashHistory', hashHistory);
      const { linkto, ...queryObject } = this.props
      const q = '?' + querystring.stringify(queryObject)
      hashHistory.push(linkto + q)
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
                <BTFavoriteStar type='requirement' id={data.requirement_id} />
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
