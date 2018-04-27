import React,{PureComponent} from 'react'
import { Menu, Icon, Button } from 'antd';
import {Link} from 'react-router'
import {FormattedMessage} from 'react-intl'
import messages from '../locales/messages'
const SubMenu = Menu.SubMenu;

const MenuMessages = messages.Menu;

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
                        <Link to="/"><FormattedMessage {...MenuMessages.Dashboard}/></Link>
                    </Menu.Item>
                    <Menu.Item key="30">
                        {/* <Icon type="pie-chart" /> */}
                        <Link to="/demand"><FormattedMessage {...MenuMessages.Demand}/></Link>
                    </Menu.Item>
                    <Menu.Item key="40">
                        <Link to="/assets">
                            <FormattedMessage {...MenuMessages.Asset}/>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="70">
                        <Link to="/profile/history"><FormattedMessage {...MenuMessages.History}/></Link>
                    </Menu.Item>
                    <Menu.Item key="20">
                        {/* <Icon type="pie-chart" /> */}
                        <Link to="/other"><FormattedMessage {...MenuMessages.Blocks}/></Link>
                    </Menu.Item>
                    {/*<SubMenu className="personalCenter" key="sub1" title={<span><Icon type="mail" /><span><FormattedMessage {...MenuMessages.Profile}/></span></span>}>*/}
                        {/* <Menu.Item key="8"><Link to="/profile/asset">资产管理</Link></Menu.Item>
                        <Menu.Item key="9"><Link to="/profile/shopcart">购物车</Link></Menu.Item>
                        <Menu.Item key="5"><Link to="/profile/collect">收藏</Link></Menu.Item> */}
                        {/* <Menu.Item key="sub1"><Link  to="/profile/check"><FormattedMessage {...MenuMessages.Check}/></Link></Menu.Item> */}

                        {/*<Menu.Item key="sub2"><Link to="/profile/wallet"><FormattedMessage {...MenuMessages.Wallet}/></Link></Menu.Item>*/}
                    {/*</SubMenu>*/}

                </Menu>
            </div>
        )
    }
}
