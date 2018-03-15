// 需求列表页

import React,{PureComponent} from 'react'
import './styles.less'
import BTDemandCell from './subviews/DemandCell'
import BTMyTag from '../../components/BTMyTag'
import BTRequireCell from './subviews/BTRequireCell'
import {getAccount} from '../../tools/localStore'
import BTFetch from '../../utils/BTFetch';
import {List,message} from 'antd'
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

export default class BTDemand extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            dataSource:[]
        }
    }

    componentDidMount(){
        let reqUrl = '/requirement/query'
        let param={
            "pageSize":20,
            "pageNum":1,
        }
        BTFetch(reqUrl,'POST',param).then(response=>{
            console.log({
                response
            })
            if(response && response.code=='0'){
                if(response.data=='null'){
                    message.warning('暂无市场需求');
                    return;
                }
                let dataSource  = response.data && response.data.Row;
                this.setState({
                    dataSource:dataSource
                })
            }
        })
    }

    render(){
        return(
            <div className='container column'>
                <BTDemandTitle/>
                {/* <div><BTHeaderSearch/></div> */}
               <div className='container' >
                    <List
                        style={{flex:1}}
                        dataSource={this.state.dataSource||[]}
                        renderItem={(item)=>(
                            <BTRequireCell linkto='/demand/detail' {...item}/>
                        )}
                    />
               </div> 
            </div>
        )
    }
}