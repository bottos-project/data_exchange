import React,{PureComponent} from 'react'
import { Table, Icon } from 'antd';
import { getSignaturedParam, BTRowFetch } from "../../../../utils/BTCommonApi";
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";
import { getDateAndTime } from '@/utils/dateTimeFormat'
import { BTDownloadFile } from '@/utils/BTDownloadFile'
import { selectType } from '@/utils/keyMaps'
import TokenPNG from '@/components/TokenPNG'

const PersonalAssetMessages = messages.PersonalAsset;

const columns = [
  {
    title: <FormattedMessage {...PersonalAssetMessages.AssetName}/>,
    dataIndex: 'asset_name',
    render: (item) => {
      return <span title={item}>
         {item.length < 25? item:item.substring(0,25)+'...'}
      </span>
    }
  },
  {
    title: <FormattedMessage {...PersonalAssetMessages.ExpectedPrice}/>,
    dataIndex: 'price',
    render: (price) => <div>
      <TokenPNG />
      <span>{price/Math.pow(10, 8)}</span>
    </div>
  },
  {
    title: <FormattedMessage {...PersonalAssetMessages.ExpireTime}/>,
    dataIndex: 'expire_time',
    render: getDateAndTime
  },
  {
    title: <FormattedMessage {...PersonalAssetMessages.AssetType}/>,
    dataIndex: 'asset_type',
    render: asset_type => selectType[asset_type]
  },
  { title: <FormattedMessage {...PersonalAssetMessages.Download} />, dataIndex: 'storage_hash',
    render: (text) => <a onClick={()=> BTDownloadFile(text, getAccount().username)}>
        <Icon type="download" style={{color:"black",fontWeight:900}} />
    </a>
  }
]

class BTPublishedAssets extends PureComponent{
    constructor(props) {
      super(props);
      this.state = {
        dataSource: [],
        total: 0
      }
      this.searchPublishAsset = this.searchPublishAsset.bind(this)
    }

    searchPublishAsset(page, pageSize){
      let params = {
        "page_size": pageSize,
        "page_num": page,
        "assetType": 0,
        ...getSignaturedParam(getAccount())
      }

      BTRowFetch('/asset/queryMyAsset', params)
      .then(res => {
        this.setState({
          dataSource: res.row,
          total: res.total
        })
      }).catch(error => {
        window.message.error(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])
      })

    }

    componentDidMount() {
      this.searchPublishAsset(1, this.props.pageSize)
    }

    render() {
      return (
        <Table
          className="shadow radius table"
          dataSource={this.state.dataSource}
          rowKey='asset_id'
          columns={columns}
          pagination={{
            defaultPageSize: this.props.pageSize,
            total: this.state.total,
            onChange: this.searchPublishAsset
          }}
        />
      );
    }
}

BTPublishedAssets.defaultProps = {
  pageSize: 12
}

export default BTPublishedAssets
