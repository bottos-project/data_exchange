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
import { Icon } from 'antd';
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";
import { getDateAndTime } from "@/utils/dateTimeFormat";
import { getSignaturedParam } from '@/utils/BTCommonApi'
import { BTDownloadFile } from '@/utils/BTDownloadFile'
import { selectType } from '@/utils/keyMaps'
import TokenSymbol from '@/components/TokenSymbol'

import BTTable from '@/components/BTTable'

const PersonalAssetMessages = messages.PersonalAsset;

const columns = [
  { title: <FormattedMessage {...PersonalAssetMessages.AssetName}/>, dataIndex: 'asset_name',
    render: (item) => <span>{item}</span>
  },
  { title: <FormattedMessage {...PersonalAssetMessages.AssetTypePrice}/>, dataIndex: 'price',
    render: (price, record) => (
      <div>
        <TokenSymbol type={record.token_type} />
        <span>{price/Math.pow(10, 8)}</span>
      </div>
    )
  },
  {
    title: <FormattedMessage {...PersonalAssetMessages.AssetType}/>,
    dataIndex: 'asset_type',
    render: asset_type => selectType[asset_type]
  },
  { title: <FormattedMessage {...PersonalAssetMessages.purchaseTime} />, dataIndex: 'timestamp',
    render: getDateAndTime
  },
  {
    title: <FormattedMessage {...PersonalAssetMessages.Download} />, dataIndex: 'storage_hash',
    render: (storage_hash) => (
        <a onClick={() => BTDownloadFile(storage_hash, getAccount().username) }>
            <Icon type="download" />
        </a>
    )
  }
];

function BTHaveBought(props) {
  return <BTTable
    columns={columns}
    rowKey='asset_id'
    url='/user/QueryMyBuy'
    options={getSignaturedParam(getAccount())}
    catchError={(err) => message.error(window.localeInfo["PersonalAsset.FailedToGetTheHaveBoughtAsset"])}
    {...props}
  />
}

export default BTHaveBought
