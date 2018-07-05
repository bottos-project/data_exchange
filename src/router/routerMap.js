/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
import React, { PureComponent } from 'react'
import { Router, Route, IndexRedirect, IndexRoute, Redirect } from 'react-router'

import App from '../containers'

import BTDashboard from '../containers/Dashboard'
import BTAssets from '../containers/Assets'
import BTAssetDetail from '../containers/Assets/subviews/AssetDetail'
import BTDemand from '../containers/Demand'
import BTRequirementItemDetail from '../containers/Demand/subviews/BTRequirementItemDetail'
import BTHistory from '../containers/History'
import BTBlockList from '../containers/Other'
import BTOtherBlocks from '../containers/Other/subviews/BTOtherBlocks'
import BTOtherExchange from '../containers/Other/subviews/BTOtherExchange'
import BTSignIn from '../containers/SignIn'

/***************个人中心部分*************** */
import BTHome from '../containers'
import BTCollect from '../containers/Profile/Collect'
import BTCheck from '../containers/Profile/Check'
import BTPromote from '../containers/Profile/Promote'
import BTProfileAsset from '../containers/Profile/Asset'
import BTProfileNeed from '../containers/Profile/Need'
import BTMyAssetSet from '../containers/Profile/Files'
// import BTAccount from '../containers/Profile/Account'
import BTWallet from '../containers/Profile/Wallet'
import BTSetting from '../containers/Profile/Setting'
import BTWalletList from '../containers/Profile/Wallet/subvies/BTWalletList'
import BTTransactionHistory from '../containers/Profile/Wallet/subvies/BTTransactionHistory'

import BTPublishDemand from '../components/BTPublishDemand'
import BTPublishAssetModal from '../components/BTPublishAssetModal'
import LoginOrRegister from '../components/LoginOrRegister'
import Register from '../components/LoginOrRegister/Register'


class RouterMap extends PureComponent {
  render() {
    return (
      <Router history={this.props.history}>
        <Route path='/' name='Home' breadcrumbName='Home' component={App}>
          <IndexRedirect to="/dashboard" />
          <Route path="dashboard" name='Dashboard' breadcrumbName='Dashboard' component={BTDashboard}/>

          <Route path="demand" name='Demand' breadcrumbName='Demand' component={BTDemand}>
            <Route path="detail" name='DemandDetails' breadcrumbName='Detail' component={BTRequirementItemDetail} />
          </Route>

          <Route path="assets" name='Asset' breadcrumbName='Asset' component={BTAssets}>
            <Route path="detail" name='AssetDetails' breadcrumbName='Detail' component={BTAssetDetail} />
          </Route>

          <Route path="history" name='History' breadcrumbName='History' component={BTHistory} />

          <Route path="blocks" name='Blocks' breadcrumbName='Blocks' component={BTBlockList}>
            <Route path="allblocks" name='AllBlocks' breadcrumbName='AllBlocks' component={BTOtherBlocks} />
            <Route path="alltransaction" name='AllTransaction' breadcrumbName='AllTransaction' component={BTOtherExchange} />
          </Route>

          <Route path="signIn" name='signIn' breadcrumbName='signIn' component={BTSignIn} />

          <Route path="publishDemand" name='PublishDemand' breadcrumbName='PublishDemand' component={BTPublishDemand} />
          <Route path="publishAsset" name='PublishAsset' breadcrumbName='PublishAsset' component={BTPublishAssetModal} />
          <Route path="loginOrRegister" name='LoginOrRegister' breadcrumbName='LoginOrRegister' component={LoginOrRegister} />

          <Redirect from="profile" to="profile/asset" />
          <Route path="profile" name='Profile' breadcrumbName='Profile'>
            <Route path="asset" name='ProfileAsset' breadcrumbName='Asset' component={BTProfileAsset} />
            <Route path="need" name='ProfileNeed' breadcrumbName='Need' component={BTProfileNeed} />
            <Route path="file" name='ProfileFile' breadcrumbName='File' component={BTMyAssetSet} />
            <Route path="wallet" name='Wallet' breadcrumbName='Wallet' component={BTWallet}>
              <Route path="walletlist" name='Walletlist' breadcrumbName='Walletlist' component={BTWalletList}>
                <Route path="new" name='CreateNewAccount' breadcrumbName='CreateNewAccount' component={Register} />
              </Route>
              <Route path="TransactionHistory" name='TransactionHistory' breadcrumbName='TransactionHistory' component={BTTransactionHistory} />
            </Route>
            <Route path="check" name='MyMessages' breadcrumbName='MyMessages' component={BTCheck} />
            <Route path="presale" name='Promote' breadcrumbName='Promote' component={BTPromote} />
            <Route path="collect" name='Collect' breadcrumbName='Collect' component={BTCollect} />
            {/* <Route path="setting" breadcrumbName='Setting' component={BTSetting} /> */}
          </Route>
        </Route>
      </Router>
    )
  }
}

export default RouterMap
