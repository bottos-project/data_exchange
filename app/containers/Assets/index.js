import React,{PureComponent} from 'react'

import BTAssetCell from './subviews/AssetCell'
import {Pagination} from 'antd'

export default class BTAssets extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div>
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