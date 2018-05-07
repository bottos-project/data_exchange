import React,{ PureComponent } from 'react'
import { Link } from 'react-router'

import BTHeader from '../components/BTHeader'
import BTMenu from '../components/BTMenu'
// import BTPersonalMenu from '../components/BTPersonalMenu'
import './styles.less'
import { Breadcrumb } from 'antd';
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
    const { routes } = this.props
    const routeName = routes[routes.length - 1].name || 'Profile'
    const title = findIntl(routeName)

    return (
      <div className="container">
        <BTHeader />
        {/* { isInProfile ? <BTPersonalMenu /> : <BTHeader /> } */}
        <div className="container content">
            <div className="menu" style={{position: 'relative'}}>
              <BTMenu />
            </div>

            <div className="container contentbody column">
              <div className="everyTitle">
                <h3>
                  {title}
                </h3>
                  <Breadcrumb itemRender={itemRender} routes={routes} separator=">" />
                  {/* <FormattedMessage {...DashboardMessages.WelcomeToMarketDashboard}/> */}
              </div>
              <div className='route-children-container'>
                {this.props.children}
              </div>
            </div>
        </div>
      </div>
    )
  }
}


export default App
