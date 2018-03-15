import React,{PureComponent} from 'react'




export default class BTMessageTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>个人中心</h3>
                <p>Welcome to Personal Center</p>
            </div>
        )
    }
}