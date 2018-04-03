
import React,{PureComponent} from 'react'
import BTTransaction from './BTTransaction'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {Button} from 'antd'

const WalletMessages = messages.Wallet;

export default class BTAccountListCell extends PureComponent{
    constructor(props){
        super(props)
    }

    transaction(){
        this.transactionModal.setState({
            visible:true
        })
    }

    render(){
        let props = this.props;
        console.log(this.props)
        return(
            <div className="container">
            <BTTransaction ref={(ref)=>this.transactionModal = ref} {...this.props}/>
                <div className="container accountItem" >
                    <div className="flex accountLeft">
                        <div>
                            <span className="font25 colorTitle">{props.coinName}</span>
                            <span>
                                <FormattedMessage {...WalletMessages.AvailableCash}/>
                            </span>
                        </div>
                        <div className="font25 colorRed">{props.coinNum}</div>
                    </div>
                    <div>
                        <Button className="marginRight" type="primary" onClick={()=>this.transaction()}>转账</Button>
                        {/* <Button className="marginRight" type="primary" onClick={()=>this.changePwd(this.props.accountName)}>
                            <FormattedMessage {...WalletMessages.ModifyThePassword}/>
                        </Button>
                        <Button type="primary" onClick={()=>this.exportAccount(this.props.accountName)}>
                            <FormattedMessage {...WalletMessages.ExportTheAccount}/>
                        </Button> */}
                    </div>
                </div>
            </div>
        )
    }
}