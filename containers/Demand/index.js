// 需求列表页

import React,{PureComponent} from 'react'
import './styles.less'

import BTDemandCell from './subviews/DemandCell'
import BTMyTag from '../../components/BTMyTag'

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
) 

export default class BTDemand extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <BTHeaderSearch/>

               <div style={{marginTop:20}}>
                    <ul>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>
                        <li><BTDemandCell linkto="/demand/detail"/></li>k
                    </ul>
               </div>
            </div>
        )
    }
}