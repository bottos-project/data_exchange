import React,{PureComponent} from 'react'
import { Table, Input, Icon, Button, Popconfirm,Menu, Dropdown, Select ,message} from 'antd';
import "./styles.less"
import BTFetch from "../../../../utils/BTFetch"
import {getBlockInfo, getDataInfo} from "../../../../utils/BTCommonApi";
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";

const PersonalAssetMessages = messages.PersonalAsset;
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
        console.log('getAccount', getAccount());
        if (!getAccount()) {
          location.hash = '#/dashboard'
        }
        const data = [];
        this.cacheData = data.map(item => ({ ...item }));
        this.state = {
            data:[],
            username:'',
            token:''
        }
    }
    columns(data) {
        // console.log(data)
        return [
            {
              title: <FormattedMessage {...PersonalAssetMessages.AssetName}/>,
              dataIndex: 'asset_name',
              render: (item) => {
                return <span>
                   {item.length < 25? item:item.substring(0,25)+'...'}
                </span>
              }
            },
            {
              title: <FormattedMessage {...PersonalAssetMessages.ExpectedPrice}/>,
              dataIndex: 'price',
              key: 'price',
              render: (price) => <div>
                  {/*<img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>*/}
                  <span>{price/Math.pow(10,10)}</span>
              </div>
            },
            {
              title: <FormattedMessage {...PersonalAssetMessages.ExpireTime}/>,
              dataIndex: 'expire_time',
              key: 'date',
              render: (text, record) => this.renderColumns(new Date(text*1000).toLocaleDateString(), record, 'date'),
            },
            {
              title: <FormattedMessage {...PersonalAssetMessages.AssetDescription}/>,
              dataIndex: 'description',
              key: 'description',
              render: (item) => <span>{item.length < 30 ? item : item.substring(0,30) + '...'}</span>
            },
            //修改操作
            /*{ title: <FormattedMessage {...PersonalAssetMessages.AssetOperation}/>,
                key:'y',
                render: ( record) => {
                    const { editable } = record;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                    <span>
                                          <a onClick={() => this.save(record)}>
                                               <FormattedMessage {...PersonalAssetMessages.Save}/>
                                          </a>
                                          <Popconfirm title= {<FormattedMessage {...PersonalAssetMessages.SureToCancel}/>} onConfirm={() => this.cancel(record.asset_id)}>
                                             <a>
                                                 <FormattedMessage {...PersonalAssetMessages.Cancel}/>
                                             </a>
                                          </Popconfirm>
                                    </span>
                                    : <a onClick={() => this.edit(record.asset_id)}>
                                        <FormattedMessage {...PersonalAssetMessages.Edit}/>
                                    </a>
                            }
                        </div>
                    );
                },
            }*/
          ];
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
        console.log(key)
        const target = newData.filter(item => key === item.asset_id)[0];
        console.log({
            newData
            ,target
            ,key
        })
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
        const target = newData.filter(item => key === item.asset_id)[0];
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
                    user_name: getAccount().username,
                    asset_type: 'type',
                    asset_name: key.asset_name,
                    feature_tag1: key.feature_tag1,
                    feature_tag2: key.feature_tag2,
                    feature_tag3: key.feature_tag3,
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
            message.error(window.localeInfo["PersonalAsset.FailedPromote"])
            return ;
        }
        console.log(key.asset_id);

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
                        delete target.editable;
                        this.setState({ data: newData });
                        this.cacheData = newData.map(item => ({ ...item }));
                    message.success(window.localeInfo["PersonalAsset.SuccessfulModify"])
                }else{
                    message.error(window.localeInfo["PersonalAsset.FailedModify"])
                }
            }).catch(error=>{
                    message.error(window.localeInfo["PersonalAsset.FailedModify"])
              })
    }
    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.asset_id)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.asset_id)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }


    componentDidMount() {
        let param={
            "userName":getAccount().username,
            "random": Math.ceil(Math.random()*100),
            "signatures": "0xxxx"
        }

        BTFetch("/asset/query",'post',param)
        .then(res=>{
           if(res.code==0){
               if(res.data.rowCount==0){
                   // message.warning('暂无数据');
                   //message.warning(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])
                   return;
               }
               // console.log(res.data)
               this.setState({
                  data: res.data.row
               })
           }
        }).catch(error=>{
            message.warning(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])
        })
    }
    render() {
        const { data } = this.state;
        const columns = this.columns(data);
        return (
            <div>
                <Table
                  className="shadow radius table"
                  bordered
                  dataSource={this.state.data}
                  rowKey='asset_id'
                  columns={columns}
                />
            </div>
        );
    }
}
