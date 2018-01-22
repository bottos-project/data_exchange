import React,{PureComponent} from 'react'

import BTAssetCell from './subviews/AssetCell'
import {Pagination} from 'antd'

import BTMyTag from '../../components/BTMyTag'

const BTHeaderSearch = () => (
    <div className="searchViewStyle">
        <BTMyTag>全部</BTMyTag>
        <BTMyTag>图像</BTMyTag>
        <BTMyTag>数据清洗</BTMyTag>

        <BTMyTag>全部</BTMyTag>
        <BTMyTag>视频</BTMyTag>
        <BTMyTag>音频</BTMyTag>
        <BTMyTag>图片</BTMyTag>

        <div></div>
        <p></p>

        <BTMyTag>全部</BTMyTag>
        <BTMyTag>数据挖掘</BTMyTag>
        <BTMyTag>图像</BTMyTag>
        <BTMyTag>数据清洗</BTMyTag>

        <BTMyTag>全部</BTMyTag>
        <BTMyTag>视频</BTMyTag>
        <BTMyTag>音频</BTMyTag>
    </div>
) 

export default class BTAssets extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <BTHeaderSearch/>

                <div style={{marginTop:20}}>
                    <ul>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>
                        <li><BTAssetCell linkto="/assets/detail"/></li>

                    </ul>
                </div>

                <div style={{marginBottom:20}}>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        )
    }
}