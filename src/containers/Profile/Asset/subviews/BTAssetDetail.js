import React,{PureComponent} from 'react'
import { Table, Input, Icon, Button, Popconfirm,Menu, Dropdown, Select ,message} from 'antd';
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
        const data = [];
        this.cacheData = data.map(item => ({ item }));
        this.state = {
            data:[],
        }
    }
    columns(data){
        return [
            {title: 'assetName', dataIndex: 'asset_name',
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
                render: /*(text, record) => this.renderColumns(text, record, 'price')*/
                    (item)=>{
                       return <div>
                            <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                            <span>{item}</span>
                        </div>
                    }
            },
            /*{ title: 'FileName', dataIndex: 'fileName', key: 'fileName' },
            { title: 'FileSize', dataIndex: 'fileSize', key: 'fileSize' },*/
            { title: 'Date', dataIndex: 'upload_date', key: 'date',
                render: (text, record) => this.renderColumns(text, record, 'date'),
            },
            { title: 'Description', dataIndex: 'description', key: 'description',
                // render: (text, record) => this.renderColumns(text, record, 'description'),
                render:(item)=>{
                    return <span>
                           {item.length < 30? item:item.substring(0,30)+'...'}
                        </span>
                }
            },
            { title: 'Delete', dataIndex: 'delete',key:'x',
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
            { title: 'operation', dataIndex: 'operation', key:'y',
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
                    user_name: "btd121",
                    session_id: "sessidtestwc2",
                    asset_name: newData[key].asset_name,
                    feature_tag: 12345,
                    sample_path: "pathtest",
                    sample_hash: "samplehasttest",
                    storage_path: "stpathtest",
                    storage_hash: "sthashtest",
                    expire_time: 345,
                    price: newData[key].price,
                    description: newData[key].description,
                    upload_date: newData[key].upload_date,
                    signature: "sigtest"
                }
            }
        }
        let blockInfo = await getBlockInfo(blockData);
        blockData = await getDataInfo(blockData);
        if(blockData.code!=0 || blockInfo.code!=0){
            message.error('获取区块信息失败');
            return ;
        }
        let param={
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
        };
        BTFetch("/asset/modify",param,'post',{service:'service'})
            .then(res=>{
                if(res.code==1) {
                    if(res.data == 'null'){
                        return;
                    };
                    // console.log(d)
                    if(target){
                        this.setState({data: newData});
                    }
                }else{
                    message.error('获取发布资产失败')
                }
            }).catch(error=>{
                message.error('获取发布资产失败')
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
        let param={
            "userName": "btd121",
            "random": Math.ceil(Math.random()*100),
            "signatures": "0xxxx"
        }
        BTFetch("/asset/query",'post',param)
            .then(res=>{
                   if(res.code==1){
                       if(res.data=='null'){
                           message.warning('暂无数据');
                           return;
                       }
                       console.log(JSON.parse(res.data));

                       this.setState({
                          data: JSON.parse(res.data)
                       })
                   }
            }).catch(error=>{
                message.warning('暂无数据');
            })
    }
    render() {
        const { data } = this.state;
        const columns = this.columns(data);
        return (
            <div>
                <Table className="shadow radius table" bordered dataSource={this.state.data} columns={columns} />
            </div>
        );
    }
}
