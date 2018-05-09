import React,{PureComponent} from 'react'
import { Table, Icon,message,Button } from 'antd'
import BTFetch from "../../../../utils/BTFetch";
import {hashHistory} from 'react-router'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";

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
            username:getAccount().username||'',
            token:getAccount().token||''
        }
    }
    columns (data){
        return  [
            { title: <FormattedMessage {...CheckMessages.AssetID}/>, dataIndex: 'asset_name', key: 'asset_id',render:(item)=>{
                    return <span>{item.length<25?item:item.substring(0,25)+'...'}</span>
                }},
            { title: <FormattedMessage {...CheckMessages.Consumer}/>, dataIndex: 'consumer', key:'consumer' },
            { title: <FormattedMessage {...CheckMessages.DataPresaleId}/>, dataIndex: 'data_req_name', key:'data_req_name',
                render:(item)=>{
                    return <span>{item.length<25?item:item.substring(0,25)+'...'}</span>
                }},
            { title: <FormattedMessage {...CheckMessages.DataTime}/>, dataIndex: 'createTime', key:'data_req_id' },
            // { title: <FormattedMessage {...CheckMessages.UserName}/>, dataIndex: 'username', key:'user_name' },
            { title: <FormattedMessage {...CheckMessages.View}/>,dataIndex:'asset_id',key:'x',render:(item)=>
                    <Button onClick={()=>this.lookfor(item)}>
                        <FormattedMessage {...CheckMessages.View}/>
                    </Button>
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
                        message.warning(window.localeInfo["Check.ThereIsNoDataForTheTimeBeing"])
                        return;
                    }
                    let data=res.data.row;
                    if(data.length==1){
                        hashHistory.push({
                            pathname:'/assets/detail',
                            query:data[0]
                        })
                    }

                }else{
                    message.error(window.localeInfo["Check.QueryFailure"])
                }
            })
            .catch(error=>{
                message.error(window.localeInfo["Check.QueryFailure"])

            })
    }
    componentDidMount() {
        /*if(getAccount()){
            this.setState({
                username:getAccount().username,
                token:getAccount().token,
            })
        }*/
        let param={
            userName: this.state.username,
            random: Math.ceil(Math.random()*100),
            signatures: "0xxxx"
        };
        console.log(window.uuid);
        BTFetch("/user/QueryNotice","post",param,{service:'service'})
            .then(res=>{
                if(res.code==0){
                    if(res.data.rowCount==0){
                        // message.warning(window.localeInfo["Check.ThereIsNoPersonalMessageForTheTimeBeing"])
                        return;
                    }
                    this.setState({
                        data:res.data.row,
                    })
                }else{
                    message.warning(window.localeInfo["Check.ThereIsNoPersonalMessageForTheTimeBeing"])
                }
            }).catch(error=>{
            console.log(error)
        })
    }
    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return (
            <Table
                className="shadow radius table"
                columns={columns}
                // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                dataSource={this.state.data}
            />
        )
    }
}
