import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { getSignaturedParam } from "@/utils/BTCommonApi";
import {FormattedMessage} from 'react-intl'
import messages from '@/locales/messages'
import {getAccount} from "@/tools/localStore";
import { getDateAndTime } from '@/utils/dateTimeFormat'
import TokenSymbol from '@/components/TokenSymbol'
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
    render: (price, record) => <div>
      <TokenSymbol type={record.token_type} />
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

  back = () => {
    this.props.router.goBack()
  }

  componentWillUnmount() {
    myEmitter.removeListener('transfer', this.changeTableData)
  }

  componentDidMount() {
    // console.log('this.table', this.table);
    myEmitter.on('transfer', this.changeTableData)
  }

  render() {
    const { selectedAccount, token_type, balance } = this.props.location.query
    return (
      <div>

        <div className="container route-children-bg accountItem">
          <div className="flex accountLeft">
            <div>
              <span className="font25 colorTitle">{token_type}</span>
              <FormattedMessage {...WalletMessages.AvailableCash}/>
            </div>
            <div className="font25 colorRed">{balance/Math.pow(10, 8)}</div>
          </div>
          <div className='accountRight'>
            <Button type="primary" onClick={this.back}>
              <FormattedMessage {...WalletMessages.Back} />
            </Button>
          </div>
        </div>

        <BTTable
          style={{marginTop: 20}}
          ref={t => this.table = t}
          columns={columns}
          rowKey='transaction_id'
          url='/user/GetTransfer'
          // options={{...getSignaturedParam(getAccount()), username: selectedAccount, token_type}}
          options={{username: selectedAccount, token_type}}
          catchError={(err) => console.log(err)}
          // catchError={(err) => message.error(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])}
          // {...props}
        />
      </div>
    );
  }

}

export default BTTransactionHistory;
