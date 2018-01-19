import React,{PureComponent} from 'react'
import BTDashboardChart from './subviews/BTDashboardChart'
import BTDashboardTable from './subviews/BTDashboardTable'

import biticon from '../../static/img/biticon.png'


export default class BTDashboard extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container column">
                <div><BTDashboardChart/></div>
                <div style={{padding:20}}>
                    <BTDashboardTable/>
                </div>
            </div>
        )
    }
}