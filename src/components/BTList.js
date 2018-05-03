import React,{PureComponent} from 'react'
import BTListCell from './BTListCell'
import {Icon,Checkbox,Row,Col,message,Table,Button,Popconfirm} from 'antd'
import BTFetch from '../utils/BTFetch'
import {getBlockInfo,getDataInfo} from '../utils/BTCommonApi'
import {hashHistory} from 'react-router'
import {FormattedMessage} from 'react-intl'
import messages from '../locales/messages'
import {getAccount} from "../tools/localStore";

const CollectMessages = messages.Collect;

const CheckboxGroup = Checkbox.Group;
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export default class BTList extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            data:[],
            username:'',
            token:''
        }
    }
    columns (data){
        console.log(data)
          return [
            { title: <FormattedMessage {...CollectMessages.GoodId}/>, dataIndex: 'goodsId', key: 'title' },
            { title: <FormattedMessage {...CollectMessages.From}/>, dataIndex: 'username', key: 'from'},
            { title: <FormattedMessage {...CollectMessages.Delete}/>, key:'x', render: (item) => {
                    return (
                        // this.state.dataSource.length > 1 ?
                        //     (
                        <Popconfirm title= {<FormattedMessage {...CollectMessages.SureToDelete}/>} onConfirm={() => this.onDelete(item)}>
                            <a href="#">
                                <FormattedMessage {...CollectMessages.Delete}/>
                            </a>
                        </Popconfirm>
                        // ) : null
                    );
                },
            },
             { title: <FormattedMessage {...CollectMessages.ViewTheDetails}/>, dataIndex: 'goodsId', key: 'looker',render:(item)=>{
                 return <Button onClick={()=>this.lookfor(item)}><FormattedMessage {...CollectMessages.View}/></Button>
                 }},


          ];
    }
    onSelectChange(selectedRowKeys){
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    lookfor(item){
        let param={
            "assetID":item,
            "random": Math.ceil(Math.random()*100),
            "signatures": "0xxxx"
        };
        BTFetch('/asset/QueryByID','post',param)
            .then(res=>{
                if(res.code==0){
                    console.log(res.data.row)
                    if(res.data.row.length==1){
                        hashHistory.push({
                            pathname:'/assets/detail',
                            query:res.data.row[0]
                        })
                    }

                }else{
                    message.error(window.localeInfo["Header.FailedQuery"]);
                }
            })
            .catch(error=>{
                message.error(window.localeInfo["Header.FailedQuery"]);

            })
    }
    onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }
    async onDelete(data){
        // const data = [...this.state.data];
        console.log(data)
        let _block=await getBlockInfo();
        if(_block.code!=0){
            message.error('获取区块信息失败');
            return;
        }
        let block=_block.data;
        //获取生成data的参数
        let param={
            "code":"favoritemng",
            "action":"favoritepro",
            "args":{
                "user_name":getAccount().username,
                "session_id":getAccount().token,
                "op_type":"delete",
                "goods_type":data.goodsType,
                "goods_id":data.goodsId,
                "signature":"signatest"
            }
        };

        let _getDataBin=(await getDataInfo(param));
        if(_getDataBin.code!=0){
            // message.error('获取区块数据失败');
            message.error(window.localeInfo["Asset.FailedToGetTheBlockMessages"])
            return;
        }
        let favorite={
            "ref_block_num": block.ref_block_num,
            "ref_block_prefix": block.ref_block_prefix,
            "expiration": block.expiration,
            "scope": [
                getAccount().username
            ],
            "read_scope": [],
            "messages": [{
                "code": "favoritemng",
                "type": "favoritepro",
                "authorization": [],
                "data": _getDataBin.data.bin
            }],
            "signatures": []
        };
        BTFetch('/user/FavoriteMng','post',favorite)
            .then(res=>{
                if(res.code==1){
                    // message.success('移除收藏成功')
                    message.success(window.localeInfo["Asset.DeleteCollect"])

                }else{
                    // message.error('删除收藏失败')
                    message.error(window.localeInfo["Asset.FailedCollect"])
                }
                console.log(res)
            }).catch(error=>{
                console.log(error)
        });

    }
    componentDidMount(){
        if(!getAccount()){
           message.warning('查询失败');
           return;
        }
        let param={
            "userName": getAccount().username,
            "random": Math.ceil(Math.random()*100),
            "signatures": "0xxxx"
        }
        BTFetch('/user/QueryFavorite','post',param).then(res=>{
            if(res.code==1){
                let data=res.data;
                this.setState({
                    data:res.data.row
                })
                // console.log(data);
            }else{
                message.warning('暂无资产加入收藏')
            }
        }).catch(error=>{
            console.error(error)
        })
    }
    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return (
            <div className="container column">
                <div style={{width:"100%"}}>
                    <Table bordered  columns={columns} dataSource={this.state.data}
                    />
                </div>
               {/* <div>
                    <Button onClick={()=>this.clearShopping()} type="primary">结算</Button>
                </div>*/}
            </div>
        );
    }
}
