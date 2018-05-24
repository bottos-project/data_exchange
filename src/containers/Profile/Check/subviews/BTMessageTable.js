import React,{PureComponent} from 'react'
import { Table, Icon,message,Button } from 'antd'
import BTFetch from "../../../../utils/BTFetch";
import {hashHistory} from 'react-router'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";
import { getDateAndTime } from '@/utils/dateTimeFormat'
import {queryProtoEncode} from '@/lib/proto/index'
import * as BTCryptTool from 'bottos-js-crypto'

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
            { title: <FormattedMessage {...CheckMessages.DataTime}/>, dataIndex: 'createTime', key:'data_req_id',
              render: item => getDateAndTime(item)
            },
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
                    window.message.error(window.localeInfo["Check.QueryFailure"])
                }
            })
            .catch(error=>{
                window.message.error(window.localeInfo["Check.QueryFailure"])

            })
    }
    componentDidMount() {
        // console.log("BTMessageTable")
        // /*if(getAccount()){
        //     this.setState({
        //         username:getAccount().username,
        //         token:getAccount().token,
        //     })
        // }*/
        // let param={
        //     userName: this.state.username,
        //     random: Math.ceil(Math.random()*100),
        //     signatures: "0xxxx"
        // };
        // console.log(window.uuid);
        // BTFetch("/user/QueryNotice","post",param,{service:'service'})
        //     .then(res=>{
        //         if(res.code==0){
        //             if(res.data.rowCount==0){
        //                 // message.warning(window.localeInfo["Check.ThereIsNoPersonalMessageForTheTimeBeing"])
        //                 return;
        //             }
        //             this.setState({
        //                 data:res.data.row,
        //             })
        //         }else{
        //             message.warning(window.localeInfo["Check.ThereIsNoPersonalMessageForTheTimeBeing"])
        //         }
        //     }).catch(error=>{
        //     console.log(error)
        // })

        this.getMessages()
    }

    getMessages(){
        let localStorage = window.localStorage
        let account_info = JSON.parse(localStorage.account_info)
        let username = account_info.username
        let privateKeyStr = account_info.privateKey
        let sign = this.getSignature(username,privateKeyStr)
        let params = {
            "pageSize": 50,
            "pageNum": 1,
            "username": username,
            ...sign
        }

        let url = '/asset/queryMyNotice'
        BTFetch(url,'POST',params)
            .then(response=>{
                // console.log({response})
                if(response && response.code==1){
                    let data = response.data
                    if(Array.isArray(data.row)){
                        this.setState({data:data.row})
                    }else{
                        window.message.error(window.localeInfo["Check.ThereIsNoDataForTheTimeBeing"])
                    }
                }
            }).catch(error=>{
                window.message.error(window.localeInfo["Check.ThereIsNoDataForTheTimeBeing"])
            })
    }

    getSignature(username,privateKeyStr){
        let privateKey = Buffer.from(privateKeyStr,'hex')
        let random = window.uuid
        let msg = {username,random}
        let query_pb = require('../../../../lib/proto/query_pb')
        let loginProto = queryProtoEncode(query_pb,msg)
        let hash = BTCryptTool.sha256(BTCryptTool.buf2hex(loginProto))
        let signature = BTCryptTool.sign(hash,privateKey).toString('hex')
       return {signature,random}
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
