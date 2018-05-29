import React,{PureComponent} from 'react'
import { hashHistory } from 'react-router'
import querystring from 'querystring'

import { Icon } from 'antd'
import BTFetch from '../../../utils/BTFetch'
import {getBlockInfo,getDataInfo} from '../../../utils/BTCommonApi'
import './styles.less'
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

      const username = getAccount() ? getAccount().username : ''
      const { linkto, requirement_id } = this.props

      BTFetch('/requirement/QueryById', 'post', {
        req_id: requirement_id,
        sender: username
      })
      .then(res => {
        if (!res || res.code != 1) {
          throw new Error('Failed To Get The Requirement Details')
        }
        const q = '?' + querystring.stringify(res.data)
        hashHistory.push(linkto + q)
      })
      .catch(err => {
        window.message.error(window.localeInfo['Demand.FailedToGetTheRequirementDetails'])
        console.error('/requirement/QueryById err', err);
      })

    }

    render(){
        let data = this.props;
        let time=new Date((data.expire_time)*1000).toLocaleDateString({...DemandMessages.En});
        return (
            <div className="assetList" onClick={this.handleClick}>
              <h4 className='txt_cut'>
                {data.requirement_name}
              </h4>
              <p>
                <FormattedMessage {...DemandMessages.Publisher}/>
                {data.username}
              </p>
              <div>
                <FormattedMessage {...DemandMessages.ExpectedPrice}/>
                <span>{data.price/Math.pow(10, 8)}</span>
                <img src="./img/token.png" width='18' style={{paddingLeft:'4px'}} alt=""/>
              </div>
              <span>
                <FormattedMessage {...DemandMessages.ExpireTime}/>
                {time}
              </span>
            </div>
        )
    }
}
