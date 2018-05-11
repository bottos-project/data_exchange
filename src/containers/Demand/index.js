// 需求列表页

import React,{PureComponent} from 'react'
import BTRequireCell from './subviews/BTRequireCell'
import {getAccount} from '../../tools/localStore'
import BTFetch from '../../utils/BTFetch';
import {List,message,Pagination} from 'antd'
import CustomTabBar from '@/components/CustomTabBar'

const keyMap = ['All', 'Text', 'Picture', 'Voice', 'Video']

function onChange(pageNumber){
    console.log(pageNumber)
}
export default class BTDemand extends PureComponent{
    constructor(props){
        super(props);

        this.state = {
            dataSource:[],
            pageNum:'',
            rowCount: 0,
            activeKey: '0',
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        this.getPagination(1, 16)
    }
    onChange(page,pageSize){
        this.getPagination(page,pageSize)
    }
    getPagination(page,pageSize){
        let reqUrl = '/requirement/query'
        let param={
            "pageSize":pageSize,
            "pageNum":page,
        }
        BTFetch(reqUrl,'POST',param).then(response=>{
            if(response && response.code == 0){
              const {rowCount, row} = response.data
                if(rowCount == 0 || !Array.isArray(row)){
                    // message.warning(window.localeInfo["Demand.ThereIsNoMarketDemandForTheTimeBeing"]);
                    return;
                }
                this.setState({
                    dataSource: row,
                    rowCount,
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
            renderItem={(item)=>(
              <List.Item>
                <BTRequireCell linkto='/demand/detail' {...item}/>
              </List.Item>
            )}
          />
          <Pagination
            hideOnSinglePage
            showQuickJumper
            defaultCurrent={1}
            pageSize={16}
            total={this.state.rowCount}
            onChange={this.onChange}
          />
        </div>
      )
    }
}
