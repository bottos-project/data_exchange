import React,{PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const AssetMessages = messages.Asset;

export default class BTAssetTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>
                    <FormattedMessage {...AssetMessages.Asset}/>
                </h3>
                <p>
                    <FormattedMessage {...AssetMessages.WelcomeToMarketAsset}/>
                </p>
            </div>
        )
    }
}