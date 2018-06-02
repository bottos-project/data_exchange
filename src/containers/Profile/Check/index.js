import React from 'react'
import { hashHistory } from 'react-router'
import { Button } from 'antd'

import { getDateAndTime } from '@/utils/dateTimeFormat'
import { getAccount } from "@/tools/localStore";
import { getSignaturedParam } from '@/utils/BTCommonApi'
import BTTable from '@/components/BTTable'

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
