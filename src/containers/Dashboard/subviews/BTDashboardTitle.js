import React,{PureComponent} from 'react'
import "./dashboardStyle.less"




export default class BTDashboardTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>市场概览</h3>
                <p>Welcome to Bottos Dashboard</p>
            </div>
        )
    }
}