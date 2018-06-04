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
// 需求列表页
import React,{PureComponent} from 'react'
import BTRequirementListItem from './subviews/BTRequirementListItem'
import {getAccount} from '../../tools/localStore'
import { List } from 'antd'
import CustomTabBar from '@/components/CustomTabBar'
import { arTypeKeyMap } from '@/utils/keyMaps.js'
import { BTRowFetch } from "@/utils/BTCommonApi";

export default class BTDemand extends PureComponent{
    constructor(props){
        super(props);

        this.state = {
            dataSource:[],
            total: 0,
            activeKey: '0',
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
      this.getPagination(1, 16)
    }

    onChange(page, page_size){
      this.getPagination(page, page_size, this.state.activeKey)
    }

    getPagination(page, page_size, req_type = 0) {
      let reqUrl = '/requirement/query'
      let param={
        "page_num":page,
        page_size,
        req_type: Number.parseInt(req_type)
      }
      console.log('page_size', page_size);
      BTRowFetch(reqUrl, param).then(res => {
        this.setState({
          dataSource: res.row,
          total: res.total,
        })
      }).catch(err => {
        console.error(err);
      })
    }

    handleChange = (activeKey) => {
      this.setState({ activeKey });
      this.getPagination(1, 16, activeKey)
    }

    render(){
      if ( React.isValidElement(this.props.children) ) {
        return this.props.children
      }

      return (
        <div className='container column'>
          <CustomTabBar onChange={this.handleChange} keyMap={arTypeKeyMap} activeKey={this.state.activeKey} />
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={this.state.dataSource}
            renderItem={(item)=> (
              <List.Item>
                <BTRequirementListItem linkto='/demand/detail' {...item}/>
              </List.Item>
            )}
            pagination={{
              hideOnSinglePage: true,
              showQuickJumper: this.state.total / 16 > 10,
              pageSize: 16,
              total: this.state.total,
              onChange: this.onChange
            }}
          />

        </div>
      )
    }
}
