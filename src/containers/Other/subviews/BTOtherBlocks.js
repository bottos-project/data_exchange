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
            row_count:'',
            newblock:'',
        }
        this.onChange=this.onChange.bind(this)
    }
    columns (data){
        return [
            { title: <FormattedMessage {...BlockBrowsingMessages.BlockNumber}/>, dataIndex: 'block_number'},
            { title: <FormattedMessage {...BlockBrowsingMessages.Date}/>, dataIndex: 'timestamp',
              render: (date) => <span>{getDateAndTime(date)}</span>
            },
            { title: <FormattedMessage {...BlockBrowsingMessages.Transaction}/>, dataIndex: 'tx_num',
              render: (data) => <span>{data}</span>
            },
            { title: <FormattedMessage {...BlockBrowsingMessages.Producer}/>,dataIndex: 'delegate'},
        ];
    }
    componentDidMount() {
        this.getPagination(1,10).then(res => {
          // console.log('res', res);
          this.props.updateLatestBlock(res)
        })
    }

    getPagination(page,page_size){
        let param={
            page_size,
            page_num:page
        };
        return BTFetch('/dashboard/GetBlockList', 'POST', param).then(res => {
            if (res && res.code == 1) {
                if (res.data.row_count > 0) {
                    let data = res.data.row;

                    this.setState({
                        data,
                        row_count: res.data.row_count
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
        total:this.state.row_count,
        defaultCurrent:1,
        pageSize:10,
        showQuickJumper:true,
        onChange:this.onChange
      }
      return pagination
    }

    onChange(page, page_sdize) {
      this.getPagination(page, page_sdize);

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
            rowKey='block_hash'
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
