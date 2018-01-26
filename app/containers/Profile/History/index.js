import React,{PureComponent} from 'react'
import { Table } from 'antd';

const columns = [
    { title: 'TradingID', dataIndex: 'tradingId',},
    { title: 'price', dataIndex: 'price', key: 'price',render:()=>
            <div>
                <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>
                <span>200</span>
            </div>
    },
    { title: 'To', dataIndex: 'to',},
    { title: 'From', dataIndex: 'from',},
    { title: 'fileName', dataIndex: 'fileName', key: 'fileName' },
    { title: 'fileSize', dataIndex: 'fileSize', key: 'fileSize' },
    { title: 'Date', dataIndex: 'date',},
];

const data = [];
for (let i = 0; i < 7; ++i) {
    data.push({
        key: i,
        tradingId:"576879fr79",
        price:"200",
        to:"Tom",
        from:"John",
        fileName:"pandas.zip",
        fileSize:"127M",
        date: '2018-1-16',
    });
}

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



