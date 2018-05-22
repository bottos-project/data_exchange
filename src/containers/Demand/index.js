// 需求列表页

import React,{PureComponent} from 'react'
import BTRequireCell from './subviews/BTRequireCell'
import {getAccount} from '../../tools/localStore'
import BTFetch from '../../utils/BTFetch';
import {List,message,Pagination} from 'antd'
import CustomTabBar from '@/components/CustomTabBar'

const keyMap = ['All', 'Text', 'Picture', 'Voice', 'Video']

export default class BTDemand extends PureComponent{
    constructor(props){
        super(props);

        this.state = {
            dataSource:[{
              username: 'aaaa',
              requirement_id: '1',
              requirement_name: 'adf',
              expire_time: 1526874874,
              price: 120000000000,
            }],
            pageNum:'',
            row_count: 0,
            activeKey: '0',
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        this.getPagination(1, 16)
    }
    onChange(page,page_size){
        this.getPagination(page,page_size)
    }
    getPagination(page,page_size){
        let reqUrl = '/requirement/query'
        let param={
            page_size,
            "page_num":page,
        }
        BTFetch(reqUrl,'POST',param).then(response=>{
            if(response && response.code == 0){
              const {row_count, row} = response.data
                if(row_count == 0 || !Array.isArray(row)){
                    // message.warning(window.localeInfo["Demand.ThereIsNoMarketDemandForTheTimeBeing"]);
                    return;
                }
                this.setState({
                    dataSource: row,
                    row_count,
                })
            }
        })
    }

    handleChange = (activeKey) => {
      this.setState({ activeKey });
    }

    render(){
      if ( React.isValidElement(this.props.children) ) {
        return this.props.children
      }

      return (
        <div className='container column'>
          <CustomTabBar onChange={this.handleChange} keyMap={keyMap} activeKey={this.state.activeKey} />
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
