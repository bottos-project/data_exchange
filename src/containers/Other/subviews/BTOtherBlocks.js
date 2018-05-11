import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import { updateLatestBlock } from '@/redux/actions/blocksAction'
import BTFetch from "../../../utils/BTFetch";
import {Table} from 'antd'
import {FormattedMessage} from 'react-intl'
import { getDateAndTime } from '@/utils/dateTimeFormat'

import messages from '../../../locales/messages'
const BlockBrowsingMessages = messages.BlockBrowsing;

class BTOtherBlocks extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            block_view:[],
            data:[],
            rowCount:'',
            newblock:'',
        }
        this.onChange=this.onChange.bind(this)
    }
    columns (data){
        return [
            { title: <FormattedMessage {...BlockBrowsingMessages.BlockNumber}/>, dataIndex: 'block_num', key: 'title'/*,render:(data)=>{
                return <span>{data.substring(0,16)+'...'}</span>
                }*/ },
            { title: <FormattedMessage {...BlockBrowsingMessages.Date}/>, dataIndex: 'timestamp', key: 'date',
              render: (date) => <span>{getDateAndTime(date)}</span>
            },
            { title: <FormattedMessage {...BlockBrowsingMessages.Transaction}/>, dataIndex: 'transaction_merkle_root', key: 'looker',
              render: (data) => <span title={data}>{data.substring(0, 12)+'...'}</span>
            },
            { title: <FormattedMessage {...BlockBrowsingMessages.Producer}/>,dataIndex: 'producer',key: 'x'},
        ];
    }
    componentDidMount() {
        this.getPagination(1,10).then(res => {
          // console.log('res', res);
          this.props.updateLatestBlock(res)
        })
    }

    getPagination(page,pageSize){
        let param={
            pageSize:pageSize,
            pageNum:page
        };
        return BTFetch('/dashboard/GetBlockList', 'POST', param).then(res => {
            if (res && res.code == 1) {
                if (res.data.rowCount > 0) {
                    let data = res.data.row;

                    this.setState({
                        data,
                        rowCount: res.data.rowCount
                    });

                    return data[0]
                    // if(data==null)
                    //     return;
                     // newBlockOne=res.data.row[0].block_num||'';
                }
            }
        });
    }

    pagination(){
      let pagination={
        total:this.state.rowCount,
        defaultCurrent:1,
        pageSize:10,
        showQuickJumper:true,
        onChange:this.onChange
      }
      return pagination
    }

    onChange(page, pageSize) {
      this.getPagination(page, pageSize);

    }

    render(){
      const { data } = this.state;
      const columns = this.columns(data);

      return (
        <div className="OtherBlocksMessage">
          <Table
            pagination={this.pagination()}
            columns={columns}
            dataSource={this.state.data}
            rowKey='block_id'
          />
          {/*</div>*/}
        </div>
      )
    }
}


function mapDispatchToProps(dispatch) {
  return {
    updateLatestBlock(block) {
      dispatch(updateLatestBlock(block))
    }
  }
}

export default connect(null, mapDispatchToProps)(BTOtherBlocks)
