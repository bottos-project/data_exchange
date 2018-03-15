import React,{PureComponent} from 'react'
import BTDashboardChart from './subviews/BTDashboardChart'
import BTDashboardTable from './subviews/BTDashboardTable'
import BTDashboardTitle from './subviews/BTDashboardTitle'
import BTDashboardBlock from "./subviews/BTDashboardBlock"
import "./subviews/dashboardStyle.less"

export default class BTDashboard extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container column">
                <div>
                    <BTDashboardTitle/>
                </div>
                <div>
                    <BTDashboardBlock/>
                </div>
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