import React,{PureComponent} from 'react'
import {Table} from 'antd';

const columns = [
    { title: 'AssetName', dataIndex: 'assetName', key: 'assetName' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'FileName', dataIndex: 'fileName', key: 'fileName' },
    { title: 'FileSize', dataIndex: 'fileSize', key: 'fileSize' },
    { title: 'Action', dataIndex: '', key: 'x', render: () =>
            <ul>
                <a href="#">DownLoad </a>
                <a href="#">Delete</a>
            </ul>,
    },
    { title: 'Date', dataIndex: 'date', key: 'date' },
];

const data = [];
for (let i = 0; i < 5; ++i) {
    data.push({
        key: i,
        assetName: 'pandas',
        price: '150',
        fileName:"pandas.zip",
        fileSize:"123M",
        date: '2018-01-15 23:12:00',
    });
}

export default class BTAssetDetail extends PureComponent{
    constructor(props){
        super(props)
    }


    render(){
        return(
                <Table
                    className="components-table-demo-nested"
                    columns={columns}
                    dataSource={data}
                />
        )
    }
}