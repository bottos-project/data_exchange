import React, { Component } from 'react';
import { Icon } from 'antd';
import { getSignaturedParam } from "@/utils/BTCommonApi";
import {FormattedMessage} from 'react-intl'
import messages from '@/locales/messages'
import {getAccount} from "@/tools/localStore";
import { getDateAndTime } from '@/utils/dateTimeFormat'
import TokenPNG from '@/components/TokenPNG'
import BTTable from '@/components/BTTable'
import myEmitter from '../../../../utils/eventEmitter'


const WalletMessages = messages.Wallet;


// Value:100000000000
// block_number:109,
// from:"bottos",
// timestamp:1529491802,
// to:"afaf",
// transaction_id:'3e4bbb5ffa042b258d139e4f912bff62de17bc24e4446cef48da4ec38edb0219'

const columns = [
  {
    title: <FormattedMessage {...WalletMessages.TransactionID}/>,
    dataIndex: 'transaction_id',
    render: (item) => {
      return <span title={item}>
         {item.length < 25 ? item : item.substring(0,25) + '...'}
      </span>
    }
  },
  {
    title: <FormattedMessage {...WalletMessages.Price}/>,
    dataIndex: 'Value',
    render: (price) => <div>
      <TokenPNG />
      <span>{price/Math.pow(10, 8)}</span>
    </div>
  },
  {
    title: <FormattedMessage {...WalletMessages.From}/>,
    dataIndex: 'from',
  },
  {
    title: <FormattedMessage {...WalletMessages.To}/>,
    dataIndex: 'to',
  },
  {
    title: <FormattedMessage {...WalletMessages.Date}/>,
    dataIndex: 'timestamp',
    render: getDateAndTime
  },
  // {
  //   title: <FormattedMessage {...PersonalAssetMessages.AssetType}/>,
  //   dataIndex: 'asset_type',
  //   render: asset_type => selectType[asset_type]
  // },
  // { title: <FormattedMessage {...PersonalAssetMessages.Download} />, dataIndex: 'storage_hash',
  //   render: (text) => <a onClick={()=> BTDownloadFile(text, getAccount().username)}>
  //       <Icon type="download" style={{color:"black",fontWeight:900}} />
  //   </a>
  // }
]

class BTTransactionHistory extends Component {

  changeTableData = () => {
    this.table.onChange(1, 12)
  }

  componentWillUnmount() {
    myEmitter.removeListener('transfer', this.changeTableData)
  }

  componentDidMount() {
    // console.log('this.table', this.table);
    myEmitter.on('transfer', this.changeTableData)
  }

  render() {
    return (
      <div style={{marginTop: 20}}>
        <BTTable
          ref={t => this.table = t}
          columns={columns}
          rowKey='transaction_id'
          url='/user/GetTransfer'
          options={getSignaturedParam(getAccount())}
          catchError={(err) => console.log(err)}
          // catchError={(err) => message.error(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])}
          // {...props}
        />
      </div>
    );
  }

}

export default BTTransactionHistory;
