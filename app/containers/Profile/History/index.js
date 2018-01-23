import React,{PureComponent} from 'react'
import { Table } from 'antd';

const columns = [
    { title: 'TradingID', dataIndex: 'tradingId',},
    { title: 'price', dataIndex: 'price',},
    { title: 'To', dataIndex: 'to',},
    { title: 'From', dataIndex: 'from',},
    { title: 'fileName', dataIndex: 'fileName', key: 'fileName' },
    { title: 'fileSize', dataIndex: 'fileSize', key: 'fileSize' },
    { title: 'Date', dataIndex: 'date',},
    { title: 'Action', dataIndex: '', key: 'x', render: () =>
        <div>
            <a href="#">more</a>
        </div>
}];
const data = [{
    key: '1',
    tradingId:"576879fr79",
    price:"200",
    to:"Tom",
    from:"John",
    fileName:"pandas.zip",
    fileSize:"127M",
    date: '2018-1-16',
}, {
    key: '2',
    tradingId:"67867hd79",
    price:"100",
    to:"John",
    from:"Tom",
    fileName:"cats.zip",
    fileSize:"179M",
    date: '2018-1-16',
}, {
    key: '3',
    tradingId:"54547rg69",
    price:"120",
    to:"Tom",
    from:"John",
    fileName:"dogs.zip",
    fileSize:"167M",
    date: '2018-1-16',
}];


export default class BTHistory extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="assetTagPage">
                    <Table columns={columns} dataSource={data} size="middle" />
            </div>
        )
    }
}



