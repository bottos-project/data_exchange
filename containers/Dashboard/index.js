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
            <div style={{width:"90%"}}>
                <div style={{width:"100%"}}>
                    <BTDashboardChart/>
                </div>
                <div style={{padding:30,width:"100%"}}>
                    <BTDashboardTable/>
                </div>
            </div>
        )
    }
}