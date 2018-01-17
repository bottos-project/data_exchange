import React,{PureComponent} from 'react'
import BTListCell from './BTListCell' 


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
            <div>
                <ul style={{listStyle:'none'}}>
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