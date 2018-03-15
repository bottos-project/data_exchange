import React,{PureComponent} from 'react'

export default class BTHistoryTitle extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="everyTitle">
                <h3>历史交易</h3>
                <p>Welcome to Historical Transaction</p>
            </div>
        )
    }
}