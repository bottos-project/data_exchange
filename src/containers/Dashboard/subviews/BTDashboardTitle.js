import React,{PureComponent} from 'react'
import "./dashboardStyle.less"
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const DashboardMessages = messages.Dashboard;



export default class BTDashboardTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>
                    <FormattedMessage {...DashboardMessages.Dashboard}/>
                </h3>
                <p>
                    <FormattedMessage {...DashboardMessages.WelcomeToMarketDashboard}/>
                </p>
            </div>
        )
    }
}