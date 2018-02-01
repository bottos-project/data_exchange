import React,{PureComponent} from 'react'
import Transfer from "./tranfer";
import Wallet from './wallet'
import { Pagination } from 'antd';
import '../styles.less'
import History from "./history";
export default class Walletall extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className='all'>
                <div className='wallet_all'>
                    <Transfer />
                    <Wallet />
                </div>
                <History/>
            </div>


        )
    }
}
