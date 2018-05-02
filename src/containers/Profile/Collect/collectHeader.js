import React,{PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const CollectMessages = messages.Collect;




export default class CollectHeader extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>
                    <FormattedMessage {...CollectMessages.MyCollection}/>
                </h3>
                <p>
                    <FormattedMessage {...CollectMessages.WelcomeToCollectMessages}/>
                </p>
            </div>
        )
    }
}
