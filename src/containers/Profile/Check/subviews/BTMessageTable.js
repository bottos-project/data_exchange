import React,{PureComponent} from 'react'
import { Table, Icon } from 'antd'


const columns = [
    { title: 'asset_id', dataIndex: 'asset_id', key: 'asset_id'},
    { title: 'consumer', dataIndex: 'consumer', key:'consumer' },
    { title: 'data_presale_id', dataIndex: 'data_presale_id', key:'data_presale_id' },
    { title: 'data_req_id', dataIndex: 'data_req_id', key:'data_req_id' },
    { title: 'user_name', dataIndex: 'user_name', key:'user_name' },
];



export default class BTMessageTable extends PureComponent{
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
            if(data.code == 1){
                const theSureData = JSON.parse(data.data);
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
            }else{
                console.log("no data")
            }

        }).catch(error=>{
            console.log(error)
        })
    }
    render(){
        const data  = this.state.data;
        return(
            <div>
                <h3 style={{padding:20,color:"#666666"}}>我的消息</h3>
                <Table
                    className="shadow radius table"
                    bordered
                    columns={columns}
                    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={data}
                />
            </div>
        )
    }
}





