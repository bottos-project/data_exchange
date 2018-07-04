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
import { connect } from 'react-redux'
import { List } from 'antd'
import BTFetch from '../../../../utils/BTFetch';
// import { getSignaturedParam } from '../../../../utils/BTCommonApi'
// import messages from '../../../../locales/messages'
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

      // BTFetch('/user/GetBalance', 'POST', {username: account_info.username})
      // .then()

    }

    getUserBalance(username) {
        // console.log("getUserBalance", username)

        let url = '/user/GetBalance'
        let params = {
          username
        }
        BTFetch(url,'POST',params)
          .then(res => {
            if (!res || res.code != 1) {
              let err = new Error('Get balance error!')
              err.res = res
              throw err
            }
            let balanceList = []
            console.log('res', res);
            if (Array.isArray(res.data)) {
              balanceList = res.data
            }
            this.setState({balanceList})
          }).catch(err => {
            // console.error(err);
            if (err.res) {
              let res = err.res
              if (res.code == 1006) {
                try {
                  console.error(JSON.parse(res.details));
                } catch (e) {
                  message.error('failed')
                }
              }

            } else {
              message.error('failed')
            }
          })
    }

    render() {
      return(
        <List
          // style={{flexGrow: 1}}
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
