import React,{PureComponent} from 'react'
import { Table, Icon,message} from 'antd';
import "./styles.less"
import BTFetch from '../../../../utils/BTFetch'

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
            { title: 'asset_name', dataIndex: 'asset_name', key: 'title' },
            { title: 'price', dataIndex: 'price', key: 'price',render:(price)=>
                    <div>
                        <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>
                        <span>{price}</span>
                    </div>
            },
           /* { title: 'fileName', dataIndex: 'fileName', key: 'fileName' },
            { title: 'fileSize', dataIndex: 'fileSize', key: 'fileSize' },*/
            { title: 'description', dataIndex: 'description', key: 'description', render:(item)=>{
                return <span>{item.length <= 10 ? item : item.substring(0,10)+'...'}</span>
                }},
            { title: 'date', dataIndex: 'date', key: 'date' },
            { title: 'Action', dataIndex: 'storage_path', key: 'x', render: (item) =>
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
            userName:'btd121',
            random:Math.ceil(Math.random()*100),
            signatures:'0XXXX'
        }
        BTFetch('/asset/GetUserPurchaseAssetList','post',param,{
            service:'service'
        }).then(res=>{
            if(res.code==1){
                console.log(res.data);
                if(res.data=='null'){
                   return;
                }
                this.setState({
                    data:JSON.parse(res.data),
                })
            }else{
                message.error('查询已购买资产失败');
            }
        }).catch(error=>{
            message.error('查询已购买资产失败');
        });
        console.log(this.state.data)
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