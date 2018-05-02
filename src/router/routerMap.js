import React, { PureComponent } from 'react'
import { Router, Route, IndexRedirect, IndexRoute } from 'react-router'

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
import BTAccountList from '../containers/Profile/Wallet';


export default class RouterMap extends PureComponent {
  render() {
    return (
      <Router history={this.props.history}>
        <Route path='/' breadcrumbName='Home' component={App}>
          <IndexRedirect to="/dashboard" />
          <Route path="dashboard" name='Dashboard' breadcrumbName='Dashboard' component={BTDashboard}/>

          <Route path="demand" name='Demand' breadcrumbName='Demand' component={BTDemand}>
            <Route path="detail" name='DemandDetails' breadcrumbName='Detail' component={BTDemandDetail} />
          </Route>

          <Route path="assets" name='Asset' breadcrumbName='Asset' component={BTAssets}>
            <Route path="detail" name='AssetDetails' breadcrumbName='Detail' component={BTAssetDetail} />
          </Route>

          <Route path="history" name='History' breadcrumbName='History' component={BTHistory}/>

          <Route path="other" name='Blocks' breadcrumbName='Blocks' component={BTBlockList}/>

          <Route path="signIn" name='signIn' breadcrumbName='signIn' component = {BTSignIn}/>
          <Route path="signUp" name='signUp' breadcrumbName='signUp' component = {BTSignUp}/>

          <Route path="profile/asset" breadcrumbName='profile/asset' component={BTProfileAsset}/>
          <Route path="profile/wallet" component={BTWallet}/>
          <Route path="profile/need" component={BTProfileNeed}/>
          <Route path="profile/check" component={BTCheck}/>
          <Route path="profile/collect" component={BTCollect}/>
          <Route path="profile/shopcart" component={BTShopCart}/>
          <Route path="profile/setting" component={BTSetting}/>
          <Route path="profile/wallet/walletlist" component={BTWalletList}/>
          <Route path="profile/wallet/accountlist" component={BTAccountList}/>
        </Route>
      </Router>
    )
  }
}
