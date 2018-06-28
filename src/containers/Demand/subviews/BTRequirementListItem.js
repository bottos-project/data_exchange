/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
import React,{PureComponent} from 'react'
import { hashHistory } from 'react-router'
import BTFetch from '../../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import { typeValueKeyMap } from '../../../utils/keyMaps'

import messages from '../../../locales/messages'
import {getAccount} from "../../../tools/localStore";
import TokenSymbol from '@/components/TokenSymbol'

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
                <TokenSymbol type={data.token_type} />
              </div>
              <span>
                <FormattedMessage {...DemandMessages.ExpireTime}/>
                {time}
              </span>
            </div>
        )
    }
}
