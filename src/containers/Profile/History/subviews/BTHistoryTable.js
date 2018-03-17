import React,{PureComponent} from 'react'
import { Table,message } from 'antd';
import BTFetch from '../../../../utils/BTFetch'


export default class BTHistoryTable extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
    }
    columns(data){
        return [
            { title: 'TradingID', dataIndex: 'transaction_id',key:'transaction_id',render:(item)=>{
                    return <span>{item.substring(0,15)+'...'}</span>
                }},
            { title: 'Price', dataIndex: 'price', key: 'price',render:(price)=>
                    <div>
                        <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>
                        <span>{price}</span>
                    </div>
            },
            { title: 'From', dataIndex: 'from',key:'from'},
            { title: 'To', dataIndex: 'to',key:'to'},
            /*{ title: 'FileName', dataIndex: 'fileName', key: 'fileName' },
            { title: 'FileSize', dataIndex: 'fileSize', key: 'fileSize' },*/
            { title: 'Date', dataIndex: 'date',key:'date',render:(data)=>{
                    return <span>{data.split(' ')[0]}</span>
                }},
            { title: 'block', dataIndex: 'block_id',key:'block_id'},


        ];
    }
    componentDidMount(){
        BTFetch('/dashboard/GetRecentTxList','get').then(res=>{
            if(res.code==1){
                let data=JSON.parse(res.data);
                console.log(data);
                this.setState({
                    data:data
                })
            }else{
                message.warning('暂无历史交易记录')
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



