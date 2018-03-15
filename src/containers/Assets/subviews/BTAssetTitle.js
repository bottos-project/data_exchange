import React,{PureComponent} from 'react'
export default class BTAssetTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>市场资产</h3>
                <p>Welcome to Market Asset</p>
            </div>
        )
    }
}