import React,{PureComponent} from 'react'
import BlockList from './blockList'
import BTFetch from "../../../utils/BTFetch";
import {Table} from 'antd'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const BlockBrowsingMessages = messages.BlockBrowsing;
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
            { title: <FormattedMessage {...BlockBrowsingMessages.BlockNumber}/>, dataIndex: 'block_id', key: 'title',render:(data)=>{
                return <span>{data.substring(0,16)+'...'}</span>
                } },
            { title: <FormattedMessage {...BlockBrowsingMessages.Date}/>, dataIndex: 'timestamp', key: 'date',render:(date)=>{
                return <span>{date.split(' ')[0]}</span>
                }},
            { title: <FormattedMessage {...BlockBrowsingMessages.Transaction}/>, dataIndex: 'transaction_merkle_root', key: 'looker',render:(data)=>{
                    return <span>{data.substring(0,16)+'...'}</span>
                }},
            { title: <FormattedMessage {...BlockBrowsingMessages.Producer}/>,dataIndex: 'producer',key: 'x'},
        ];
    }
    componentDidMount() {
        let param={
            // pageSize:1,
            pageNum:15
        };
        BTFetch('/dashboard/GetBlockList', 'POST',param).then(res => {
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
                        <h3>
                            <FormattedMessage {...BlockBrowsingMessages.Block}/>
                        </h3>
                        {/*<a >查看所有&lt;</a>*/}
                    </div>
                    <Table bordered pagination columns={columns} dataSource={this.state.data}
                    />
                {/*</div>*/}
            </div>
        )
    }
}