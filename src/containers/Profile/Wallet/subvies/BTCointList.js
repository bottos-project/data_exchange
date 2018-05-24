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
		// 	"balance": 1000 * Math.pow(10,10),
		// 	"cny": 100,
		// 	"usd": 16
		// },
		// {
		// 	"name": "sto",
		// 	"balansd": 16
        // }]ce": 90000 * Math.pow(10,10),
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
