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
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Button } from 'antd'

import { getDateAndTime } from '@/utils/dateTimeFormat'
import { getAccount } from "@/tools/localStore";
import { getSignaturedParam } from '@/utils/BTCommonApi'
import BTTable from '@/components/BTTable'
import { readMessage } from '@/redux/actions/HeaderAction'

import BTFetch from "@/utils/BTFetch";

import messages from '@/locales/messages'
import {FormattedMessage} from 'react-intl'
const CheckMessages = messages.Check;



function BTCheck(props) {
  function lookFor(asset_id, notice_id) {
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

    // console.log('props', props);
    BTFetch("/asset/ModifyMyNoticeStatus", "post", {
      ...getSignaturedParam(getAccount()),
      noticeId: notice_id
    }).then(res => {
      if (res.code == 1) {
        props.readMessage()
      }
    }).catch(err => console.error(err))
  }

  const columns = [
    { title: <FormattedMessage {...CheckMessages.AssetID}/>, dataIndex: 'asset_name',
      render:(item) => <span>{item.length<25?item:item.substring(0,25)+'...'}</span>
    },
    { title: <FormattedMessage {...CheckMessages.Consumer}/>, dataIndex: 'username' },
    { title: <FormattedMessage {...CheckMessages.DataPromoteId}/>, dataIndex: 'data_req_name',
      render:(item) => <span>{item.length<25?item:item.substring(0,25)+'...'}</span>
    },
    { title: <FormattedMessage {...CheckMessages.DataTime}/>, dataIndex: 'time',
      render: getDateAndTime
    },
    // { title: <FormattedMessage {...CheckMessages.UserName}/>, dataIndex: 'username', key:'user_name' },
    { title: <FormattedMessage {...CheckMessages.View}/>, dataIndex:'asset_id',
      render: (asset_id, record) => {
        let style = record.isRead == 0 ? {fontWeight: 700} : null
        return <Button style={style} onClick={()=> lookFor(asset_id, record.notice_id)}>
          <FormattedMessage {...CheckMessages.View} />
        </Button>
      }
    }
  ]

  return <BTTable
    columns={columns}
    rowKey='asset_id'
    url='/asset/queryMyNotice'
    options={getSignaturedParam(getAccount())}
    catchError={(err) => window.message.warn(window.localeInfo["Check.ThereIsNoDataForTheTimeBeing"])}
    {...props}
  />
}

const mapDispatchToProps = (dispatch) => {
  return {
    readMessage() {
      dispatch( readMessage() )
    }
  }
}

export default connect(null, mapDispatchToProps)(BTCheck)
