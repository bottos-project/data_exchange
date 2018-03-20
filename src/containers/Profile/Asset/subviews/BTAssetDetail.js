import React,{PureComponent} from 'react'
import { Table, Input, Icon, Button, Popconfirm,Menu, Dropdown, Select ,message} from 'antd';
import "./styles.less"
import BTFetch from "../../../../utils/BTFetch"
import {getBlockInfo, getDataInfo} from "../../../../utils/BTCommonApi";
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const PersonalAssetMessages = messages.PersonalAsset;
const { Option, OptGroup } = Select;
const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} defaultValue={value} onChange={e => onChange(e.target.value)} />
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
        this.cacheData = data.map(item => ({ ...item }));
        this.state = {
            data:[],
        }
    }
    columns(data){
        return [
            {title: <FormattedMessage {...PersonalAssetMessages.AssetName}/>, dataIndex: 'asset_name',
                render: (item, record) => this.renderColumns(item, record, 'asset_name'),
            },
            { title:  <FormattedMessage {...PersonalAssetMessages.ExpectedPrice}/>, dataIndex: 'price', key: 'price',render:(item,record)=>{
                       return <div>
                            {/*<img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>*/}
                            <span>{this.renderColumns(item,record,'price')}</span>
                        </div>
                    }
            },
            { title: <FormattedMessage {...PersonalAssetMessages.UploadTime}/>, dataIndex: 'create_time', key: 'date',
                render: (text, record) => this.renderColumns(text, record, 'date'),
            },
            { title: <FormattedMessage {...PersonalAssetMessages.AssetDescription}/>, dataIndex: 'description', key: 'description',
                render:(item)=>{
                    return <span>
                           {item.length < 30? item:item.substring(0,30)+'...'}
                        </span>
                }
            },

            { title: <FormattedMessage {...PersonalAssetMessages.AssetOperation}/> ,key:'y',
                render: (text, record) => {
                    const { editable } = record;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                    <span>
                                          <a onClick={() => this.save(text)}>
                                               <FormattedMessage {...PersonalAssetMessages.Save}/>
                                          </a>
                                          <Popconfirm title= {<FormattedMessage {...PersonalAssetMessages.SureToCancel}/>} onConfirm={() => this.cancel(record.key)}>
                                             <a>
                                                 <FormattedMessage {...PersonalAssetMessages.Cancel}/>
                                             </a>
                                          </Popconfirm>
                                    </span>
                                    : <a onClick={() => this.edit(record.key)}>
                                        <FormattedMessage {...PersonalAssetMessages.Edit}/>
                                    </a>
                            }
                        </div>
                    );
                },
            }];
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
            console.log(20)
        }
    }
    //修改数据后点击保存
    async save(key) {
        const newData = [...this.state.data];
        console.log(newData,key)
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.cacheData = newData.map(item => ({item}));
        }
        let gblockData = {
            code: "assetmng",
            action: "assetreg",
            args: {
                asset_id: key.asset_id,
                basic_info: {
                    user_name: JSON.parse(window.localStorage.account_info).username|| '',
                    asset_type: 'type',
                    asset_name: key.asset_name,
                    feature_tag1: 12345,
                    feature_tag2: 12345,
                    feature_tag3: 12345,
                    sample_path: key.sample_path,
                    sample_hash: key.sample_hash,
                    storage_path: key.sample_hash,
                    storage_hash: key.storage_path,
                    expire_time: key.expire_time,
                    price: key.price,
                    description: key.description,
                    upload_date: key.upload_date,
                    signature: "0xxxx",
                }
            }
        };
        let blockInfo = await getBlockInfo();
        let blockData = await getDataInfo(gblockData);
        if(blockData.code!=0 || blockInfo.code!=0){
            message.error('获取区块信息失败');
            return ;
        }
        let param={
            ref_block_num: blockInfo.data.ref_block_num,
            ref_block_prefix: blockInfo.data.ref_block_prefix,
            expiration: blockInfo.data.expiration,
            scope: ["assetmng"],
            read_scope: [],
            messages: [{
                code: "assetmng",
                type: "assetreg",
                authorization: [],
                data: blockData.data.bin,
            }],
            signatures:[]
        };
        BTFetch("/asset/modify",'post',param)
            .then(res=>{
                if(res.code==1) {
                    if(res.data == 'null'){
                        return;
                    };
                    // console.log(d)
                    if(target){
                        delete target.editable;
                        this.setState({ data: newData });
                        this.cacheData = newData.map(item => ({ ...item }));
                    }
                    message.success('修改发布资产成功')
                }else{
                    message.error('修改发布资产失败')
                }
            }).catch(error=>{
                message.error('修改发布资产失败')
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
            "userName": JSON.parse(window.localStorage.account_info).username||'',
            "random": Math.ceil(Math.random()*100),
            "signatures": "0xxxx"
        }
        BTFetch("/asset/query",'post',param)
            .then(res=>{
                   if(res.code==0){
                       if(res.data.rowCount==0){
                           message.warning('暂无数据');
                           return;
                       }
                       console.log(res.data)
                       this.setState({
                          data:res.data.row
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
