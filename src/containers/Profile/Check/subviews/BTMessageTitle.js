import React,{PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const MessageMessages = messages.Message;



export default class BTMessageTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>
                    <FormattedMessage {...MessageMessages.PersonalCenter}/>
                </h3>
                <p>
                    <FormattedMessage {...MessageMessages.WelcomeToPersonalCenter}/>
                </p>
            </div>
        )
    }
}