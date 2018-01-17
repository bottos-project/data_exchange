import React,{PureComponent} from 'react'
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
import {Link} from 'react-router'


class MenuLink extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Link style={{color:'white'}} {...this.props}/>
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
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="10">
                        {/* <Icon type="pie-chart" /> */}
                        <span><MenuLink style={{color:'white'}} to="/dashbord">Dashbord</MenuLink></span>
                    </Menu.Item>
                    <Menu.Item key="11">
                        {/* <Icon type="pie-chart" /> */}
                        <span><MenuLink style={{color:'white'}} to="/other/blocklist">区块浏览</MenuLink></span>
                    </Menu.Item>
                    <Menu.Item key="12">
                        {/* <Icon type="pie-chart" /> */}
                        <span><MenuLink style={{color:'white'}} to="/">需求资产</MenuLink></span>
                    </Menu.Item>
                    <Menu.Item key="13">
                        {/* <Icon type="pie-chart" /> */}
                        <span><MenuLink style={{color:'white'}} to="/profile/wallet">钱包管理</MenuLink></span>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>个人中心</span></span>}>
                        <Menu.Item key="8"><MenuLink to="/profile/asset">资产管理</MenuLink></Menu.Item>
                        <Menu.Item key="9"><MenuLink to="/profile/shopcart">购物车</MenuLink></Menu.Item>
                        <Menu.Item key="5"><MenuLink to="/profile/collect">收藏</MenuLink></Menu.Item>
                        <Menu.Item key="7"><MenuLink to="/profile/check">审核</MenuLink></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}