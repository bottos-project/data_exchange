import React,{PureComponent} from 'react'
import BTHistoryTable from "./subviews/BTHistoryTable";
import BTHistoryTitle from "./subviews/BTHistoryTitle";

export default class BTDashboard extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container column">
                <div>
                    <BTHistoryTitle/>
                </div>
                <div>
                    <BTHistoryTable/>
                </div>

            </div>
        )
    }
}