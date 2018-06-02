import React from 'react'
import { Icon } from 'antd';
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";
import { getDateAndTime } from "@/utils/dateTimeFormat";
import { getSignaturedParam } from '@/utils/BTCommonApi'
import { BTDownloadFile } from '@/utils/BTDownloadFile'
import { selectType } from '@/utils/keyMaps'
import TokenPNG from '@/components/TokenPNG'

import BTTable from '@/components/BTTable'

const PersonalAssetMessages = messages.PersonalAsset;

const columns = [
  { title: <FormattedMessage {...PersonalAssetMessages.AssetName}/>, dataIndex: 'asset_name',
    render: (item) => <span>{item}</span>
  },
  { title: <FormattedMessage {...PersonalAssetMessages.AssetTypePrice}/>, dataIndex: 'price',
    render: (price) => (
      <div>
        <TokenPNG />
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
