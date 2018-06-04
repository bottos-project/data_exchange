/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
import React, { PureComponent } from 'react'
import Walletall from './walletall'
import '../styles.less'
import * as BTUtil from '../../../../utils/BTUtil'
import BTIpcRenderer from "../../../../tools/BTIpcRenderer";
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const WalletMessages = messages.Wallet;
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
            lists:lists,
            all_lists:[]
        };
    }

    handleClick1(e){
        // console.log(e)
    }
    export_file(e){
        let selectedFile = document.getElementById("files").files[0];//获取读取的File对象
        if(!selectedFile) return;
        let name = selectedFile.name;//读取选中文件的文件名
        let size = selectedFile.size;//读取选中文件的大小
        let reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
        reader.readAsText(selectedFile);//读取文件的内容
        reader.onload = function(){
            let rs = this.result
            console.log(this.result)
            // callback(rs)
        }
    }
    render(){
        // let lists=this.props.account
        let all_lists=[
            {
                account_name:'btd121',
                money:this.props.acount
            }
        ];
        /*all_lists.push({ account_name:'btd121',
            money:this.props.acount});*/
        return(
               <div className='wallet'>
                   <header>
                       <FormattedMessage {...WalletMessages.Total}/>
                       {this.props.acount}<span className='file'>
                       <FormattedMessage {...WalletMessages.ImportTheWallet}/>
                       <input onChange={(e)=>this.export_file(e)} type="file" name="" id="files" value=""/></span></header>
                   <ul className='wallet_data'>
                       {

                           all_lists.map((data,index)=>{
                               return(
                                   <li key={index}>
                                       <span className='account'>{data.account_name}</span>
                                       <span className='address'>{data.money}</span>
                                       <span className='total'>
                                           <FormattedMessage {...WalletMessages.ExportTheWallet}/>
                                       </span>
                                   </li>
                               )
                           })
                       }
                   </ul>
               </div>
        )
    }
}
