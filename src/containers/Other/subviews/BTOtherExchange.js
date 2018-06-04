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
import BTFetch from "../../../utils/BTFetch";
import {Table,message} from 'antd'
import {FormattedMessage} from 'react-intl'
import { getDateAndTime } from '@/utils/dateTimeFormat'

import messages from '../../../locales/messages'
const BlockBrowsingMessages = messages.BlockBrowsing;
export default class BTOtherExchange extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            data:[],
            rowCount:''
        }
        this.onChange=this.onChange.bind(this)
    }
    columns (data){
        return [
            { title: <FormattedMessage {...BlockBrowsingMessages.TransactionID}/>, dataIndex: 'transaction_id', key: 'title' ,
              render: (data) => <span title={data}>{data.substring(0, 18)+'...'}</span>
            },
            { title: <FormattedMessage {...BlockBrowsingMessages.Date}/>, dataIndex: 'timestamp',
              render: getDateAndTime
            },
            { title: <FormattedMessage {...BlockBrowsingMessages.From}/>, dataIndex: 'from', key: 'from'},
            { title: <FormattedMessage {...BlockBrowsingMessages.To}/>, dataIndex: 'to', key: 'to'},
            { title: <FormattedMessage {...BlockBrowsingMessages.Price}/>, dataIndex: 'price', key: 'price',
              render: (price) => <span>{price/Math.pow(10, 8)}</span>
            },

        ];
    }

    componentDidMount() {
      this.getPagination(1,10)
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

    getPagination(page,pageSize) {
        let param = {
            pageSize: pageSize,
            page_num: page
        };
        BTFetch('/dashboard/GetTxList','POST',param).then(res=>{
          if (res.code == 1) {
            let data=res.data.row;
            this.setState({
              data,
              rowCount:res.data.rowCount,
            })
          }
        }).catch(error=>{
          window.message.success(window.localeInfo["BlockBrowsing.SuccessfulPromote"])
        })
    }

    onChange(page, pageSize) {
        console.log(page,pageSize)
        this.getPagination(page, pageSize)
    }

    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(
            <div className="BTOtherExchange">
              <Table
                pagination={this.pagination()}
                columns={columns}
                dataSource={this.state.data}
                rowKey='transaction_id'
              />
            </div>
        )
    }
}
