import React,{PureComponent} from 'react'
import {Table} from 'antd';

const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Action', dataIndex: '', key: 'x', render: () =>
            <ul>
                <a href="#">Delete</a>
            </ul>,
    },
    { title: 'Deadline', dataIndex: 'deadline', key: 'deadline' },
];

const data = [];
for (let i = 0; i < 5; ++i) {
    data.push({
        key: i,
        title: 'pandas',
        type:'数据清洗',
        price: '150',
        deadline: '2018-01-15 23:12:00',
        description:'i want some pictures of pandas',
    });
}

export default class BTAssetDetail extends PureComponent{
    constructor(props){
        super(props)
    }


    render(){
        return(
            <div style={{}}>
                <Table
                    className="components-table-demo-nested"
                    columns={columns}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={data}
                />
            </div>
        )
    }
}