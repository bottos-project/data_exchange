import React,{PureComponent} from 'react'

import {List,Button} from 'antd'
import BTFetch from '../../../../utils/BTFetch';
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const WalletMessages = messages.Wallet;
const dataSource = [
    {
        accountName:'BTO'
    }
]

export default class BTAccountList extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            accoutList:[]
        }
    }
    componentDidMount(){
        let reqUrl = '/user/getAccount'
        let params = {
            username:JSON.parse(window.localStorage.account_info).username||''
        }

        BTFetch(reqUrl,'POST',params).then(response=>{
            if(response && response.code=="1"){
                let data = response.data;
                let accoutList = [
                    {
                        accountName:'BTO',
                        token:data
                    }
                ]

                this.setState({
                    accoutList
                })
            }
        })
    }

    render(){
        return(
            <div className="container">
                <List
                    dataSource={this.state.accoutList}
                    style={{flex:1}}
                    renderItem={(item)=>{
                        return <BTAccountListCell {...item}/>
                    }}
                />
            </div>
        )
    }
}


class BTAccountListCell extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        let props = this.props;
        return(
            <div className="container">
                <div className="container accountItem" >
                    <div className="flex accountLeft">
                        <div>
                            <span className="font25 colorTitle">{props.accountName}</span>
                            <span>
                                <FormattedMessage {...WalletMessages.AvailableCash}/>
                            </span>
                        </div>
                        <div className="font25 colorRed">{props.token}</div>
                    </div>
                    <div>
                        <Button className="marginRight" type="primary" onClick={()=>this.changePwd(this.props.accountName)}>
                            <FormattedMessage {...WalletMessages.ModifyThePassword}/>
                        </Button>
                        <Button type="primary" onClick={()=>this.exportAccount(this.props.accountName)}>
                            <FormattedMessage {...WalletMessages.ExportTheAccount}/>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}