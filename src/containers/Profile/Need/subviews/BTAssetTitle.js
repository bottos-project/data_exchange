import React,{PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const PersonalDemandMessages = messages.PersonalDemand;

export default class BTDemandTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>
                    <FormattedMessage {...PersonalDemandMessages.PersonalDemand}/>
                </h3>
                <p>
                    <FormattedMessage {...PersonalDemandMessages.WelcomeToPersonalDemand}/>
                </p>
            </div>
        )
    }
}