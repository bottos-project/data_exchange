import React,{PureComponent} from 'react'
// import {Wallet,Transfer,History} from './Person'
import { Tabs } from 'antd';
import Walletall from './Person/walletall'
const TabPane = Tabs.TabPane;
import './styles.less'

export default class BTWallet extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){

        return (
            <div>
                <Walletall />
            </div>
        )

    }
}