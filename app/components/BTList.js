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
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
                <li><BTListCell/></li>
            </div>
        )
    }
}