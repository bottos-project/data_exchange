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

import BTFetch from "@/utils/BTFetch";
import { getDateAndTime } from '@/utils/dateTimeFormat'
import { getAccount } from "@/tools/localStore";
import { getSignaturedParam } from '@/utils/BTCommonApi'
import BTTable from '@/components/BTTable'

import messages from '@/locales/messages'
import {FormattedMessage} from 'react-intl'
const CheckMessages = messages.Check;
const PresaleMessages = messages.Presale;

function checkTheAsset(req_id) {
  BTFetch("/requirement/QueryById", "post", { req_id, sender: getAccount().username })
  .then(res => {
    if (!res || res.code != 1) {
      throw new Error('Failed To Get The Requirement Details')
    }
    hashHistory.push({
      pathname: '/demand/detail',
      state: res.data
    })
  })
  .catch(err => {
    window.message.error(window.localeInfo['Demand.FailedToGetTheRequirementDetails'])
    console.error('/requirement/QueryById err', err);
  })

}

const columns = [
  {
    title: <FormattedMessage {...CheckMessages.DataPresaleId}/>,
    dataIndex: 'data_req_name',
    render:(item)=> <span>{item}</span>
  },
  { title: <FormattedMessage {...PresaleMessages.Consumer}/>, dataIndex: 'consumer' },
  { title: <FormattedMessage {...CheckMessages.AssetID}/>, dataIndex: 'asset_name',
    render:(item)=> <span>{item}</span>
  },
  { title: <FormattedMessage {...CheckMessages.DataTime} />, dataIndex: 'time',
    render: getDateAndTime
  },
  // { title: <FormattedMessage {...CheckMessages.UserName}/>, dataIndex: 'username' },
  { title: <FormattedMessage {...CheckMessages.View} />, dataIndex:'data_req_id',
    render: (data_req_id) => <Button onClick={() => checkTheAsset(data_req_id)}>
      <FormattedMessage {...CheckMessages.View} />
    </Button>
  }
]

function PreSale(props) {
  return <BTTable
    columns={columns}
    rowKey='asset_id'
    url='/asset/queryMyPreSale'
    options={getSignaturedParam(getAccount())}
    catchError={(err) => message.error(window.localeInfo["Check.ThereIsNoDataForTheTimeBeing"])}
    {...props}
  />
}

export default PreSale;
