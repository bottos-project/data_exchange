import React,{PureComponent} from 'react'
import { hashHistory } from 'react-router'
import BTFetch from '../../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import { typeValueKeyMap } from '../../../utils/keyMaps'

import messages from '../../../locales/messages'
import {getAccount} from "../../../tools/localStore";
const DemandMessages = messages.Demand;

export default class BTRequirementListItem extends PureComponent{

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
        // console.log('res.data', res.data);
        hashHistory.push({
          pathname: linkto,
          state: res.data
        })
      })
      .catch(err => {
        window.message.error(window.localeInfo['Demand.FailedToGetTheRequirementDetails'])
        console.error('/requirement/QueryById err', err);
      })

    }

    render(){
        let data = this.props;
        let time=new Date((data.expire_time)*1000).toLocaleDateString({...DemandMessages.En});
        const req_type = data.req_type || 0
        const typeValue = typeValueKeyMap[req_type]
        let className = 'assetAndReqListItem requirementListItem ' + typeValue

        return (
            <div className={className} onClick={this.handleClick}>
              <h4 className='txt_cut'>
                {data.requirement_name}
              </h4>
              <div className='bt-type-svg-box'>
                <i className={"iconfont icon-" + typeValue} />
              </div>
              <div>
                <FormattedMessage {...DemandMessages.Publisher}/>
                {data.username}
              </div>
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
