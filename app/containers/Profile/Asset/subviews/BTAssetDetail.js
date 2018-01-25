// import React,{PureComponent} from 'react'
// import {Table,Icon} from 'antd';
//
//
// const columns = [
//     { title: 'AssetName', dataIndex: 'edit', key: 'assetName',render:() =>
//             <div>
//                 <span>{data[0].assetName}</span>
//                 <a><Icon type="edit"/></a>
//             </div>
// },
//     { title: 'Type', dataIndex: 'type', key: 'type',render:() =>
//             <div>
//                 <span>{data[0].type}</span>
//                 <a><Icon type="edit"/></a>
//             </div> },
//     { title: 'Price', dataIndex: 'price', key: 'price',render:() =>
//             <div>
//                 <span>{data[0].price}</span>
//                 <a><Icon type="edit"/></a>
//             </div> },
//     { title: 'FileName', dataIndex: 'fileName', key: 'fileName' },
//     { title: 'FileSize', dataIndex: 'fileSize', key: 'fileSize' },
//     { title: 'Action', dataIndex: '', key: 'x', render: () =>
//             <ul>
//                 <a href="#">DownLoad </a>
//                 <a href="#">Delete</a>
//             </ul>,
//     },
//     { title: 'Date', dataIndex: 'date', key: 'date'},
// ];
//
// const data = [];
// for (let i = 0; i < 5; ++i) {
//     data.push({
//         key: i,
//         assetName: 'pandas',
//         type:'数据清洗',
//         price: '150',
//         fileName:"pandas.zip",
//         fileSize:"123M",
//         date: '2018-01-15 23:12:00',
//         description:'the pictures of pandas',
//     });
// }
//
// export default class BTAssetDetail extends PureComponent{
//     constructor(props){
//         super(props)
//     }
//
//
//     render(){
//         return(
//                 <Table
//                     className="components-table-demo-nested"
//                     columns={columns}
//                     expandedRowRender={record =>
//                         <div>
//                             <span style={{ margin: 0 }}>
//                                 {record.description}
//                             </span>
//                             <a><Icon type="edit"/></a>
//                         </div>
//
//                             }
//                     dataSource={data}
//                 />
//         )
//     }
// }

import React,{PureComponent} from 'react'
import BTEditableCell from "./BTEditableCell"
import { Table, Input, Icon, Button, Popconfirm,Menu, Dropdown, Select } from 'antd';
const { Option, OptGroup } = Select;
const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);

function handleChange(value) {
    console.log(`selected ${value}`);
}

export default class BTAssetDetail extends PureComponent{
    constructor(props) {
        super(props);
        this.columns = [
            {title: 'assetName', dataIndex: 'assetName',
            render: (text, record) => (
                <BTEditableCell
                    value={text}
                    onChange={()=>this.onCellChange(record.key, 'assetName')}
                />
            ),
        }, { title: 'Type', dataIndex: 'type', key: 'type',
                render:() =>(
                    <Select
                        defaultValue="数据清洗"
                        onChange={handleChange}
                    >
                            <Option value="jack">数据清洗</Option>
                            <Option value="lucy">数据采集</Option>
                    </Select>
                )

            },
        { title: 'Price', dataIndex: 'price', key: 'price',
                render: (text, record) => (
                    <BTEditableCell
                        value={text}
                        onChange={()=>this.onCellChange(record.key, 'type')}
                    />
                ),
            },
        { title: 'FileName', dataIndex: 'fileName', key: 'fileName' },
        { title: 'FileSize', dataIndex: 'fileSize', key: 'fileSize' },
        { title: 'Date', dataIndex: 'date', key: 'date'},
        { title: 'operation', dataIndex: 'operation',
            render: (text, record) => {
                return (
                    // this.state.dataSource.length > 1 ?
                    //     (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                                <a href="#">Delete</a>
                            </Popconfirm>
                        // ) : null
                );
            },
        }];
        const dataSource = [];
        for (let i = 0; i < 7; ++i) {
            dataSource.push({
                key: i,
                assetName: 'pandas',
                type:'数据清洗',
                price: '150',
                fileName:"pandas.zip",
                fileSize:"123M",
                date: '2018-01-15 23:12:00',
                description:'the pictures of pandas',
            });
        }
        this.state = {
            dataSource,
            count:7
        }
    }

    onCellChange(key, dataIndex){
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource });
            }
        };
    };

    onDelete(key){
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Table bordered dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}
