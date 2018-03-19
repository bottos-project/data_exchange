import React,{PureComponent} from 'react'
import { Table, Icon,message} from 'antd';
import "./styles.less"
import BTFetch from '../../../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const PersonalAssetMessages = messages.PersonalAsset;

export default class BTHaveBought extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
    }
    columns(data){
        console.log(data);
        return [
            { title: <FormattedMessage {...PersonalAssetMessages.AssetName}/>, dataIndex: 'asset_name', key: 'title' },
            { title: <FormattedMessage {...PersonalAssetMessages.AssetType}/>, dataIndex: 'price', key: 'price',render:(price)=>
                    <div>
                        <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
                        <span>{price}</span>
                    </div>
            },
           /* { title: 'fileName', dataIndex: 'fileName', key: 'fileName' },
            { title: 'fileSize', dataIndex: 'fileSize', key: 'fileSize' },*/
            { title: <FormattedMessage {...PersonalAssetMessages.AssetDescription}/>, dataIndex: 'description', key: 'description', render:(item)=>{
                return <span>{item.length <= 10 ? item : item.substring(0,10)+'...'}</span>
                }},
            { title: <FormattedMessage {...PersonalAssetMessages.UploadTime}/>, dataIndex: 'date', key: 'date' },
            { title: <FormattedMessage {...PersonalAssetMessages.AssetOperation}/>, dataIndex: 'storage_path', key: 'x', render: (item) =>
                    <a href={item}>
                        <Icon type="download" style={{color:"black",fontWeight:900}}/>
                    </a>
            },
            /*{ title: 'From', dataIndex: '', key: 'y', render:() =>
                    <div>
                        <a href="#" style={{color:"#6d6df5"}}>Jack</a>
                    </div>
            }*/
        ];
    }
    componentDidMount(){
        let param={
            userName:JSON.parse(window.localStorage.account_info).username||'',
            random:Math.ceil(Math.random()*100),
            signatures:'0XXXX'
        }
        BTFetch('/asset/GetUserPurchaseAssetList','post',param).then(res=>{
            if(res.code==0){
                if(res.data.rowCount==0){
                    message.warning('暂无购买资产');
                    return;
                }
                this.setState({
                    data:res.data.row,
                })
            }else{
                message.error('查询已购买资产失败');
            }
        }).catch(error=>{
            message.error('查询已购买资产失败');
        });
    }
    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(
            <Table
                className="shadow radius table"
                columns={columns}
                bordered
                style={{width:"100%"}}
                dataSource={this.state.data}
            />
        )
    }
}