import React,{PureComponent} from 'react'
import BTListCell from './BTListCell' 
import {Icon,Checkbox,Row,Col,message,Table,Button,Popconfirm} from 'antd'
import BTFetch from '../utils/BTFetch'
import {getBlockInfo,getDataInfo} from '../utils/BTCommonApi'
import {hashHistory} from 'react-router'

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
            data:[]
        }
    }
    columns (data){
          return [
            { title: 'goods_id', dataIndex: 'goods_id', key: 'title' },
            /*{ title: 'price', dataIndex: 'price', key: 'price' },
            { title: 'fileName', dataIndex: 'fileName', key: 'fileName' },
            { title: 'fileSize', dataIndex: 'fileSize', key: 'fileSize' },
            { title: 'date', dataIndex: 'date', key: 'date' },*/
            { title: 'From', dataIndex: 'username', key: 'from'},
            { title: 'Delete', key:'x', render: (item) => {
                    return (
                        // this.state.dataSource.length > 1 ?
                        //     (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(item)}>
                            <a href="#">Delete</a>
                        </Popconfirm>
                        // ) : null
                    );
                },
            },
             { title: '查看详情', dataIndex: 'goods_id', key: 'looker',render:(item)=>{
                 return <Button onClick={()=>this.lookfor(item)}>查看</Button>
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
                if(res.code==1){
                    console.log(JSON.parse(res.data))
                    let data=JSON.parse(res.data);
                    hashHistory.push({
                        pathname:'/assets/detail',
                        query:data
                    })
                }else{
                    message.error('查询失败')
                }
            })
            .catch(error=>{
                message.error('查询失败')

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
                "user_name":"btd121",
                "session_id":"idtest",
                "op_type":"delete",
                "goods_type":data.goods_type,
                "goods_id":data.goods_id,
                "signature":"signatest"
            }
        };

        let _getDataBin=(await getDataInfo(param));
        if(_getDataBin.code!=0){
            message.error('获取区块数据失败');
            return;
        }
        let favorite={
            "ref_block_num": block.ref_block_num,
            "ref_block_prefix": block.ref_block_prefix,
            "expiration": block.expiration,
            "scope": ["buyertest"],
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
                    message.error('移除收藏成功')

                }else{
                    message.error('删除收藏失败')
                }
                console.log(res)
            });

    }
    componentDidMount(){
        let param={
            "userName": "btd121",
            "random": Math.ceil(Math.random()*100),
            "signatures": "0xxxx"
        }
        BTFetch('/user/QueryFavorite','post',param).then(res=>{
            if(res.code==1){
                let data=JSON.parse(res.data);
                this.setState({
                    data
                })
                console.log(data);
            }else{
                message.warning('暂无资产加入购物车')
            }
        })
    }
    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        // const { selectedRowKeys } = this.state;
        /*const rowSelection = {
            selectedRowKeys,
            onChange: (e)=>this.onSelectChange(e),
            hideDefaultSelections: true,
            type:"radio",  //单选

            onSelection: this.onSelection,
        };*/
        return (
            <div className="container column">
                <div style={{width:"100%"}}>
                    <Table bordered  columns={columns} dataSource={data}
                    />
                </div>
               {/* <div>
                    <Button onClick={()=>this.clearShopping()} type="primary">结算</Button>
                </div>*/}
            </div>
        );
    }
}