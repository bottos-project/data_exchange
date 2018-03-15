import React,{PureComponent} from 'react'
import { Table } from 'antd';
const columns = [
    { title: 'TradingID', dataIndex: 'tradingId',},
    { title: 'Price', dataIndex: 'price', key: 'price',render:()=>
            <div>
                <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                <span>200</span>
            </div>
    },
    { title: 'To', dataIndex: 'to',},
    { title: 'From', dataIndex: 'from',},
    { title: 'FileName', dataIndex: 'fileName', key: 'fileName' },
    { title: 'FileSize', dataIndex: 'fileSize', key: 'fileSize' },
    { title: 'Date', dataIndex: 'date',},
];

const data = [];
for (let i = 0; i < 7; ++i) {
    data.push({
        key: i,
        tradingId:"576879fr7dkjflkdsgjkld576879fr7",
        price:"200",
        to:"Tom",
        from:"John",
        fileName:"pandas.zip",
        fileSize:"127M",
        date: '2018-1-16',
    });
}

export default class BTHistoryTable extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Table className="shadow radius table" columns={columns} dataSource={data} size="middle" bordered />
            </div>
        )
    }
}



