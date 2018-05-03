import React,{PureComponent} from 'react'
import BTMessageTitle from "./subviews/BTMessageTitle"
import BTMessageTable from "./subviews/BTMessageTable"



export default class BTCheck extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container column">
                <div>
                    <BTMessageTitle/>
                </div>
                <div>
                    <BTMessageTable/>
                </div>
            </div>
        )
    }
}





