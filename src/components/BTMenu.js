import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl'
import messages from '../locales/messages'
import SVGDashboard from './SVG/SVGDashboard'

const MenuMessages = messages.Menu;

const HeaderMessages = messages.Header;

const toMapSvg = {
  '/dashboard': SVGDashboard
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
    'asset': 'Asset',
    'need': 'Demand',
    'file': 'File',
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

    list.push(
      <NavLink key={to} icon={icon} to={"/profile/" + to} intlMessage={HeaderMessages[personalMenu[to]]} />
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
