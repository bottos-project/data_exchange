// 需求列表页

import React,{PureComponent} from 'react'
import BTDemandCell from './subviews/DemandCell'
import BTMyTag from '../../components/BTMyTag'
import BTRequireCell from './subviews/BTRequireCell'
import {getAccount} from '../../tools/localStore'
import BTFetch from '../../utils/BTFetch';
import {List,message,Pagination} from 'antd'
import BTDemandTitle from "./subviews/BTDemandTitle";

const BTHeaderSearch = () => (
    <div className="searchViewStyle">
        <div>
            <BTMyTag>全部</BTMyTag>
            <BTMyTag>图像</BTMyTag>
            <BTMyTag>数据清洗</BTMyTag>

            <BTMyTag>全部</BTMyTag>
            <BTMyTag>视频</BTMyTag>
            <BTMyTag>音频</BTMyTag>
            <BTMyTag>图片</BTMyTag>
        </div>
        <div style={{marginTop:20}}>
            <BTMyTag>全部</BTMyTag>
            <BTMyTag>数据挖掘</BTMyTag>
            <BTMyTag>图像</BTMyTag>
            <BTMyTag>数据清洗</BTMyTag>

            <BTMyTag>全部</BTMyTag>
            <BTMyTag>视频</BTMyTag>
            <BTMyTag>音频</BTMyTag>
        </div>
    </div>
) ;
const BTOption=()=>{

};
function onChange(pageNumber){
    console.log(pageNumber)
}
export default class BTDemand extends PureComponent{
    constructor(props){
        super(props);

        this.state = {
            dataSource:[],
            pageNum:'',
            rowCount: 0
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        this.getPagination(1,12)
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
    render(){
        return(
            <div  style={{width:"100%"}}>
                <BTDemandTitle/>
                {/* <div><BTHeaderSearch/></div> */}
                <List
                    style={{flex:1}}
                    dataSource={this.state.dataSource||[]}
                    renderItem={(item)=>(
                        <BTRequireCell linkto='/demand/detail' {...item}/>
                    )}
                />
                <Pagination
                  hideOnSinglePage
                  showQuickJumper
                  defaultCurrent={1}
                  pageSize={12}
                  total={this.state.rowCount}
                  onChange={this.onChange}
                />
            </div>
        )
    }
}
