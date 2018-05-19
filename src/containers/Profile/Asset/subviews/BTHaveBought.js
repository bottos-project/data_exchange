import React,{PureComponent} from 'react'
import { Table, Icon,message} from 'antd';
import "./styles.less"
import BTFetch from '../../../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";
import { getDateAndTime } from "@/utils/dateTimeFormat";

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
        let param={
            userName:getAccount().username,
            random:Math.ceil(Math.random()*100),
            signatures:'0XXXX'
        }
        BTFetch('/asset/GetUserPurchaseAssetList','post',param).then(res=>{
            if(res.code==0){
                if(res.data.rowCount==0){
                    //message.warning(window.localeInfo["PersonalAsset.ThereIsNoHaveBoughtAssetForTheTimeBeing"])
                    return;
                }
                this.setState({
                    data:res.data.row,
                })
            }else{
                message.error(window.localeInfo["PersonalAsset.FailedToGetTheHaveBoughtAsset"])

            }
        }).catch(error=>{
            message.error(window.localeInfo["PersonalAsset.FailedToGetTheHaveBoughtAsset"])
        });
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
