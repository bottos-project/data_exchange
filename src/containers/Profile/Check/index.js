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
import React from 'react'
import { hashHistory } from 'react-router'
import { Button } from 'antd'

import { getDateAndTime } from '@/utils/dateTimeFormat'
import { getAccount } from "@/tools/localStore";
import { getSignaturedParam } from '@/utils/BTCommonApi'
import BTTable from '@/components/BTTable'

import BTFetch from "@/utils/BTFetch";

import messages from '@/locales/messages'
import {FormattedMessage} from 'react-intl'
const CheckMessages = messages.Check;

function lookFor(asset_id) {
  BTFetch("/asset/queryAssetByID", "post", {
    ...getSignaturedParam(getAccount()),
    asset_id
  }).then(res => {
    if (!res) return ;
    if (res.code == 1 && res.data != null) {
      hashHistory.push({
        pathname: '/assets/detail',
        state: res.data
      })
    } else {
      window.message.error(window.localeInfo["Check.QueryFailure"])
    }
  })
  .catch(error=>{
      window.message.error(window.localeInfo["Check.QueryFailure"])
  })
}

const columns = [
  { title: <FormattedMessage {...CheckMessages.AssetID}/>, dataIndex: 'asset_name',
    render:(item) => <span>{item.length<25?item:item.substring(0,25)+'...'}</span>
  },
  { title: <FormattedMessage {...CheckMessages.Consumer}/>, dataIndex: 'consumer' },
  { title: <FormattedMessage {...CheckMessages.DataPresaleId}/>, dataIndex: 'data_req_name',
    render:(item) => <span>{item.length<25?item:item.substring(0,25)+'...'}</span>
  },
  { title: <FormattedMessage {...CheckMessages.DataTime}/>, dataIndex: 'time',
    render: getDateAndTime
  },
  // { title: <FormattedMessage {...CheckMessages.UserName}/>, dataIndex: 'username', key:'user_name' },
  { title: <FormattedMessage {...CheckMessages.View}/>, dataIndex:'asset_id',
    render:(asset_id) => <Button onClick={()=> lookFor(asset_id)}>
      <FormattedMessage {...CheckMessages.View}/>
    </Button>
  }
]

function BTCheck(props) {
  return <BTTable
    columns={columns}
    rowKey='asset_id'
    url='/asset/queryMyNotice'
    options={getSignaturedParam(getAccount())}
    catchError={(err) => message.error(window.localeInfo["Check.ThereIsNoDataForTheTimeBeing"])}
    {...props}
  />
}

export default BTCheck
