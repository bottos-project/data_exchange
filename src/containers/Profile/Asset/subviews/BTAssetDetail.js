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
import "./styles.less"
import BTFetch from "../../../../utils/BTFetch"
import {getBlockInfo, getDataInfo} from "../../../../utils/BTCommonApi";
const { Option, OptGroup } = Select;




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
                render:() =>{
                    return(
                    <Select
                        defaultValue="数据清洗"
                        onChange={handleChange}
                    >
                            <Option value="jack">数据清洗</Option>
                            <Option value="lucy">数据采集</Option>
                    </Select>
                    )
                }

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
    async save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.cacheData = newData.map(item => ({item}));
        }
        let blockData = {
            code: "assetmng",
            action: "assetreg",
            args: {
                asset_id: "filehashtest2",
                basic_info: {
                    user_name: "wc2",
                    session_id: "sessidtestwc2",
                    asset_name: newData[key].assetName,
                    feature_tag: 12345,
                    sample_path: "pathtest",
                    sample_hash: "samplehasttest",
                    storage_path: "stpathtest",
                    storage_hash: "sthashtest",
                    expire_time: 345,
                    price: newData[key].price,
                    description: newData[key].description,
                    upload_date: 999,
                    signature: "sigtest"
                }
            }
        }
        let blockInfo = await getBlockInfo(blockData);
        blockData = await getDataInfo(blockData);
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','text/plain');
        fetch("http://10.104.21.10:8080/v2/asset/modify",{
            method:"post",
            header:myHeaders,
            body:JSON.stringify({
                ref_block_num: blockInfo.data.ref_block_num,
                ref_block_prefix: blockInfo.data.ref_block_prefix,
                expiration: blockInfo.data.expiration,
                scope: ["assetmn"],
                read_scope: [],
                messages: [{
                    code: "assetmng",
                    type: "assetreg",
                    authorization: [111],
                    data: blockData.data.bin,
                }],
                signatures:[]
            })
        }).then(response=>response.json())
            .then(res=>{
                if(res.code==1) {
                    alert("successful")
                    if(target){
                        this.setState({data: newData});
                    }
                }else{
                    alert("failed")
                }
            }).catch(error=>{
            console.log(error)
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

    componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','text/plain');
        fetch("http://127.0.0.1:3005/asset/modify",{
            method:"get",
            header:myHeaders,
        }).then(response=>response.json()).then(data=>{
            var newdata = [];
            console.log(data.assetDetail[0].asset_name)
            for(let i=0;i<data.assetDetail.length;i++){
                newdata.push({
                    key: i,
                    assetName:data.assetDetail[i].asset_name,
                    type:data.assetDetail[i].type,
                    price:data.assetDetail[i].price,
                    fileName:data.assetDetail[i].file_name,
                    fileSize:data.assetDetail[i].file_size,
                    date: "",
                    description:data.assetDetail[i].description,
                })
            }
            this.setState({
                data:newdata
            })
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
