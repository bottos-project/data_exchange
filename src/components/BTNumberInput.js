import React, {PureComponent} from 'react'
import {Input,Tooltip} from 'antd'

export default class BTNumberInput extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            title:'',
            value:'',
            visible:false
        }
    }

    onChange(e){
        let value = e.target.value

        if(isNaN(value)) {
            this.setState({visible:true,title:"请输入数字"})
            return;
        }else if(value > Math.pow(10,9)){
            this.setState({visible:true,title:'输入值太大'})
            return
        }else{
            this.setState({value,visible:false})
            this.props.onChange(e)
        } 
    }

    onBlur(){
        this.setState({visible:false})
    }

    render(){
        return(
            <div>
                <Tooltip
                    visible={this.state.visible}
                    title = {this.state.title || ''}
                >
                    <Input
                        onBlur={()=>{this.onBlur()}}
                        onChange={(e)=>this.onChange(e)}
                        value={this.state.value}
                    />
                </Tooltip>
            </div>
        )
    }
}