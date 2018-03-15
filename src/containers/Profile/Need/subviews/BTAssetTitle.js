import React,{PureComponent} from 'react'


export default class BTDemandTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>市场需求</h3>
                <p>Welcome to Market Demand</p>
            </div>
        )
    }
}