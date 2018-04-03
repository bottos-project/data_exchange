import React,{PureComponent} from 'react'
import { Table,message } from 'antd';
import BTFetch from '../../../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const HistoryMessages = messages.History;

export default class BTHistoryTable extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
    }
    columns(data){
        return [
            { title: <FormattedMessage {...HistoryMessages.TransactionID}/>, dataIndex: 'transaction_id',key:'transaction_id',render:(item)=>{
                    return <span>{item.substring(0,15)+'...'}</span>
                }},
            { title: <FormattedMessage {...HistoryMessages.Price}/>, dataIndex: 'price', key: 'price',render:(price)=>
                    <div>
                        <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                        <span>{price}</span>
                    </div>
            },
            { title: <FormattedMessage {...HistoryMessages.From}/>, dataIndex: 'from',key:'from'},
            { title: <FormattedMessage {...HistoryMessages.To}/>, dataIndex: 'to',key:'to'},
            /*{ title: 'FileName', dataIndex: 'fileName', key: 'fileName' },
            { title: 'FileSize', dataIndex: 'fileSize', key: 'fileSize' },*/
            { title: <FormattedMessage {...HistoryMessages.Date}/>, dataIndex: 'date',key:'date',render:(data)=>{
                    return <span>{data.split(' ')[0]}</span>
                }},
            { title: <FormattedMessage {...HistoryMessages.Block}/>, dataIndex: 'block_id',key:'block_id'},


        ];
    }
    componentDidMount(){
        BTFetch('/dashboard/GetRecentTxList','get').then(res=>{
            if(res&&res.code==1){
                if(res.data&&res.data.rowCount>0){
                    this.setState({
                        data:res.data.row,
                    })
                }
            }else{
                message.warning(window.localeInfo["Check.ThereIsNoHistoricalTransactionForTheTimeBeing"])
            }
        })
    }
    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(
            <div>
                <Table className="shadow radius table" columns={columns} dataSource={this.state.data} size="middle" bordered />
            </div>
        )
    }
}



