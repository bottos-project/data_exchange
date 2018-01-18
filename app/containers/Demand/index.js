// 需求列表页

import React,{PureComponent} from 'react'
import './styles.less'

import BTDemandCell from './subviews/DemandCell'

export default class BTDemand extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container demand">
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
        )
    }
}