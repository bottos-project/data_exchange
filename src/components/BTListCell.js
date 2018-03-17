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

export default class BTListCell extends PureComponent{
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
                        <h4><Link to={linkto}>{this.props.title}</Link></h4>
                        <div className="ant-list-item-meta-description">
                        Ant Design, a design language for background applications, is refined by Ant UED Team.
                        </div>
                        <div className="ant-list-item-content" style={{marginTop:20}}>
                        We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.
                        </div>
                    </div>
                    <div className="cellBottomIcon">
                        <ul className="ant-list-item-action" style={{marginLeft:0}}>
                            <li>
                            <IconText type="star-o" text="156" />
                            </li>

                            <li>
                            <IconText type="like-o" text="156" />
                            </li>

                            <li>
                            <IconText type="message" text="2" />
                            </li>

                            <li>
                                <Button type="primary" size="small">购买</Button>
                            </li>

                            <li>
                                <Button type="danger" size="small">加入购物车</Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}