import React,{PureComponent} from 'react'
import { Table, Icon,message} from 'antd';
import "./styles.less"
import BTFetch from '../../../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";
import { getDateAndTime } from "@/utils/dateTimeFormat";
import {queryProtoEncode} from '../../../../lib/proto/index'
import * as BTCryptTool from 'bottos-js-crypto'

const PersonalAssetMessages = messages.PersonalAsset;

export default class BTHaveBought extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            data:[],
            username:'',
            token:''
        }
    }
    columns(data){
        console.log(data);
        return [
            { title: <FormattedMessage {...PersonalAssetMessages.AssetName}/>, dataIndex: 'asset_name', key: 'title',
                render:(item)=>{
                    return <span>
                           {item.length < 25? item:item.substring(0,25)+'...'}
                        </span>
                }},
            { title: <FormattedMessage {...PersonalAssetMessages.AssetTypePrice}/>, dataIndex: 'price', key: 'price',render:(price)=>
                    <div>
                        <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                        <span>{price/Math.pow(10,10)}</span>
                    </div>
            },
           /* { title: <FormattedMessage {...PersonalAssetMessages.AssetTypePrice}/>, dataIndex: 'price', key: 'price1',render:(price)=>
                    <div>
                        <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                        <span>{price}</span>
                    </div>
            },*/
           /* { title: 'fileName', dataIndex: 'fileName', key: 'fileName' },
            { title: 'fileSize', dataIndex: 'fileSize', key: 'fileSize' },*/
            { title: <FormattedMessage {...PersonalAssetMessages.AssetDescription}/>, dataIndex: 'description', key: 'description',
              render: (item) => <span>{item.length <= 20 ? item : item.substring(0,20)+'...'}</span>
            },
            { title: <FormattedMessage {...PersonalAssetMessages.UploadTime}/>, dataIndex: 'create_time', key: 'date',
              render: item => getDateAndTime(item)
            },
            { title: <FormattedMessage {...PersonalAssetMessages.AssetOperation} />, dataIndex: 'storage_path', key: 'x',
              render: (item, record) => {
                // console.log('record', record);
                return <a href={item} download={record.asset_name}>
                    <Icon type="download" style={{color:"black",fontWeight:900}} />
                </a>
              }
            },
            /*{ title: 'From', dataIndex: '', key: 'y', render:() =>
                    <div>
                        <a href="#" style={{color:"#6d6df5"}}>Jack</a>
                    </div>
            }*/
        ];
    }

    componentDidMount(){
        this.getMyBuyAsset()
    }

    getMyBuyAsset(){
        message.destroy()
        let localStorage = window.localStorage
        let account_info = JSON.parse(localStorage.account_info)
        let sign = this.getSignature(account_info.username,account_info.privateKey)
        let params = {
            "pageSize": 10,
            "pageNum": 1,
            "assetType": 1,
            "username": account_info.username,
            ...sign
        }

        let url = '/user/QueryMyBuy'
        BTFetch(url,'POST',params)
        .then(response=>{
            if(response&& response.code==1){
                let data = response.data
                if(Array.isArray(data.row)){
                    this.setState({data:response.data.row})
                }else{
                    message.error(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])
                }
            }else{
                message.error(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])
            }
        }).catch(error=>{
            message.error(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])
        })


    }

    getSignature(username,privateKeyStr){
        let privateKey = Buffer.from(privateKeyStr,'hex') 
        let random = window.uuid
        let msg = {username,random}
        let query_pb = require('../../../../lib/proto/query_pb')
        let loginProto = queryProtoEncode(query_pb,msg)
        let hash = BTCryptTool.sha256(BTCryptTool.buf2hex(loginProto))
        let signature = BTCryptTool.sign(hash,privateKey).toString('hex')
       return {signature,random}
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
