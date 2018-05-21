import React, {PureComponent} from 'react'
import BTShopListCell from './subviews/BTShopListCell'
import {Popconfirm,Checkbox,Row,Col,Button,Table,message } from 'antd';
import BTFetch from '../../../utils/BTFetch'
import {getBlockInfo, getDataInfo} from "../../../utils/BTCommonApi";
// import {Popconfirm,Checkbox,Row,Col,Button,Table } from 'antd';
const CheckboxGroup = Checkbox.Group;
const data=[
    {
        title:'test1',
        price:10,
        fileName:'搞笑图片',
        fileSize:12,
        data:122,
        from:'32fsajlfjds'
    },
    {
        title:'test2',
        price:11,
        fileName:'搞笑图片',
        fileSize:12,
        data:122,
        from:'32fsajlfjds'
    },
    {
        title:'test3',
        price:12,
        fileName:'搞笑图片',
        fileSize:12,
        data:122,
        from:'32fsajlfjds'
    },
    {
        title:'test4',
        price:13,
        fileName:'搞笑图片',
        fileSize:12,
        data:122,
        from:'32fsajlfjds'
    }
]




export default class BTShopCart extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            data:[],
            data:"",
            title:"",
            price:"",
            fileName:"",
            fileSize:"",
            date:"",
            from:"",

        }
    };
    columns(data){
        // console.log(data)
        return [
            { title: 'title', dataIndex: 'goods_id', key: 'title' },
            { title: 'price', dataIndex: 'price', key: 'price' },
            { title: 'fileName', dataIndex: 'fileName', key: 'fileName' },
            { title: 'fileSize', dataIndex: 'fileSize', key: 'fileSize' },
            { title: 'date', dataIndex: 'date', key: 'date' },
            { title: 'From', dataIndex: 'username', key: 'from'},
            { title: 'Delete', dataIndex: 'goods_id', key:'x', render: (item,record) => {
                    return (
                        // this.state.dataSource.length > 1 ?
                        //     (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                            <a href="#">Delete</a>
                        </Popconfirm>
                        // ) : null
                    );
                },
            },

        ];
    }
    onSelectChange(selectedRowKeys){
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      }

    onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }
   /* onDelete(key){
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }*/
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
                "goods_type":"typetest",
                "goods_id":data,
                "signature":"signatest"
            }
        };

        let _getDataBin=(await getDataInfo(data));
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
        BTFetch('/user/FavoriteMng','post',favorite,{full_path:false,service:'service'})
            .then(res=>{
                console.log(res)
            });
       /* let blockData = {
            code: "favoritemng",
            action: "favoritepro",
            args: {
                user_name: "buyertest",
                session_id: "idtest",
                op_type: "delete",
                goods_type: "typetest",
                goods_id: "idtest3",
                signature: "signatest"
            }
        }
        let blockInfo = await getBlockInfo(blockData);
        blockData = await getDataInfo(blockData);
        BTFetch("/user/FavoriteMng",{
                ref_block_num: blockInfo.data.ref_block_num,
                ref_block_prefix: blockInfo.data.ref_block_prefix,
                expiration: blockInfo.data.expiration,
                scope: ["buyertest"],
                read_scope: [],
                messages: [{
                    code: "favoritemng",
                    type: "favoritepro",
                    authorization: [],
                    data: blockData.data.bin,
                }],
                signatures:[]

        },{
            service:'service'
            }).then(response=>response.json())
            .then(res=>{
                if(res.code==1) {
                    alert("successful");
                    this.setState({ data: data.filter(item => item.key !== key) });
                }else{
                    alert("failed")
                }
            }).catch(error=>{
            console.log(error)
        })*/
    }
    componentDidMount() {
        let param={
            userName: "buyertest",
            random: "fileName123",
            signatures: "0xxxx"
        }
        BTFetch("/user/QueryFavorite", "post",param,{service:'service',})
            .then(data=>{
                if(data.code==1){
                    this.setState({
                        data:JSON.parse(data.data)
                    });
                }else{
                    message.error('获取数据失败')
                }

        }).catch(error=>{
            console.log(error)
        })
    }
    clearShopping(){
        //结算数据

    }
    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        const { selectedRowKeys } = this.state;
        const rowSelection = {
        selectedRowKeys,
        onChange: (e)=>this.onSelectChange(e),
        hideDefaultSelections: true,
        type:"radio",  //单选

        onSelection: this.onSelection,
        };
        return (
            <div className="container column">
                <div style={{width:"90%"}}>
                    <Table rowSelection={rowSelection}  columns={columns} dataSource={data}
                    />
                </div>
                <div>
                    <Button onClick={()=>this.clearShopping()} type="primary">结算</Button>
                </div>
            </div>
        );
    }
}
