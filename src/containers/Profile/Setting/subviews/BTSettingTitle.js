import React,{PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const SettingMessages = messages.Setting;

export default class BTSettingTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>
                    <FormattedMessage {...SettingMessages.PersonalCenter}/>
                </h3>
                <p>
                    <FormattedMessage {...SettingMessages.WelcomeToPersonalCenter}/>
                </p>
            </div>
        )
    }
}