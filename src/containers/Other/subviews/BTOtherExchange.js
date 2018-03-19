import React,{PureComponent} from 'react'
import BlockList from './blockList'
import BTFetch from "../../../utils/BTFetch";
import {Table,message} from 'antd'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const BlockBrowsingMessages = messages.BlockBrowsing;
export default class BTOtherExchange extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            data:[],
        }
    }
    columns (data){
        return [
            { title: <FormattedMessage {...BlockBrowsingMessages.TransactionID}/>, dataIndex: 'transaction_id', key: 'title' ,render:(data)=>{
                    return <span>{data.substring(0,20)+'...'}</span>
                }},
            { title: <FormattedMessage {...BlockBrowsingMessages.Date}/>, dataIndex: 'date', key: 'time',render:(date)=>{
                return <span>{date.split(' ')[0]}</span>
                }},
            { title: <FormattedMessage {...BlockBrowsingMessages.From}/>, dataIndex: 'from', key: 'from'},
            { title: <FormattedMessage {...BlockBrowsingMessages.To}/>, dataIndex: 'to', key: 'to'},
            { title: <FormattedMessage {...BlockBrowsingMessages.Price}/>, dataIndex: 'price', key: 'price'},

        ];
    }
    componentDidMount() {
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetRecentTxList','POST',{limit:10},{full_path:true})
            .then(res=>{
                if ( res.code == 1) {
                    let data=res.data;
                    this.setState({
                        data,
                    })
                }
            }).catch(error=>{
                message.warning('暂无数据')
        })
    }

    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(
            <div className="BTOtherExchange">
                {/*<div style={{width:"100%"}}>*/}
                <div className="blockView">
                    <h3>
                        <FormattedMessage {...BlockBrowsingMessages.Transaction}/>
                    </h3>
                    {/*<a >查看所有&lt;</a>*/}
                </div>
                    <Table bordered pagination columns={columns} dataSource={this.state.data}
                    />
                {/*</div>*/}
            </div>
        )
    }
}