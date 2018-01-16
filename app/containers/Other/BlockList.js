import React,{PureComponent} from 'react'

import BTDashbordChart from '../Dashbord/subviews/BTDashbordChart'

export default class BTBlockList extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <BTDashbordChart/>
            </div>
        )
    }
}