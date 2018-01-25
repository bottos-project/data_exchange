import React, { PureComponent } from 'react'
import {Router,Route,IndexRoute} from 'react-router'

import App from '../containers'

import BTDashboard from '../containers/Dashboard'
import BTAssets from '../containers/Assets'
import BTAssetDetail from '../containers/Assets/subviews/AssetDetail'
import BTDemand from '../containers/Demand'
import BTDemandDetail from '../containers/Demand/subviews/DemanDetail'
import BTBlockList from '../containers/Other'

/***************个人中心部分*************** */
import BTHome from '../containers'
import BTCollect from '../containers/Profile/Collect'
import BTCheck from '../containers/Profile/Check'
import BTProfileAsset from '../containers/Profile/Asset'
import BTProfileNeed from '../containers/Profile/Need'
// import BTAccount from '../containers/Profile/Account'
import BTWallet from '../containers/Profile/Wallet'
import BTHistory from '../containers/Profile/History'
import BTShopCart from '../containers/Profile/ShopCart'
import BTSetting from '../containers/Profile/Setting'



export default class RouterMap extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <IndexRoute component={BTDashboard}/>
                    <Route path="/demand" component={BTDemand}/>
                    <Route path="/demand/detail" component={BTDemandDetail}/>

                    <Route path="/assets" component={BTAssets}/>
                    <Route path="/assets/detail" component={BTAssetDetail}/>
                    <Route path="/dashbord" component={BTDashboard}/>

                    <Route path="/other" component={BTBlockList}/>

                    {/* <Route path="/profile/account" component={BTAccount}/> */}
                    <Route path="/profile/wallet" component={BTWallet}/>
                    <Route path="/profile/history" component={BTHistory}/>
                    <Route path="/profile/asset" component={BTProfileAsset}/>
                    <Route path="/profile/need" component={BTProfileNeed}/>
                    <Route path="/profile/check" component={BTCheck}/>
                    <Route path="/profile/collect" component={BTCollect}/>
                    <Route path="/profile/shopcart" component={BTShopCart}/>
                    <Route path="/profile/setting" component={BTSetting}/>
                </Route>
            </Router>
        )
    }
}