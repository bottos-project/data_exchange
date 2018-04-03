import React,{PureComponent} from 'react'
import { Menu, Icon, Button } from 'antd';
import {Link} from 'react-router'
import {FormattedMessage} from 'react-intl'
import messages from '../locales/messages'
const SubMenu = Menu.SubMenu;

const MenuMessages = messages.Menu;

class MenuLink extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Link {...this.props}/>
        )
    }
}

export default class BTMenu extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            collapsed: false,
        }
    }

    toggleCollapsed(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render(){
        return(
            <div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="10">
                        {/* <Icon type="pie-chart" /> */}
                        <MenuLink to="/"><FormattedMessage {...MenuMessages.Dashboard}/></MenuLink>
                    </Menu.Item>
                    <Menu.Item key="30">
                        {/* <Icon type="pie-chart" /> */}
                        <MenuLink to="/demand"><FormattedMessage {...MenuMessages.Demand}/></MenuLink>
                    </Menu.Item>
                    <Menu.Item key="40">
                        <MenuLink to="/assets">
                            <FormattedMessage {...MenuMessages.Asset}/>
                        </MenuLink>
                    </Menu.Item>
                    <Menu.Item key="70">
                        <MenuLink to="/profile/history"><FormattedMessage {...MenuMessages.History}/></MenuLink>
                    </Menu.Item>
                    <Menu.Item key="20">
                        {/* <Icon type="pie-chart" /> */}
                        <MenuLink to="/other"><FormattedMessage {...MenuMessages.Blocks}/></MenuLink>
                    </Menu.Item>
                    {/*<SubMenu className="personalCenter" key="sub1" title={<span><Icon type="mail" /><span><FormattedMessage {...MenuMessages.Profile}/></span></span>}>*/}
                        {/* <Menu.Item key="8"><MenuLink to="/profile/asset">资产管理</MenuLink></Menu.Item>
                        <Menu.Item key="9"><MenuLink to="/profile/shopcart">购物车</MenuLink></Menu.Item>
                        <Menu.Item key="5"><MenuLink to="/profile/collect">收藏</MenuLink></Menu.Item> */}
                        {/* <Menu.Item key="sub1"><MenuLink  to="/profile/check"><FormattedMessage {...MenuMessages.Check}/></MenuLink></Menu.Item> */}

                        {/*<Menu.Item key="sub2"><MenuLink to="/profile/wallet"><FormattedMessage {...MenuMessages.Wallet}/></MenuLink></Menu.Item>*/}
                    {/*</SubMenu>*/}

                </Menu>
            </div>
        )
    }
}