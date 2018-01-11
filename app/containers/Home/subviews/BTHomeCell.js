import React,{PureComponent} from 'react'
import './styles.less'

import {Button} from 'antd'

export default class BTHomeCell extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="listCellStyle">
                <div className="iconStyle">image</div>
                <div className="cellContentStyle">
                    <div className="cellIntroStyle">
                        <p>需求:复杂道路状况</p>
                        <p>张数:150~900张</p>
                        <p>发布时间:2017-10-29</p>
                        <p>资产介绍:这是一个用于自动驾驶的机器学习的素材资料</p>
                    </div>
                    <div className="cellOptionStyle">
                        <p style={{fontSize:20,color:'red'}}>价格:0.51gas</p>
                        <div className="optionStyle">
                        <div style={{marginLeft:10}}><Button type="primary">购买</Button></div>
                        <div style={{marginLeft:10}}><Button type="primary">关注</Button></div>
                        <div style={{marginLeft:10}}><Button type="primary">收藏</Button></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}