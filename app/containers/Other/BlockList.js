import React,{PureComponent} from 'react'

import BTDashboardChart from '../Dashboard/subviews/BTDashboardChart'

export default class BTBlockList extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container">
                <BTDashboardChart/>
            </div>
        )
    }
}