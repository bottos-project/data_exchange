import React,{PureComponent} from 'react'
import { Table, Icon } from 'antd'
import "./style.less"
import BTFetch from "../../../utils/BTFetch";
import BTUnlogin from '../../../components/BTUnlogin'
import {isLogin} from '../../../tools/localStore'
import BTTable from '../../../components/BTTable'


const columns = [
    { title: 'asset_id', dataIndex: 'asset_id', key: 'asset_id'},
    { title: 'consumer', dataIndex: 'consumer', key:'consumer' },
    { title: 'data_presale_id', dataIndex: 'data_presale_id', key:'data_presale_id' },
    { title: 'data_req_id', dataIndex: 'data_req_id', key:'data_req_id' },
    { title: 'user_name', dataIndex: 'user_name', key:'user_name' },
];



export default class BTCheck extends PureComponent{
    constructor(props){
        super(props)
        const data = [];
        this.state={
            asset_id:"",
            consumer:"",
            data_presale_id:"",
            data_req_id:"",
            data,
        }
    }

    componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','text/plain');
        fetch("http://10.104.21.10:8080/v2/user/QueryNotice",{
            method:"post",
            header:myHeaders,
            body:JSON.stringify({
                userName: "nametest",
                random: "fileName123",
                signatures: "0xxxx"
            })
        }).then(response=>response.json()).then(data=>{

            const theSureData = JSON.parse(data.data);
            console.log(theSureData);
            console.log(theSureData[0].asset_id)
            var newdata = [];
            for(let i=0;i<theSureData.length;i++){
                newdata.push({
                    key: i,
                    asset_id:theSureData[i].asset_id,
                    consumer:theSureData[i].consumer,
                    data_presale_id:theSureData[i].data_presale_id,
                    data_req_id:theSureData[i].data_presale_id,
                    user_name:theSureData[i].user_name
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
        const data  = this.state.data;
        return(
            <div style={{width:"90%",height:"100%"}}>
                <Table
                    bordered
                    columns={columns}
                    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={data}
                />
            </div>
        )
    }
}





