import React,{PureComponent} from 'react'
import BTDashboardChart from './subviews/BTDashboardChart'
import BTDashboardTable from './subviews/BTDashboardTable'


export default class BTDashboard extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div style={{width:"100%"}}>
                <div style={{width:900}}>
                    <BTDashboardChart/>
                </div>
                <div style={{padding:20,width:"100%"}}>
                    <BTDashboardTable/>
                </div>
            </div>
        )
    }
}