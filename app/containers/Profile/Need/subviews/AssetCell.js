import React,{PureComponent} from 'react'
import './styles.less'

import {Button,Icon,Tag} from 'antd'
import {Link} from 'react-router'

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export default class BTAssetCell extends PureComponent{
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
                    <div>
                        <h4><Link to={linkto}>年轻人表情图标</Link></h4>
                        <div className="cellItemContent">
                            <span><i>发布人:</i>John</span>
                            <span><i>分类:</i><Tag>数据清洗</Tag></span>
                            <span className="price"><i>价格:</i>
                                300
                                <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,marginLeft:5}} alt=""/>
                            </span>
                        </div>
                        
                        <div style={{marginTop:10}}>
                            <Tag color="cyan">数据清洗</Tag>
                            <Tag color="cyan">挖掘</Tag>
                            <Tag color="cyan">表情</Tag>
                            <Tag color="cyan">发怒</Tag>
                        </div>
                        {/* <div><span>截止时间:</span>2017-12-25</div>  */}
                        <div className="ant-list-item-content" style={{marginTop:10}}>
                        We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.
                        </div>
                    </div>
                    <div className="cellBottomIcon">
                        <ul className="ant-list-item-action" style={{marginLeft:0}}>
                            <li><IconText type="star-o" text="156" /></li>
                            <li><IconText type="like-o" text="156" /></li>
                            <li><IconText type="message" text="2" /></li>
                            <li><Button type="primary" size="small">购买</Button></li>
                            <li><Button type="danger" size="small">加入购物车</Button></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}