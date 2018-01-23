import React,{PureComponent} from 'react'
import BTDashboardChart from './subviews/BTDashboardChart'
import BTDashboardTable from './subviews/BTDashboardTable'


export default class BTDashboard extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div style={{width:800}}>
                    <BTDashboardChart/>
                </div>
                <div style={{padding:20}}>
                    <BTDashboardTable/>
                </div>
            </div>
        )
    }
}