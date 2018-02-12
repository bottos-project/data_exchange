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
import { Table, Input, Icon, Button, Popconfirm,Menu, Dropdown, Select } from 'antd';
const { Option, OptGroup } = Select;
import "./styles.less"
import BTFetch from "../../../../utils/BTFetch"
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


const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);
function handleChange(value) {
    console.log(`selected $(value)`);
}

export default class BTAssetDetail extends PureComponent{
    constructor(props) {
        super(props);
        this.columns = [
            {title: 'assetName', dataIndex: 'assetName',
                render: (text, record) => this.renderColumns(text, record, 'assetName'),
        },
            { title: 'Type', dataIndex: 'type', key: 'type',
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
            render: (text, record) => this.renderColumns(text, record, 'price')
            },
        { title: 'FileName', dataIndex: 'fileName', key: 'fileName' },
        { title: 'FileSize', dataIndex: 'fileSize', key: 'fileSize' },
        { title: 'Date', dataIndex: 'date', key: 'date',
            render: (text, record) => this.renderColumns(text, record, 'date'),
        },
        { title: 'Description', dataIndex: 'description', key: 'description',
            render: (text, record) => this.renderColumns(text, record, 'description'),
        },
        { title: 'Delete', dataIndex: 'delete',
            render: (text, record) => {
                return (
                    // this.state.dataSource.length > 1 ?
                    //     (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                                <a href="#" style={{color:"#6d6df5"}}>Delete</a>
                            </Popconfirm>
                        // ) : null
                );
            },
        },
        { title: 'operation', dataIndex: 'operation',
                render: (text, record) => {
                    const { editable } = record;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                    <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                                    : <a onClick={() => this.edit(record.key)}>Edit</a>
                            }
                        </div>
                    );
                },
            }];
        const data = [];
        this.cacheData = data.map(item => ({ item }));
        for (let i = 0; i < 7; ++i) {
            data.push({
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
            data,
        }
    }
    //删除数据后的操作
    onDelete(key){
        const dataSource = [...this.state.data];
        this.setState({ data: dataSource.filter(item => item.key !== key) });
        const deleteDataSource = this.state.data[key];//被删除的一行的数据
        BTFetch("","post",deleteDataSource).then((data)=>{
            console.log(data)
        })
    }
    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }
    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }
    edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }

    }
    //修改数据后点击保存
    save(key) {
                const newData = [...this.state.data];
                const target = newData.filter(item => key === item.key)[0];
                if (target) {
                    delete target.editable;
                    this.setState({ data: newData });
                    this.cacheData = newData.map(item => ({ item }));
                }
                const postNewData = newData[key];
                BTFetch("","post",postNewData).then(data=>{
                    console.log(data)
                })
    }
    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }

    //进入页面开始加载数据
    componentDidMount() {
        BTFetch("url","post",JSON.stringify({sessionID:"lalala"})).then(data=>{
            const response = JSON.parse(data);
            this.setState({
                data:response
            });
        }).catch(error=>{
            console.log(error)
        })
    }
    render() {
        return (
            <div>
                <Table bordered dataSource={this.state.data} columns={this.columns} />
            </div>
        );
    }
}
