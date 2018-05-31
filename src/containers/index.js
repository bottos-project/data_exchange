import React,{ PureComponent } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import BTHeader from '../components/BTHeader'
import BTMenu from '../components/BTMenu'
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
              zIndex: 1000,
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
