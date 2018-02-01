import React,{PureComponent} from 'react'

import {Menu,Icon} from 'antd'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class BTRowMenu extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            current: 'mail'
        }
    }

    handleClick(e){
        console.log('click ', e);
        this.setState({
        current: e.key,
        });
    }

    render(){
        return(
            <div>
                <Menu
                    onClick={(e)=>this.handleClick(e)}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="mail">
                    <Icon type="mail" />Dashbord
                    </Menu.Item>
                    <Menu.Item key="app">
                    <Icon type="appstore" />Bottos
                    </Menu.Item>
                    <Menu.Item key="wallet">
                    <Icon type="appstore" />钱包管理
                    </Menu.Item>
                    <Menu.Item key="property">
                    <Icon type="appstore" />资产管理
                    </Menu.Item>
                    <Menu.Item key="history">
                    <Icon type="appstore" />交易历史
                    </Menu.Item>
                    {/* <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
                    <MenuItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </MenuItemGroup>
                    </SubMenu>
                    <Menu.Item key="alipay">
                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
                    </Menu.Item> */}
                </Menu>
            </div>
        )
    }
}