import React,{PureComponent} from 'react'
import './styles.less'

import {Button,Icon} from 'antd'
import {Link} from 'react-router'

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export default class BTDemandCell extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        let linkto = this.props.linkto || '/'
        return(
            <div className="listCellStyle">
                <div className="ant-list-item-extra" style={{backgroundColor:'red'}}>
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt="logo" width="272"/>
                </div>
                <div className="cellContentStyle">
                    <div className="cellMainContent">
                        <h4><Link to={linkto}>年轻人表情图标</Link></h4>
                        <div className="cellItemContent">
                            <div><span>发布人:</span>John</div>
                            <div className="cellPriceContent">招募价格:300</div>
                        </div>
                        <div><span>发布时间:</span>2017-10-31</div>
                        <div><span>截止时间:</span>2017-12-25</div> 
                        
                        <div className="ant-list-item-content" style={{marginTop:10}}>
                        We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.
                        </div>
                    </div>
                    <div className="cellBottomIcon">
                        <ul className="ant-list-item-action" style={{marginLeft:0}}>
                            <li><IconText type="star-o" text="156" /></li>
                            <li><IconText type="like-o" text="156" /></li>
                            <li><IconText type="message" text="2" /></li>
                            <li><Button type="primary" size="small">提交资产</Button></li>
                            {/* <li><Button type="danger" size="small">加入购物车</Button></li> */}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}