import React, { PureComponent } from 'react'
import {Tag} from 'antd'

const {CheckableTag} = Tag;

export default class BTMyTag extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            checked:false
        }
    }

    handleChange(checked){
        this.setState({ checked });
    }

    render(){
        return(
            <CheckableTag style={{fontSize:15}} {...this.props} checked={this.state.checked} onChange={(checked)=>this.handleChange(checked)} />
        )
    }
}