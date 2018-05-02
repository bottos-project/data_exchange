import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Menu, message } from 'antd';
import { Link, withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl'
import messages from '../locales/messages'
const SubMenu = Menu.SubMenu;

const MenuMessages = messages.Menu;

const HeaderMessages = messages.Header;

function BTPersonalMenu() {
  return (
    <Menu defaultSelectedKeys={['6-1']}>
      <Menu.Item key="6-0">
        <Link to="/dashboard">
          返回上一页
          {/* <FormattedMessage {...HeaderMessages.Asset} /> */}
        </Link>
      </Menu.Item>
      <Menu.Item key="6-1">
        <Link to="/profile/asset">
          <FormattedMessage {...HeaderMessages.Asset} />
        </Link>
      </Menu.Item>
      <Menu.Item key="6-2">
        <Link to="/profile/need">
          <FormattedMessage {...HeaderMessages.Demand} />
        </Link>
      </Menu.Item>
      <Menu.Item key="6-3">
        <Link to="/profile/collect">
          <FormattedMessage {...HeaderMessages.Collect} />
        </Link>
      </Menu.Item>
      <Menu.Item key="6-4">
        <Link to="/profile/wallet">
          <FormattedMessage {...HeaderMessages.Wallet} />
        </Link>
      </Menu.Item>
    </Menu>
  )
}

class BTMenu extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      personal: false
    };
  }

    jumpToProfile = (e) => {
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
      console.log("isInProfile", isInProfile);
      if (isInProfile) {
        return <BTPersonalMenu />
      }
      const { routes } = this.props
      const routeName = this.props.routes[routes.length - 1].name || 'Profile'

      return (
          <Menu defaultSelectedKeys={[routeName]}>
              <Menu.Item key="Dashboard">
                  <Link to="/dashboard"><FormattedMessage {...MenuMessages.Dashboard}/></Link>
              </Menu.Item>
              <Menu.Item key="Demand">
                  <Link to="/demand"><FormattedMessage {...MenuMessages.Demand}/></Link>
              </Menu.Item>
              <Menu.Item key="Asset">
                  <Link to="/assets">
                      <FormattedMessage {...MenuMessages.Asset}/>
                  </Link>
              </Menu.Item>
              <Menu.Item key="History">
                  <Link to="/history"><FormattedMessage {...MenuMessages.History}/></Link>
              </Menu.Item>
              <Menu.Item key="Blocks">
                  <Link to="/other"><FormattedMessage {...MenuMessages.Blocks}/></Link>
              </Menu.Item>
              <Menu.Item key="Profile">
                <div onClick={this.jumpToProfile}>
                  <FormattedMessage {...MenuMessages.Profile}/>
                </div>
              </Menu.Item>
          </Menu>
      )

    }
}

const mapStateToProps = (state)=>{
    return {
        isLogin: state.headerState.account_info != null
    }
}

export default withRouter(connect(mapStateToProps)(BTMenu))
