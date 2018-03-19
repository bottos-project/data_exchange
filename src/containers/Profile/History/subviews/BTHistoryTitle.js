import React,{PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const HistoryMessages = messages.History;
export default class BTHistoryTitle extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="everyTitle">
                <h3>
                    <FormattedMessage {...HistoryMessages.HistoryTransaction}/>
                </h3>
                <p>
                    <FormattedMessage {...HistoryMessages.WelcomeToHistoryTransaction}/>
                </p>
            </div>
        )
    }
}