import React, {PureComponent} from 'react'
import {Input,Tooltip} from 'antd'

console.log({})

export default class BTNumberInput extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            title:'',
            visible:false
        }
    }

    onChange(e){
        let value = e.target.value

        if(isNaN(value)) {
            this.setState({visible:true,title:window.localeInfo["Wallet.PleaseInputNumber"]})
            return;
        }else if(value > Math.pow(10,9)){
            this.setState({visible:true,title:window.localeInfo["Wallet.NumberIsTooBig"]})
            return
        }else{
            this.setState({visible:false})
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
                        {...this.props}
                        onBlur={()=>{this.onBlur()}}
                        onChange={(e)=>this.onChange(e)}
                    />
                </Tooltip>
            </div>
        )
    }
}