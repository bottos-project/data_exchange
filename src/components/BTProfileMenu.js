import React, {PureComponent} from 'react'
import { Link } from 'react-router'

import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;

import { FormattedMessage } from 'react-intl'

import messages from '../locales/messages'
const MenuMessages = messages.Menu;


export default class BTProfileMenu extends PureComponent{
    render(){
        return(
            <Menu defaultSelectedKeys={['6-1']}>
              <Menu.Item key="6-1">
                <Link to="/profile/assets">
                  <FormattedMessage {...MenuMessages.Asset} />
                </Link>
              </Menu.Item>
              <Menu.Item key="6-2">
                  <Link to="/profile/demand">
                  <FormattedMessage {...MenuMessages.Demand} />
                </Link>
              </Menu.Item>
              {/* <Menu.Item key="6-3">
                <Link to="/profile/other">
                  <FormattedMessage {...MenuMessages.Blocks} />
                </Link>
              </Menu.Item>
              <Menu.Item key="6-4">
                <Link to="/profile/asset">
                  <FormattedMessage {...MenuMessages.Profile}/>
                </Link>
              </Menu.Item> */}
            </Menu>
        )
    }
}
