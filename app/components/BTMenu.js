import React,{PureComponent} from 'react'
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
import {Link} from 'react-router'

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
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="10">
                        <Icon type="pie-chart" />
                        <span><Link to="/dashbord">Dashbord</Link></span>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span><Link to="/">Bottos</Link></span>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>我的</span></span>}>
                        <Menu.Item key="5"><Link to="/profile/wallet">钱包管理</Link></Menu.Item>
                        <Menu.Item key="7"><Link to="/profile/account">资产管理</Link></Menu.Item>
                        <Menu.Item key="8"><Link to="/profile/history">交易历史</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}