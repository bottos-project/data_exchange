import React,{PureComponent} from 'react'
import BTDashboardChart from './subviews/BTDashboardChart'
import BTDashboardTable from './subviews/BTDashboardTable'
import "./subviews/dashboardStyle.less"

export default class BTDashboard extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container column">
                <div>
                    <BTDashboardChart/>
                </div>
                <div>
                    <BTDashboardTable/>
                </div>
            </div>
        )
    }
}