import React,{PureComponent} from 'react'
import BTListCell from './BTListCell' 
import {Icon} from 'antd'

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export default class BTList extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="listContent">
                <ul className="list">
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                    <li><BTListCell linkto={this.props.linkto} title='资产需求'/></li>
                </ul>
            </div>
        )
    }
}