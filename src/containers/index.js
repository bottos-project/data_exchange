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
import React,{ PureComponent } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import BTHeader from '../components/BTHeader'
import BTMenu from '../components/BTMenu'
import DownloadList from './DownloadList'

import { packDID } from '../utils/pack'
import { registAssetPack } from '../lib/msgpack/BTPackManager'
// import BTPersonalMenu from '../components/BTPersonalMenu'
import './styles.less'
import { Breadcrumb, Spin } from 'antd';
import { FormattedMessage } from 'react-intl'
import messages from '../locales/messages'

const MenuMessages = messages.Menu;
const HeaderMessages = messages.Header;

function findIntl(routeName) {
  // 先去 MenuMessages 里面找
  // 如果没找到，去 HeaderMessages 里面找
  return MenuMessages[routeName] ? <FormattedMessage {...MenuMessages[routeName]} /> : (
    HeaderMessages[routeName] ? <FormattedMessage {...HeaderMessages[routeName]} /> : routeName
  )
}

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  const routeName = route.name
  const title = findIntl(routeName)
  return last ? <span>{title}</span> : <Link to={paths.join('/')}>{title}</Link>;
}

class App extends PureComponent {
  componentDidMount() {
    let did = {
      "asset_id": 'window.uuid()',
      "info": {
        "user_name": 'usr',
        "asset_name": 'this.state.title',
        "asset_type": 12,
        "feature_tag": 'featureTag-1-2',
        "sample_hash": 'this.state.sample_hash',
        "storage_hash": 'this.state.storage_hash',
        "expire_time": new Date().getTime() / 1000,
        "opType": 1,
        "price": 23 * Math.pow(10, 8),
        "description": 'this.state.description'
      }
    }

    let contract = 'assetmng',
    method = 'assetreg';
    let promise = packDID(did, contract, method)
    console.log('promise', promise);
    // let beforePack = registAssetPack(did)
    // console.log('beforePack', beforePack);
    promise.then(res => {
      console.log(res)
      // res.forEach((ele, index) => console.assert(ele == beforePack[index]))
    })

  }

  render() {
    const { routes, locale } = this.props
    const routeName = routes[routes.length - 1].name || 'Profile'
    const title = findIntl(routeName)

    return (
      <div className="container">
        {this.props.isloading &&
          <Spin
            wrapperClassName='container'
            style={{
              width: '100%',
              height: '100vh',
              zIndex: 1008,
              backgroundColor: '#e6f7ff',
              opacity: 0.3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            size='large'
          />
        }

          <BTHeader />
          {/* { isInProfile ? <BTPersonalMenu /> : <BTHeader /> } */}
          <div className="container content">
              <div className={"menu " + locale}>
                <BTMenu />
              </div>

              <div className="container contentbody column">
                <div className="everyTitle route-children-bg">
                  <h3>
                    {title}
                  </h3>
                    <Breadcrumb itemRender={itemRender} routes={routes} separator=">" />
                    {/* <FormattedMessage {...DashboardMessages.WelcomeToMarketDashboard}/> */}
                </div>
                {this.props.children}
              </div>
              <DownloadList />
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isloading: state.headerState.isloading,
    locale: state.headerState.locale
  };
}
export default connect(mapStateToProps)(App)
