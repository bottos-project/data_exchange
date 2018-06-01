import React,{PureComponent} from 'react'
import { Table, Icon } from 'antd';
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";
import { getDateAndTime } from "@/utils/dateTimeFormat";
import { getSignaturedParam, BTRowFetch } from '@/utils/BTCommonApi'
import { BTDownloadFile } from '@/utils/BTDownloadFile'
import { selectType } from '@/utils/keyMaps'
import TokenPNG from '@/components/TokenPNG'

const PersonalAssetMessages = messages.PersonalAsset;

class BTHaveBought extends PureComponent{
    constructor(props){
        super(props);
        this.state={
          dataSource: [],
          total: 0
        }
        this.onChange=this.onChange.bind(this)
    }
    columns() {
        return [
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

           /* { title: <FormattedMessage {...PersonalAssetMessages.AssetTypePrice}/>, dataIndex: 'price', key: 'price1',render:(price)=>
                    <div>
                        <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                        <span>{price}</span>
                    </div>
            },*/
           /* { title: 'fileName', dataIndex: 'fileName', key: 'fileName' },
            { title: 'fileSize', dataIndex: 'fileSize', key: 'fileSize' },*/
            // { title: <FormattedMessage {...PersonalAssetMessages.AssetDescription}/>, dataIndex: 'description', key: 'description',
            //   render: (item) => <span>{item.length <= 20 ? item : item.substring(0,20)+'...'}</span>
            // },
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
            },
            /*{ title: 'From', dataIndex: '', key: 'y', render:() =>
                    <div>
                        <a href="#" style={{color:"#6d6df5"}}>Jack</a>
                    </div>
            }*/
        ];
    }

    onChange(page, pageSize) {
        this.getPagination(page, pageSize);
    }

    getPagination(page, pageSize) {

      BTRowFetch('/user/QueryMyBuy', {
        ...getSignaturedParam(getAccount()),
        "page_num": page,
        "page_size": pageSize,
      }).then(res => {
        this.setState({
          dataSource: res.row,
          total: res.total
        })
      }).catch(error=>{
        message.error(window.localeInfo["PersonalAsset.FailedToGetTheHaveBoughtAsset"])
      })

    }

    componentDidMount(){
      this.getPagination(1, this.props.pageSize);
    }

    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(
            <Table
                className="shadow radius table"
                columns={columns}
                rowKey='asset_id'
                style={{width:"100%"}}
                dataSource={this.state.dataSource}
                pagination={{
                  hideOnSinglePage: true,
                  showQuickJumper: this.state.total / this.props.pageSize > 10,
                  pageSize: this.props.pageSize,
                  total: this.state.total,
                  onChange: this.onChange
                }}

            />
        )
    }
}

BTHaveBought.defaultProps = {
  pageSize: 12
};

export default BTHaveBought
