import React,{PureComponent} from 'react'
// import {Wallet,Transfer,History} from './Person'
import { Tabs } from 'antd';
import Walletall from './Person/walletall'
import Wallet from './Person/wallet'
import Transfer from './Person/tranfer'
import History from './Person/history'
const TabPane = Tabs.TabPane;
import './styles.less'

export default class BTWallet extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            flag:true
        }
    }

    test2(){
        
    }

    callback(e){
        console.log(key);
    }
    toggle(){
        this.setState({
            flag:!this.state.flag
        })
    }

    initView1(){
        return(
            <div>
                <Walletall />
            </div>
        )
    }

    initView2(){
        return(
            <Tabs type='card' >
                <TabPane tab="transfer" key="2"><Transfer/></TabPane>
                <TabPane tab="wallet" key="1"><Wallet /></TabPane>
                <TabPane tab="Transfer History" key="3"><History /></TabPane>
            </Tabs>
        )
    }

    render(){
        var margin='0 30px'
        return (
            <div style={{margin}}>
                <div className="toggle"><span onClick={()=>this.toggle()}>toggle</span></div>

                {
                    this.state.flag ? this.initView1() : this.initView2()
                }
            </div>
        )

    }
}