import React,{PureComponent} from 'react'
import { Table } from 'antd'
import "./dashboardStyle.less"

const columns = [
    {title: 'TransactionID', dataIndex: 'id',},
    { title: 'price', dataIndex: 'price', key: 'price',render:()=>
            <div>
                <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>
                <span>200</span>
            </div>
    },
    {title: 'Type', dataIndex: 'type',},
    {title: 'From', dataIndex: 'from',},
    {title: 'To', dataIndex: 'to',},
    {title: 'Date', dataIndex: 'date',},
    {title: 'Block', dataIndex: 'block',}
    ];
const data = [];
for (let i = 0; i < 5; ++i) {
    data.push({
        key: i,
        id: '345231',
        price:"200",
        type:"数据清洗",
        from:"8x3454****1212",
        to:"0k4343****6473",
        date:"2018-01-22",
        block:"8494083904"
    });
}



export default class BTDashboardTable extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div style={{width:"100%"}}>
                <Table columns={columns} dataSource={data} size="middle" bordered />
            </div>
        )
    }
}