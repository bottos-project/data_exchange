/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
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
