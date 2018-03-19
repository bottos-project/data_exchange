import React,{PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const DemandMessages = messages.Demand;



export default class BTDemandTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>
                    <FormattedMessage {...DemandMessages.Demand}/>
                </h3>
                <p>
                    <FormattedMessage {...DemandMessages.WelcomeToMarketDemand}/>
                </p>
            </div>
        )
    }
}