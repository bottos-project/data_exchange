import React,{PureComponent} from 'react'
import { Table, Icon } from 'antd';
import "./styles.less"
import BTFetch from '../../../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";
import { getDateAndTime } from "@/utils/dateTimeFormat";
import { getSignaturedParam } from '@/utils/BTCommonApi'


const PersonalAssetMessages = messages.PersonalAsset;

export default class BTHaveBought extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            data:[],
            username:'',
        }
    }
    columns() {
        return [
            { title: <FormattedMessage {...PersonalAssetMessages.AssetName}/>, dataIndex: 'asset_name',
              render: (item) => <span>{item}</span>
            },
            { title: <FormattedMessage {...PersonalAssetMessages.AssetTypePrice}/>, dataIndex: 'price',
              render: (price) => (
                <div>
                    <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                    <span>{price/Math.pow(10,10)}</span>
                </div>
              )
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
            // { title: <FormattedMessage {...PersonalAssetMessages.UploadTime}/>, dataIndex: 'create_time', key: 'date',
            //   render: getDateAndTime
            // },
            // { title: <FormattedMessage {...PersonalAssetMessages.AssetOperation} />, dataIndex: 'storage_path', key: 'x',
            //   render: (item, record) => {
            //     // console.log('record', record);
            //     return <a href={item} download={record.asset_name}>
            //         <Icon type="download" style={{color:"black",fontWeight:900}} />
            //     </a>
            //   }
            // },
            /*{ title: 'From', dataIndex: '', key: 'y', render:() =>
                    <div>
                        <a href="#" style={{color:"#6d6df5"}}>Jack</a>
                    </div>
            }*/
        ];
    }

    componentDidMount(){

        BTFetch('/user/QueryMyBuy','post', {
          ...getSignaturedParam(getAccount()),
          "page_size": 12,
          "page_num": 1
        }).then(res => {
          if (res.code == 1) {
            if (res.data.row_count == 0) {
              return message.warning(window.localeInfo["PersonalAsset.ThereIsNoHaveBoughtAssetForTheTimeBeing"])
            }
            this.setState({ data: res.data.row })
          } else {
            message.error(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])
            if (res.details) {
              let details = JSON.parse(res.details)
              console.error('details', details);
            }
          }
        }).catch(error=>{
          message.error(window.localeInfo["PersonalAsset.FailedToGetTheHaveBoughtAsset"])
        })

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
                dataSource={this.state.data}
            />
        )
    }
}
