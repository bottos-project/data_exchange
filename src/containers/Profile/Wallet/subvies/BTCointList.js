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
        // this.getAccountList(this.props.selectWallet)
        this.getUserBalance()
    }

    componentWillReceiveProps(nextProps){
        let selectWallet = nextProps.selectWallet;
        this.getAccountList(selectWallet)
    }

    getUserBalance(){
        console.log("getUserBalance")
        let balanceList = [{
			"name": "bto",
			"balance": 1000 * Math.pow(10,10),
			"cny": 100,
			"usd": 16
		},
		{
			"name": "sto",
			"balance": 90000 * Math.pow(10,10),
			"cny": 100,
			"usd": 16
        }]
        
        this.setState({accoutList:balanceList})
    }

    getAccountList(selectWallet){
        let reqUrl = '/user/getAccount'
        let params = {
            username:selectWallet
        }

        BTFetch(reqUrl,'POST',params).then(response=>{
            if(response && response.code=="1"){
                let data = response.data;
                let accoutList = [
                    {
                        coinName:'BTO',
                        coinNum:data
                    }
                ]

                this.setState({
                    accoutList
                })
            }
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
