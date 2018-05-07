import React, { PureComponent } from 'react'
import { Router, Route, IndexRedirect, IndexRoute, Redirect } from 'react-router'

import App from '../containers'

import BTDashboard from '../containers/Dashboard'
import BTAssets from '../containers/Assets'
import BTAssetDetail from '../containers/Assets/subviews/AssetDetail'
import BTDemand from '../containers/Demand'
import BTDemandDetail from '../containers/Demand/subviews/DemanDetail'
import BTHistory from '../containers/History'
import BTBlockList from '../containers/Other'
import BTSignIn from '../containers/SignIn'
import BTSignUp from '../containers/SignUp'

/***************个人中心部分*************** */
import BTHome from '../containers'
import BTCollect from '../containers/Profile/Collect'
import BTCheck from '../containers/Profile/Check'
import BTProfileAsset from '../containers/Profile/Asset'
import BTProfileNeed from '../containers/Profile/Need'
// import BTAccount from '../containers/Profile/Account'
import BTWallet from '../containers/Profile/Wallet'
import BTShopCart from '../containers/Profile/ShopCart'
import BTSetting from '../containers/Profile/Setting'
import BTWalletList from '../containers/Profile/Wallet/subvies/BTWalletList'

import BTPublishDemand from '../components/BTPublishDemand'
import BTPublishAssetModal from '../components/BTPublishAssetModal'
import LoginOrRegister from '../components/LoginOrRegister'


export default class RouterMap extends PureComponent {
  render() {
    return (
      <Router history={this.props.history}>
        <Route path='/' name='Home' breadcrumbName='Home' component={App}>
          <IndexRedirect to="/dashboard" />
          <Route path="dashboard" name='Dashboard' breadcrumbName='Dashboard' component={BTDashboard}/>

          <Route path="demand" name='Demand' breadcrumbName='Demand' component={BTDemand}>
            <Route path="detail" name='DemandDetails' breadcrumbName='Detail' component={BTDemandDetail} />
          </Route>

          <Route path="assets" name='Asset' breadcrumbName='Asset' component={BTAssets}>
            <Route path="detail" name='AssetDetails' breadcrumbName='Detail' component={BTAssetDetail} />
          </Route>

          <Route path="history" name='History' breadcrumbName='History' component={BTHistory} />

          <Route path="blocks" name='Blocks' breadcrumbName='Blocks' component={BTBlockList} />

          <Route path="signIn" name='signIn' breadcrumbName='signIn' component={BTSignIn} />
          <Route path="signUp" name='signUp' breadcrumbName='signUp' component={BTSignUp} />

          <Route path="publishDemand" name='PublishDemand' breadcrumbName='PublishDemand' component={BTPublishDemand} />
          <Route path="publishAsset" name='PublishAsset' breadcrumbName='PublishAsset' component={BTPublishAssetModal} />
          <Route path="loginOrRegister" name='LoginOrRegister' breadcrumbName='LoginOrRegister' component={LoginOrRegister} />

          <Redirect from="profile" to="profile/asset" />
          <Route path="profile" name='Profile' breadcrumbName='Profile'>
            <Route path="asset" name='ProfileAsset' breadcrumbName='Asset' component={BTProfileAsset} />
            <Route path="need" name='ProfileNeed' breadcrumbName='Need' component={BTProfileNeed} />
            <Route path="check" name='Check' breadcrumbName='Check' component={BTCheck} />
            <Route path="collect" name='Collect' breadcrumbName='Collect' component={BTCollect} />
            {/* <Route path="shopcart" breadcrumbName='Shopcart' component={BTShopCart} /> */}
            {/* <Route path="setting" breadcrumbName='Setting' component={BTSetting} /> */}
            <Route path="wallet" name='Wallet' breadcrumbName='Wallet' component={BTWallet}>
              <Route path="walletlist" name='Walletlist' breadcrumbName='Walletlist' component={BTWalletList} />
            </Route>
          </Route>
        </Route>
      </Router>
    )
  }
}
