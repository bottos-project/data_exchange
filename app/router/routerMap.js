import React, { PureComponent } from 'react'
import {Router,Route,IndexRoute} from 'react-router'

import App from '../containers'
import BTDashbord from '../containers/Dashbord'
import BTHome from '../containers/Home'
import BTAccount from '../containers/Profile/Account'
import BTWallet from '../containers/Profile/Wallet'
import BTHistory from '../containers/Profile/History'
import BTShopCart from '../containers/Profile/ShopCart'

import BTCollect from '../containers/Profile/Collect'
import BTCheck from '../containers/Profile/Check'
import BTAsset from '../containers/Profile/Asset'
import BTBlockList from '../containers/Other/BlockList'

import BTAssetDetail from '../containers/Profile/Asset/subviews/BTAssetDetail'
import BTHaveBought from "../containers/Profile/Asset/subviews/BTHaveBought"
import BTUploadAsset from "../containers/Profile/Asset/subviews/BTUploadAsset"


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
                    <Route path="/other/blocklist" component={BTBlockList}/>
                    <Route path="/profile/account" component={BTAccount}/>
                    <Route path="/profile/wallet" component={BTWallet}/>
                    <Route path="/profile/history" component={BTHistory}/>
                    <Route path="/profile/asset" component={BTAsset}/>
                    <Route path="/profile/asset/subviews" component={BTAssetDetail}/>
                    <Route path="/profile/asset/subviews" component={BTHaveBought}/>
                    <Route path="/profile/asset/subviews" component={BTUploadAsset}/>
                    <Route path="/profile/check" component={BTCheck}/>
                    <Route path="/profile/collect" component={BTCollect}/>
                    <Route path="/profile/shopcart" component={BTShopCart}/>
                </Route>
            </Router>
        )
    }
}