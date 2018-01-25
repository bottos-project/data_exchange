import React,{PureComponent} from 'react'
import { Table } from 'antd';

const columns = [{
    title: 'TransactionID',
    dataIndex: 'id',
}, {
    title: 'Price',
    dataIndex: 'price',
}, {
    title: 'Type',
    dataIndex: 'type',
}, {
    title: 'From',
    dataIndex: 'from',
}, {
    title: 'To',
    dataIndex: 'to',
}, {
    title: 'Date',
    dataIndex: 'date',
}, {
    title: 'Block',
    dataIndex: 'block',
}];
const data = [{
    key: '1',
    id: '345231',
    price:"200",
    type:"数据清洗",
    from:"8x3454****1212",
    to:"0k4343****6473",
    date:"2018-01-22",
    block:"8494083904"
},{
    key: '2',
    id: '345231',
    price:"200",
    type:"数据清洗",
    from:"8x3454****1212",
    to:"0k4343****6473",
    date:"2018-01-22",
    block:"8494083904"
},{
    key: '3',
    id: '345231',
    price:"200",
    type:"数据清洗",
    from:"8x3454****1212",
    to:"0k4343****6473",
    date:"2018-01-22",
    block:"8494083904"
},{
    key: '4',
    id: '345231',
    price:"200",
    type:"数据清洗",
    from:"8x3454****1212",
    to:"0k4343****6473",
    date:"2018-01-22",
    block:"8494083904"
},{
    key: '5',
    id: '345231',
    price:"200",
    type:"数据清洗",
    from:"8x3454****1212",
    to:"0k4343****6473",
    date:"2018-01-22",
    block:"8494083904"
},{
    key: '1',
    id: '345231',
    price:"200",
    type:"数据清洗",
    from:"8x3454****1212",
    to:"0k4343****6473",
    date:"2018-01-22",
    block:"8494083904"
},
];



export default class BTDashboardTable extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div style={{width:"100%"}}>
                <Table columns={columns} dataSource={data} size="middle" />
            </div>
        )
    }
}