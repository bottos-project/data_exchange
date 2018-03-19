import React,{PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const PersonalAssetMessages = messages.PersonalAsset;

export default class BTAssetTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>
                    <FormattedMessage {...PersonalAssetMessages.PersonalAsset}/>
                </h3>
                <p>
                    <FormattedMessage {...PersonalAssetMessages.WelcomeToPersonalAsset}/>
                </p>
            </div>
        )
    }
}