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
import { connect } from 'react-redux'
import {List,Button} from 'antd'
import BTFetch from '../../../../utils/BTFetch';
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";
import BTCointListCell from './BTCointListCell'

class BTCointList extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            balanceList: [],
        }
    }

    componentWillReceiveProps(nextProps) {
      nextProps.selectedAccount
      this.getUserBalance(nextProps.selectedAccount)
    }

    componentDidMount() {
      const { account_info, selectedAccount } = this.props
      this.getUserBalance(selectedAccount || account_info.username)
    }

    getUserBalance(account_name) {
        console.log("getUserBalance", account_name)

        let url = '/user/GetAccountInfo'
        let params = { account_name }
        BTFetch(url,'POST',params)
          .then(res => {
              let balanceList = []
              if(res && res.code==1){
                  let data = res.data
                  balanceList.push(data)
                  this.setState({balanceList})
              }else{
                  messages.error('failed')
              }
          }).catch(error=>{
              messages.error('failed')
          })
    }

    render() {
      return(
        <List
          style={{flex: 1}}
          dataSource={this.state.balanceList}
          renderItem={(item)=>{
            return <BTCointListCell {...item}/>
          }}
        />
      )
    }
}

const mapStateToProps = (state) => {
  const account_info = state.headerState.account_info
  const { selectedAccount } = state.walletState
  return { account_info, selectedAccount }
}

export default connect(mapStateToProps)(BTCointList)
