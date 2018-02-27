// 需求列表页

import React,{PureComponent} from 'react'
import './styles.less'

import BTDemandCell from './subviews/DemandCell'
import BTMyTag from '../../components/BTMyTag'
import BTRequireCell from './subviews/BTRequireCell'
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
    }

    render(){
        return(
            <div>
                <BTHeaderSearch/>
                {/*功能筛选*/}
               <div style={{marginTop:20}}>
                    <ul>
                        <li><BTRequireCell linkto='/demand/detail'/></li>
                        <li><BTRequireCell linkto='/demand/detail'/></li>
                        <li><BTRequireCell linkto='/demand/detail'/></li>
                        <li><BTRequireCell linkto='/demand/detail'/></li>
                        <li><BTRequireCell linkto='/demand/detail'/></li>
                        <li><BTRequireCell linkto='/demand/detail'/></li>

                        {/*<li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>*/}
                    </ul>
               </div>
            </div>
        )
    }
}