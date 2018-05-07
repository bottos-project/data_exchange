import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Menu, message } from 'antd';
import { Link, withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl'
import messages from '../locales/messages'

const MenuMessages = messages.Menu;

const HeaderMessages = messages.Header;

function NavLink({to, intlMessage}) {
  return <Link to={to} activeClassName='menu-link-active'>
    <div className='menu-link'>
      <FormattedMessage {...intlMessage} />
    </div>
  </Link>
}

function BTPersonalMenu({routeName}) {
  const personalMenu = {
    // dashboard:
    'asset': 'Asset',
    'need': 'Demand',
    'collect': 'Collect',
    'wallet': 'Wallet',
    'check': 'MyMessages',
  }
  var list = []
  for (var to in personalMenu) {
    list.push(
      <NavLink to={"/profile/" + to} intlMessage={HeaderMessages[personalMenu[to]]} />
    )
  }
  return (
    <div className='menu-container'>
      <Link to="/dashboard">
        <div className='menu-link'>
          返回上一页
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
    const { routes } = this.props
    const routeName = this.props.routes[routes.length - 1].name || 'Profile'

    if (isInProfile) {
      return <BTPersonalMenu routeName={routeName} />
    }

    var list = [];
    for (var to in this.homeMenu) {
      list.push(
        <NavLink key={to} to={'/' + to} intlMessage={MenuMessages[this.homeMenu[to]]} />
      )
    }

    let isProfileClassActive = otherRouteNames.includes(routeName)
    return (
      <div className='menu-container'>
        {list}
        <Link className={isProfileClassActive ? 'menu-link-active' : ''}>
          <div className='menu-link' onClick={this.jumpToProfile}>
            <FormattedMessage {...MenuMessages.Profile} />
          </div>
        </Link>
      </div>
    )

  }
}

const mapStateToProps = (state)=>{
    return {
        isLogin: state.headerState.account_info != null
    }
}

export default withRouter(connect(mapStateToProps)(BTMenu))
