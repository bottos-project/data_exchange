import React,{PureComponent} from 'react'
import { Table, Icon,message,Button } from 'antd'
import BTFetch from "../../../../utils/BTFetch";
import {hashHistory} from 'react-router'

export default class BTMessageTable extends PureComponent{
    constructor(props){
        super(props)
        const data = [];
        this.state={
            asset_id:"",
            consumer:"",
            data_presale_id:"",
            data_req_id:"",
            data:[],
            linkto:'',
        }
    }
    columns (data){
        return  [
            { title: 'asset_id', dataIndex: 'asset_id', key: 'asset_id'},
            { title: 'consumer', dataIndex: 'consumer', key:'consumer' },
            { title: 'data_presale_id', dataIndex: 'data_presale_id', key:'data_presale_id' },
            { title: 'data_req_id', dataIndex: 'data_req_id', key:'data_req_id' },
            { title: 'user_name', dataIndex: 'user_name', key:'user_name' },
            { title: '查看',dataIndex:'asset_id',key:'x',render:(item)=>
                    <Button onClick={()=>this.lookfor(item)}>查看</Button>
            }
        ];
    }
    lookfor(item){
        let param={
            "assetID":item,
            "random": Math.ceil(Math.random()*100),
            "signatures": "0xxxx"
        };
        console.log(param);
        BTFetch('/asset/QueryByID','post',param)
            .then(res=>{
                if(res.code==1){
                    let data=JSON.parse(res.data);
                    if(Object.keys(data).length===0){
                        message.warning('暂无数据');
                        return;
                    }
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
    componentDidMount() {
        let param={
            userName: "btd121",
            random: Math.ceil(Math.random()*100),
            signatures: "0xxxx"
        };
        console.log(window.uuid);
        BTFetch("/user/QueryNotice","post",param,{service:'service'})
            .then(res=>{
                if(res.code==1){
                    if(res.data=='null'){
                        return;
                    }
                    this.setState({
                        data:JSON.parse(res.data),
                    })
                }else{
                    message.warning('暂无消息')
                }
            }).catch(error=>{
            console.log(error)
        })
    }
    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(
            <div>
                <h3 style={{padding:20,color:"#666666"}}>我的消息</h3>
                <Table
                    className="shadow radius table"
                    bordered
                    columns={columns}
                    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={this.state.data}
                />
            </div>
        )
    }
}





