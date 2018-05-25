// 需求列表页

import React,{PureComponent} from 'react'
import BTRequireCell from './subviews/BTRequireCell'
import {getAccount} from '../../tools/localStore'
import BTFetch from '../../utils/BTFetch';
import {List,message,Pagination} from 'antd'
import CustomTabBar from '@/components/CustomTabBar'
import { arTypeKeyMap } from '@/utils/keyMaps.js'


export default class BTDemand extends PureComponent{
    constructor(props){
        super(props);

        this.state = {
            dataSource:[],
            pageNum:'',
            row_count: 0,
            activeKey: '0',
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        this.getPagination(1, 16)
    }
    onChange(page, page_size){
        this.getPagination(page, page_size, activeKey)
    }
    getPagination(page, page_size, req_type = 0) {
        let reqUrl = '/requirement/query'
        let param={
            page_size,
            "page_num":page,
            req_type: Number.parseInt(req_type)
        }
        BTFetch(reqUrl,'POST',param).then(response=>{
            if(response && response.code == 1){
              const {row_count, row} = response.data
              console.log('response.data', response.data);
                if(row_count == 0 || !Array.isArray(row)){
                    // message.warning(window.localeInfo["Demand.ThereIsNoMarketDemandForTheTimeBeing"]);
                    return;
                }
                console.log('response.data', response.data);
                this.setState({
                    dataSource: row,
                    row_count,
                })
            }
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
            dataSource={this.state.dataSource||[]}
            renderItem={(item)=> (
              <List.Item>
                <BTRequireCell linkto='/demand/detail' {...item}/>
              </List.Item>
            )}
          />
          {
            this.state.row_count > 0 ?
            <Pagination
              hideOnSinglePage
              showQuickJumper
              defaultCurrent={1}
              pageSize={16}
              total={this.state.row_count}
              onChange={this.onChange}
            /> :
            null
          }
        </div>
      )
    }
}
