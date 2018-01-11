import React, { PureComponent } from 'react'
import {Router,Route,IndexRoute} from 'react-router'

import App from '../containers'
import BTDashbord from '../containers/Dashbord'
import BTHome from '../containers/Home'
import BTAccount from '../containers/Profile/Account'
import BTWallet from '../containers/Profile/Wallet'
import BTHistory from '../containers/Profile/History'


export default class RouterMap extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <IndexRoute component={BTHome}/>
                    <Route path="/dashbord" component={BTDashbord}/>
                    <Route path="/profile/account" component={BTAccount}/>
                    <Route path="/profile/wallet" component={BTWallet}/>
                    <Route path="/profile/history" component={BTHistory}/>
                </Route>
            </Router>
        )
    }
}