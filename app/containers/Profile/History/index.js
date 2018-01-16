import React,{PureComponent} from 'react'
import { Table } from 'antd';

const columns = [ {
    title: 'TradingID',
    dataIndex: 'tradingId',
}, {
    title: 'Description',
    dataIndex: 'description',
}, {
    title: 'Count',
    dataIndex: 'count',
}, {
    title: 'Buyer',
    dataIndex: 'buyer',
}, {
    title: 'Seller',
    dataIndex: 'seller',
}, {
    title: 'Bid',
    dataIndex: 'bid',
}, {
    title: 'Date',
    dataIndex: 'date',
}, { title: 'Action', dataIndex: '', key: 'x', render: () =>
        <div>
            <a href="#">more</a>
        </div>
}];
const data = [{
    key: '1',
    tradingId:"57687979",
    description: "Videos",
    count:40,
    buyer:"Tom",
    seller:"John",
    bid:"200",
    date: '2018-1-16',
}, {
    key: '2',
    tradingId:"67867867979",
    description: "Audios",
    count:40,
    buyer:"John",
    seller:"Tom",
    bid:"150",
    date: '2018-1-16',
}, {
    key: '3',
    tradingId:"54564769",
    description: "Pictures",
    count:40,
    buyer:"Tom",
    seller:"John",
    bid:"100",
    date: '2018-1-16',
}];


export default class BTHistory extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <div>
                    <Table columns={columns} dataSource={data} size="middle" />
                </div>
            </div>
        )
    }
}



