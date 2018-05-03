import React,{PureComponent} from 'react'
import BTHeader from '../components/BTHeader'
import BTMenu from '../components/BTMenu'
// import BTPersonalMenu from '../components/BTPersonalMenu'
import './styles.less'
import { Breadcrumb } from 'antd';
import { FormattedMessage } from 'react-intl'
import messages from '../locales/messages'
const MenuMessages = messages.Menu;

class App extends PureComponent {
  render() {
    const { routes } = this.props
    const routeName = routes[routes.length - 1].name || 'Profile'

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
                  <FormattedMessage {...MenuMessages[routeName]}/>
                </h3>
                  <Breadcrumb routes={routes} separator=">" />
                  {/* <FormattedMessage {...DashboardMessages.WelcomeToMarketDashboard}/> */}
              </div>

              {this.props.children}
            </div>
        </div>
      </div>
    )
  }
}


export default App
