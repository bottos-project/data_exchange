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
import React,{PureComponent} from 'react'

import {List,Button} from 'antd'
import BTFetch from '../../../../utils/BTFetch';
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";
import BTCointListCell from './BTCointListCell'

export default class BTAccountList extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            accoutList:[],
        }
    }
    componentDidMount(){
        this.getUserBalance()
    }

    componentWillReceiveProps(nextProps){
        let selectWallet = nextProps.selectWallet;
        // this.getAccountList(selectWallet)
    }

    getUserBalance(){
        console.log("getUserBalance")
        // let balanceList = [{
		// 	"name": "bto",
		// 	"balance": 1000 * Math.pow(10, 8),
		// 	"cny": 100,
		// 	"usd": 16
		// },
		// {
		// 	"name": "sto",
		// 	"balansd": 16
        // }]ce": 90000 * Math.pow(10, 8),
		// 	"cny": 100,
		// 	"u
        let url = '/user/GetAccountInfo'
        let localStorage = window.localStorage
        let account_info = JSON.parse(localStorage.account_info)
        let username = account_info.username
        let accountName = this.props.selectWallet || username

        let params = {
            account_name:accountName
        }
        BTFetch(url,'POST',params)
            .then(response=>{
                let balanceList = []
                if(response && response.code==1){
                    let data = response.data
                    balanceList.push(data)
                    this.setState({accoutList:balanceList})
                }else{
                    messages.error('failed')
                }
            }).catch(error=>{
                messages.error('failed')
            })
    }

    render(){
        // console.log(this.state.accoutList,this.props)
        return(
            <div className="container">
                <List
                    dataSource={this.state.accoutList}
                    style={{flex:1}}
                    renderItem={(item)=>{
                        let newItem = Object.assign(item,this.props)
                        return <BTCointListCell {...newItem}/>
                    }}
                />
            </div>
        )
    }
}
