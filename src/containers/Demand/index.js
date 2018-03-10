// 需求列表页

import React,{PureComponent} from 'react'
import './styles.less'
import BTDemandCell from './subviews/DemandCell'
import BTMyTag from '../../components/BTMyTag'
import BTRequireCell from './subviews/BTRequireCell'
import {getAccount} from '../../tools/localStore'
import BTFetch from '../../utils/BTFetch';
import {List} from 'antd'

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

        BTFetch(reqUrl,'POST').then(response=>{
            console.log({
                response
            })
            if(response && response.code=='0'){
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
                <div><BTHeaderSearch/></div>
                {/*功能筛选*/}
               <div className='container' style={{marginTop:20}}>
                    <List
                        style={{flex:1}}
                        dataSource={this.state.dataSource}
                        renderItem={(item)=>(
                            <BTRequireCell linkto='/demand/detail' {...item}/>
                        )}
                    />
               </div> 
            </div>
        )
    }
}