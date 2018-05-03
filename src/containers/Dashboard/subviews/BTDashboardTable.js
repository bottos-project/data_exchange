import React,{PureComponent} from 'react'
import { Table } from 'antd'
import "./dashboardStyle.less"
import BTFetch from '../../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const DashboardMessages = messages.Dashboard;
const columns = [
    {title: 'TransactionID', dataIndex: 'id'},
    { title: 'Price', dataIndex: 'price', key: 'price'},
    {title: 'Type', dataIndex: 'type'},
    {title: 'From', dataIndex: 'from'},
    {title: 'To', dataIndex: 'to'},
    {title: 'Date', dataIndex: 'date'},
    {title: 'Block', dataIndex: 'block'}
    ];



export default class BTDashboardTable extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            data:[],
        }
    }
    columns(data){
        return [
            {title: 'TransactionID', dataIndex: 'transaction_id',key:'transaction_id',render:(item)=>{
                return <span>{item.substring(0,15)+'...'}</span>
                }},
            { title: 'Price', dataIndex: 'price', key: 'price',render:()=>
                    <div>
                        <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                        <span>200</span>
                    </div>
            },
            {title: 'Type', dataIndex: 'type',key:'type'},
            {title: 'From', dataIndex: 'from',key:'from'},
            {title: 'To', dataIndex: 'to',key:'to'},
            {title: 'Date', dataIndex: 'date',key:'date',render:(data)=>{
                return <span>{data.split(' ')[0]}</span>
                }},
            {title: 'Block', dataIndex: 'block_id',key:'block_id'}
        ];
    }
    componentDidMount(){
        BTFetch('/dashboard/GetRecentTxList','get',{},{
            service:'service',
        }).then(res=>{
            if(res.code==1){
                let data=JSON.parse(res.data);
                console.log(data)
                this.setState({
                    data
                })
            }
        })
    }
    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(
            <div>
                <h3 style={{padding:20,color:"#666666"}}>
                    <FormattedMessage {...DashboardMessages.RecentTransactions}/>
                </h3>
                <Table
                    className="shadow radius table"
                    columns={columns}
                    dataSource={this.state.data}
                    size="middle"
                    pagination
                    bordered
                />
            </div>
        )
    }
}