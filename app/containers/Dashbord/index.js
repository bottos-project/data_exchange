import React,{PureComponent} from 'react'
import BTDashbordChart from './subviews/BTDashbordChart'
import BTDashbordTable from './subviews/BTDashbordTable'


export default class BTDashbord extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <BTDashbordChart/>
                <div style={{padding:20}}>
                <BTDashbordTable/>
                </div>
            </div>
        )
    }
}