import React,{PureComponent} from 'react'
import BlockList from './blockList'
import BTFetch from "../../../utils/BTFetch";
import {Table} from 'antd'
export default class BTOtherBlocks extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            block_view:[],
            data:[],
        }
    }
    columns (data){
        return [
            { title: '区块号', dataIndex: 'block_id', key: 'title',render:(data)=>{
                return <span>{data.substring(0,20)+'...'}</span>
                } },
            { title: '时间', dataIndex: 'timestamp', key: 'date',render:(date)=>{
                return <span>{date.split(' ')[0]}</span>
                }},
            { title: '交易', dataIndex: 'transaction_merkle_root', key: 'looker',render:(data)=>{
                    return <span>{data.substring(0,20)+'...'}</span>
                }},
            { title: '生产者',dataIndex: 'producer',key: 'x'},
        ];
    }
    componentDidMount() {
        let param={
            // pageSize:1,
            pageNum:15
        };
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetBlockList', 'POST',param,{full_path:true}).then(res => {
            if (res.code == 1) {
                let data=res.data.row;
                this.setState({
                    data,
                });
                console.log(res);
            }
        });
    }

    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(
            <div className="OtherBlocksMessage">
                {/*<div style={{width:"100%"}}>*/}
                    <div className="blockView">
                        <h3>区块</h3>
                        {/*<a >查看所有&lt;</a>*/}
                    </div>
                    <Table bordered pagination columns={columns} dataSource={this.state.data}
                    />
                {/*</div>*/}
            </div>
        )
    }
}