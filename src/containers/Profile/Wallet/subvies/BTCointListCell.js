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
import { Button } from 'antd'
import TransactionForm from './BTTransaction'
import { FormattedMessage } from 'react-intl'
import messages from '../../../../locales/messages'
import BTTransitionHeight from '@/components/BTTransitionHeight'

const WalletMessages = messages.Wallet;

export default class BTCointListCell extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
          visible: false,
          balance: props.value
        }
    }

    transaction() {
      this.setState(preState => ({ visible: !preState.visible }))
    }

    onHandleCancel = () => {
      this.setState({ visible: false })
    }

    balanceReduce = (n) => {
      let balance = this.state.balance

      this.setState({
        balance: balance - n * Math.pow(10, 8)
      })
    }

    componentWillReceiveProps(nextProps) {
      // nextProps.balance
      this.setState({
        balance: nextProps.value
      });
    }

    render(){
      let { balance } = this.state;
      const token_type = this.props.token_type
      return (
        <div className="container column">
            <div className="container route-children-bg accountItem">
              <div className="flex accountLeft">
                  <div>
                      <span className="font25 colorTitle">{this.props.token_type}</span>
                      <span>
                          <FormattedMessage {...WalletMessages.AvailableCash}/>
                      </span>
                  </div>
                  <div className="font25 colorRed">{balance/Math.pow(10, 8)}</div>
              </div>
              <Button type="primary" onClick={()=>this.transaction()}>
                <FormattedMessage {...WalletMessages.Transfer} />
              </Button>
            </div>
            <BTTransitionHeight show={this.state.visible} height={230}>
              <TransactionForm
                closeModal={()=>this.onHandleCancel()}
                account_name={this.props.account_name}
                token_type={token_type}
                balanceReduce={this.balanceReduce}
              />
            </BTTransitionHeight>
        </div>
      )
    }
}
