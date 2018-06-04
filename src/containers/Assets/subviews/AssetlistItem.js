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
import React, {Component} from 'react'
import { hashHistory } from 'react-router'
import BTFetch from '../../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import BTTags from '../../AssetAndRequirement/BTTags'
import {getAccount} from "../../../tools/localStore";
import { typeValueKeyMap } from '../../../utils/keyMaps'
import TokenPNG from '@/components/TokenPNG'

import messages from '../../../locales/messages'
const AssetMessages = messages.Asset;

class AssetlistItem extends Component {

    handleClick = () => {

      const username = getAccount() ? getAccount().username : ''
      const { asset_id } = this.props.list

      BTFetch('/asset/QueryAssetByID', 'post', {
        asset_id,
        sender: username
      })
      .then(res => {
        if (!res || res.code != 1) {
          throw new Error('Failed To Get The Asset Details')
        }
        // console.log('res.data', res.data);
        hashHistory.push({
          pathname: '/assets/detail',
          state: res.data
        })
      })
      .catch(err => {
        // window.message.error(window.localeInfo['Demand.FailedToGetTheRequirementDetails'])
        console.error('/requirement/QueryById err', err);
      })

    }

    render() {
        let data = this.props.list;
        const asset_type = data.asset_type || 0
        const typeValue = typeValueKeyMap[asset_type]
        let className = 'assetAndReqListItem assetListItem ' + typeValue
        let tagsArr = data.feature_tag.split('-')

        return (
            <div className={className} onClick={this.handleClick}>
                <h4 className='txt_cut'>
                  {data.asset_name}
                </h4>
                <div className='bt-type-svg-box'>
                  <i className={"iconfont icon-" + typeValue} />
                </div>
                <div>
                  <FormattedMessage {...AssetMessages.Publisher}/>
                  {data.username}
                </div>
                <div>
                  <FormattedMessage {...AssetMessages.ExpectedPrice}/>
                  <span>{data.price/Math.pow(10, 8)}</span>
                  <TokenPNG />
                </div>
                <BTTags tags={tagsArr} />
            </div>
        )
    }
}

export default AssetlistItem
