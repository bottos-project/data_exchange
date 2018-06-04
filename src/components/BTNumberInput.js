/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
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