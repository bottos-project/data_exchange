import React,{PureComponent} from 'react'
import { Table, } from 'antd';

const data = [];
for (let i = 0; i < 7; ++i) {
    data.push({
        key: i,
        title:"pandas",
        fileName:"pandas.zip",
        fileSize:"123M",
        date: '2018-01-15 23:12:00',
        from:"Jack",
    });
}
const columns = [
    { title: 'title', dataIndex: 'title', key: 'title' },
    { title: 'price', dataIndex: 'price', key: 'price',render:()=>
            <div>
                <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>
                <span>200</span>
            </div>
    },
    { title: 'fileName', dataIndex: 'fileName', key: 'fileName' },
    { title: 'fileSize', dataIndex: 'fileSize', key: 'fileSize' },
    { title: 'date', dataIndex: 'date', key: 'date' },
    { title: 'Action', dataIndex: '', key: 'x', render: () =>
            <ul>
                <a href="#">DownLoad </a>
            </ul>,
    },    { title: 'From', dataIndex: '', key: 'y', render: ()=>
            <div>
                <a href="#">John</a>
            </div>
    },

];

export default class BTHaveBought extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Table
                columns={columns}
                dataSource={data}
            />
        )
    }
}