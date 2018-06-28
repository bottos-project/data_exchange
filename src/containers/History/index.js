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
import { Table } from 'antd';
import { BTRowFetch } from "@/utils/BTCommonApi";
import {FormattedMessage} from 'react-intl'
import { getDateAndTime } from '@/utils/dateTimeFormat'
import TokenSymbol from '@/components/TokenSymbol'
import './style.less'
import messages from '../../locales/messages'
const HistoryMessages = messages.History;


const columns = [
  { title: <FormattedMessage {...HistoryMessages.TransactionID} />, dataIndex: 'transaction_id',
    render: (item) => {
      return <span style={{maxWidth:124}} className='one_txt_cut'>{item.slice(0, 15)+'...'}</span>
  }},
  { title: <FormattedMessage {...HistoryMessages.Merchandise} />, dataIndex: 'asset_name'},
  { title: <FormattedMessage {...HistoryMessages.Price} />, dataIndex: 'price',
    render: (price, record) => <div className=''>
      <TokenSymbol type={record.token_type} />
      <span>{price/Math.pow(10, 8)}</span>
    </div>,
    align: 'left'
  },
  { title: <FormattedMessage {...HistoryMessages.From} />, dataIndex: 'from'},
  { title: <FormattedMessage {...HistoryMessages.To} />, dataIndex: 'to'},
  { title: <FormattedMessage {...HistoryMessages.Date} />, dataIndex: 'timestamp',
    render: getDateAndTime
  },
  { title: <FormattedMessage {...HistoryMessages.Block}/>, dataIndex: 'block_number'},
]

class BTDashboard extends PureComponent{
  constructor(props){
      super(props);
      this.state={
        dataSource: [],
        total: 0
      }
      this.onChange=this.onChange.bind(this)
  }

  componentDidMount(){
      this.getPagination(1, this.props.pageSize);
  }

  onChange(page, pageSize) {
      this.getPagination(page, pageSize);
  }

  pagination(){
      let pagination={
          total: this.state.total,
          defaultCurrent:1,
          pageSize: this.props.pageSize,
          showQuickJumper:true,
          onChange:this.onChange
      }
      return pagination
  }

  getPagination(page, pageSize){
      let param={
        page_num: page,
        page_size: pageSize,
      }

      BTRowFetch('/dashboard/GetTxList', param)
      .catch(err => {
        console.error(err);
      })
      .then(res => {
        this.setState({
            dataSource: res.row,
            total: res.total
        })
      })
  }

  render() {
      return(
        <div className="container column">
          <Table pagination={this.pagination()}
            className="shadow radius table"
            columns={columns}
            dataSource={this.state.dataSource}
            size="middle"
            rowKey='transaction_id'
            pagination={{
              hideOnSinglePage: true,
              showQuickJumper: this.state.total / this.props.pageSize > 10,
              pageSize: this.props.pageSize,
              total: this.state.total,
              onChange: this.onChange
            }}

          />
        </div>
      )
  }

}

BTDashboard.defaultProps = {
  pageSize: 12
};

export default BTDashboard
