import React,{PureComponent} from 'react'
// import {Wallet,Transfer,History} from './Person'
import { Tabs } from 'antd';
import Walletall from './Person/walletall'
import './styles.less'
const TabPane = Tabs.TabPane;

export default class BTWallet extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){

        return (
            <div style={{width:'90%',height:'100%'}}>
                <Walletall />
            </div>
        )

    }
}