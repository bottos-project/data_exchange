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
