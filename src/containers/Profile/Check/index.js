import React,{PureComponent} from 'react'
import BTMessageTable from "./subviews/BTMessageTable"


export default class BTCheck extends PureComponent{
    render(){
        return(
            <div className="container column">
                <BTMessageTable />
            </div>
        )
    }
}
