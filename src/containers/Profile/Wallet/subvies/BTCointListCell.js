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
        }
    }

    transaction() {
      this.setState(preState => ({ visible: !preState.visible }))
    }

    onHandleCancel = () => {
      this.setState({ visible: false })
    }

    render(){
      let props = this.props;
      // console.log('props', this.props)
      return (
        <div className="container column">
            <div className="container route-children-bg accountItem">
              <div className="flex accountLeft">
                  <div>
                      <span className="font25 colorTitle">{"BTO"}</span>
                      <span>
                          <FormattedMessage {...WalletMessages.AvailableCash}/>
                      </span>
                  </div>
                  <div className="font25 colorRed">{props.balance/Math.pow(10, 8)}</div>
              </div>
              <div>
                  <Button type="primary" onClick={()=>this.transaction()}>
                    <FormattedMessage {...WalletMessages.Transfer} />
                  </Button>
                  {/* <Button className="marginRight" type="primary" onClick={()=>this.changePwd(this.props.accountName)}>
                      <FormattedMessage {...WalletMessages.ModifyThePassword}/>
                  </Button>
                  <Button type="primary" onClick={()=>this.exportAccount(this.props.accountName)}>
                      <FormattedMessage {...WalletMessages.ExportTheAccount}/>
                  </Button> */}
              </div>
            </div>
            <BTTransitionHeight show={this.state.visible} height={220} style={{marginBottom:20}}>
              <TransactionForm {...this.props} closeModal={()=>this.onHandleCancel()}/>
            </BTTransitionHeight>
        </div>
      )
    }
}
