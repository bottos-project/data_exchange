import React,{PureComponent} from 'react'
import { Table, Icon,message,Button } from 'antd'
import BTFetch from "../../../../utils/BTFetch";
import {hashHistory} from 'react-router'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const CheckMessages = messages.Check;




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
            { title: <FormattedMessage {...CheckMessages.AssetID}/>, dataIndex: 'asset_id', key: 'asset_id'},
            { title: <FormattedMessage {...CheckMessages.Consumer}/>, dataIndex: 'consumer', key:'consumer' },
            { title: <FormattedMessage {...CheckMessages.DataPresaleId}/>, dataIndex: 'data_presale_id', key:'data_presale_id' },
            { title: <FormattedMessage {...CheckMessages.DataReqId}/>, dataIndex: 'data_req_id', key:'data_req_id' },
            { title: <FormattedMessage {...CheckMessages.UserName}/>, dataIndex: 'username', key:'user_name' },
            { title: <FormattedMessage {...CheckMessages.View}/>,dataIndex:'asset_id',key:'x',render:(item)=>
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
                if(res.code==0){
                    if(res.data.rowCount==0){
                        message.warning('暂无数据');
                        return;
                    }
                    let data=res.data.row;
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
            userName: JSON.parse(window.localStorage.account_info).username||'',
            random: Math.ceil(Math.random()*100),
            signatures: "0xxxx"
        };
        console.log(window.uuid);
        BTFetch("/user/QueryNotice","post",param,{service:'service'})
            .then(res=>{
                if(res.code==0){
                    if(res.data.rowCount==0){
                        message.warning('暂无个人消息');
                        return;
                    }
                    this.setState({
                        data:res.data.row,
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
                <h3 style={{padding:20,color:"#666666"}}>
                    <FormattedMessage {...CheckMessages.MyMessages}/>
                </h3>
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





