import React,{PureComponent} from 'react'
import {Table,Icon} from 'antd'
import Walletall from './walletall'
import '../styles.less'

const lists=[{
    'id':'1',
    'account':'Lidy',
    'address':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'total':500
},{
    'id':'2',
    'account':'Haoyu',
    'address':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'total':900
},{
    'id':'3',
    'account':'Yugedaren',
    'address':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'total':600
}]
export default class Wallet extends PureComponent{
    constructor(props){
        super(props);
        // this.handleClick1=this.handleClick1.bind(this);
        this.state={
            lists:lists
        };
    }

    handleClick1(e){
        // console.log(e)
    }
    render(){
        return(
               <div className='wallet'>
                   <header>总额 2000<span>+</span></header>
                   <ul className='wallet_data'>
                       {
                           this.state.lists.map(function(res){
                               return (
                                   <li key={res.id}>
                                       <span className='account'>{res.account}</span>
                                       <span className='address'>{res.address}</span>
                                       <span className='total'>{res.total}</span>
                                   </li>
                               )
                           })
                       }

                   </ul>
               </div>
        )
    }
}