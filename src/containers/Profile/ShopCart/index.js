import React, {PureComponent} from 'react'
import BTList from '../../../components/BTList'
import BTShopListCell from './subviews/BTShopListCell'
import BTFetch from"../../../utils/BTFetch"
import {Popconfirm,Checkbox,Row,Col,Button,Table } from 'antd';
import {getBlockInfo, getDataInfo} from "../../../utils/BTCommonApi";
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
            data:"",
            title:"",
            price:"",
            fileName:"",
            fileSize:"",
            date:"",
            from:"",

        }
    };
    columns(){
        return [
            { title: 'goods_id', dataIndex: 'goods_id', key: 'goods_id' },
            { title: 'goods_type', dataIndex: 'goods_type', key: 'goods_type' },
            { title: 'username', dataIndex: 'username', key: 'username' },
            { title: 'op_type', dataIndex: 'op_type', key: 'op_type' },
            { title: 'price', dataIndex: 'price', key: 'price' },
            { title: 'fileName', dataIndex: 'fileName', key: 'fileName' },
            { title: 'fileSize', dataIndex: 'fileSize', key: 'fileSize' },
            { title: 'date', dataIndex: 'date', key: 'date' },
            { title: 'From', dataIndex: 'from', key: 'from'},
            { title: 'Delete', dataIndex: 'delete',
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
    async onDelete(key){
        const data = [...this.state.data];
        let blockData = {
            code: "favoritemng",
            action: "favoritepro",
            args: {
                user_name: "buyertest",
                session_id: "idtest",
                op_type: "add",
                goods_type: "typetest",
                goods_id: "idtest3",
                signature: "signatest"
            }
        }
            let blockInfo = await getBlockInfo(blockData);
        blockData = await getDataInfo(blockData);
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','text/plain');
        fetch("http://10.104.21.10:8080/v2/user/FavoriteMng",{
            method:"post",
            header:myHeaders,
            body:JSON.stringify({
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
            })
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
        })
    }

    componentDidMount() {
        BTFetch("http://10.104.21.10:8080/v2/user/QueryFavorite", "post",
            {
                userName: "buyertest",
                random: "fileName123",
                signatures: "0xxxx"
            },{
                full_path:true,
        }).then(data=>{
            const theSureData = JSON.parse(data.data);
            var newdata = [];
            for(let i=0;i<theSureData.length;i++){
                newdata.push({
                    goods_id:theSureData[i].goods_id,
                    goods_type:theSureData[i].goods_type,
                    price:theSureData[i].price,
                    op_type:theSureData[i].op_type,
                    username:theSureData[i].username,
                    fileName:theSureData[i].fileName,
                    fileSize:theSureData[i].fileSize,
                    date:theSureData[i].date,
                    from:theSureData[i].from,
                })
            }

            this.setState({
                data:newdata
            })
        }).catch(error=>{
            console.log(error)
        })
    }
    render(){
        const data = this.state.data;
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
                    <Table bordered rowSelection={rowSelection}  columns={columns} dataSource={data}
                    />
                </div>
                <div>
                    <Button type="primary">结算</Button>
                </div>
            </div>
        );
    }
}



