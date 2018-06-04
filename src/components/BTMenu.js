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
import { connect } from 'react-redux'
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl'
import messages from '../locales/messages'

const MenuMessages = messages.Menu;
const HeaderMessages = messages.Header;

function findIntlMessage(routeName) {
  // 先去 MenuMessages 里面找
  // 如果没找到，去 HeaderMessages 里面找
  return MenuMessages[routeName] ? MenuMessages[routeName] : (
    HeaderMessages[routeName] ? HeaderMessages[routeName] : routeName
  )
}

function NavLink({to, intlMessage, icon}) {
  return <Link to={to} activeClassName='menu-link-active'>
    <div className='menu-link'>
      {icon}
      <FormattedMessage {...intlMessage} />
    </div>
  </Link>
}

function BTPersonalMenu({routeName}) {
  const personalMenu = {
    // dashboard:
    'asset': 'ProfileAsset',
    'need': 'ProfileNeed',
    'file': 'ProfileFile',
    'wallet': 'Wallet',
    'check': 'MyMessages',
    'presale': 'PreSale',
    'collect': 'Collect',
  }
  var list = []
  for (var to in personalMenu) {
    console.log('to', to);
    let icon = (<span className='menu-link-icon'>
      <i className={'iconfont icon-my' + to} />
    </span>)

    let intlMessage = findIntlMessage(personalMenu[to])

    list.push(
      <NavLink key={to} icon={icon} to={"/profile/" + to} intlMessage={intlMessage} />
    )
  }
  return (
    <div className='menu-container profilepage'>
      <Link to="/dashboard">
        <div className='menu-link'>
          <span className='menu-link-icon'>
            <i className='iconfont icon-shichangfenxi_' />
          </span>
          <FormattedMessage {...MenuMessages.Back} />
        </div>
      </Link>
      {list}
    </div>
  )
}

const otherRouteNames = ['PublishDemand', 'PublishAsset', 'LoginOrRegister']

class BTMenu extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      personal: false,
      isProfileClassActive: false
    };

    this.homeMenu = {
      dashboard: 'Dashboard',
      demand: 'Demand',
      assets: 'Asset',
      history: 'History',
      blocks: 'Blocks',
    }
  }

  jumpToProfile = (e) => {
    console.log('this.props.isLogin', this.props.isLogin);
    if (this.props.isLogin) {
      this.props.router.push('/profile/asset')
    } else {
      message.destroy()
      message.info(window.localeInfo["Header.PleaseLogInFirst"]);
    }
  }


  render() {
    // console.log('BTMenu render');
    const isInProfile = this.props.location.pathname.startsWith('/profile')
    // let routes = this.props.routes
    // console.error("isInProfile", isInProfile);
    const { routes, locale } = this.props
    const routeName = routes[routes.length - 1].name || 'Profile'

    if (isInProfile) {
      return <BTPersonalMenu routeName={routeName} />
    }

    var list = [];
    for (var to in this.homeMenu) {
      // console.log('to', to);
      let icon = (<span className='menu-link-icon'>
        <i className={'iconfont icon-' + to} />
      </span>)
      list.push(
        <NavLink key={to} icon={icon} to={'/' + to} intlMessage={MenuMessages[this.homeMenu[to]]} />
      )
    }

    let isProfileClassActive = otherRouteNames.includes(routeName)
    return (
      <div className='menu-container homepage'>
        {list}
        <Link className={isProfileClassActive ? 'menu-link-active' : ''}>
          <div className='menu-link' onClick={this.jumpToProfile}>
            <span className='menu-link-icon'>
              <i className='iconfont icon-gerenzhongxin' />
            </span>
            <FormattedMessage {...MenuMessages.Profile} />
          </div>
        </Link>
      </div>
    )

  }
}

const mapStateToProps = (state)=>{
    return {
        isLogin: state.headerState.account_info != null,
        locale: state.headerState.locale
    }
}

export default withRouter(connect(mapStateToProps)(BTMenu))
