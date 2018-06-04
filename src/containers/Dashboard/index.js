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
import BTDashboardChart from './subviews/BTDashboardChart'
import "./subviews/dashboardStyle.less"
import BTFetch from "../../utils/BTFetch";
import {FormattedMessage} from 'react-intl'
import messages from '../../locales/messages'
const DashboardMessages = messages.Dashboard;

function DashboardDetail({onClick, intl, total, isActive}) {
  return (
    <div onClick={onClick}
      className={'dashboard-detail-container' + (isActive ? ' active' : '')}
    >
      <p><FormattedMessage {...DashboardMessages[intl]} /></p>
      {/*<p>
          <FormattedMessage {...DashboardMessages.Yesterday}/>
      </p>*/}
      <span>{total}</span>
    </div>
  )
}

export default class BTDashboard extends PureComponent {
  constructor(props){
      super(props);
      this.state={
          num:[],
          ExchangeNum:[],
          ExchangeCoin:[],
          NewAsset:[],
          NewRequire:[],
          dataKey:'',
          type:'',

          AccountNum:'',
          TxNum:'', // 交易量
          TxAmount:'', // 交易金额
          AssetNum:'', // 资产总量
          RequirementNum:'', // 需求总量
      }

      this.exchangeCoin = this.exchangeCoin.bind(this)
      this.assetNum = this.assetNum.bind(this)
      this.requireNum = this.requireNum.bind(this)
  }

  getAccount = () => {
    BTFetch('/dashboard/getAccountNumByDay', 'post').then(res => {
      if (res && res.code == 1) {
        if (res.data.length == 0) {
          return;
        }
        let AccountNum = [];
        for (let i of res.data) {
          let time = (new Date(i.time * 1000)).toLocaleDateString();
          AccountNum.push({day: time, AccountNum: i.count})
        }
        this.setState({
          // AccountNum,
          num: AccountNum,
          dataKey: 'AccountNum',
          type: <FormattedMessage {...DashboardMessages.Registration}/>,
        })
      }
    });
  }

  exchangeNum = () => {
    BTFetch('/dashboard/GetTxNumByDay', 'post').then(res => {
      if (res && res.code == 1) {
        if (res.data.length == 0) {
          return;
        }
        let ExchangeNum=[];
        for (let i of res.data) {
          let time=(new Date(i.time *1000)).toLocaleDateString();
          ExchangeNum.push({day:time,ExchangeNum:i.count})
        };
        this.setState({
          ExchangeNum,
        })
      }
    }).then(res => {
      this.setState({
        num: this.state.ExchangeNum,
        dataKey: 'ExchangeNum',
        type: <FormattedMessage {...DashboardMessages.VolumeOfTransaction}/>
      })
    })
  }

  async exchangeCoin(){
       await BTFetch('/dashboard/GetTxAmountByDay','post')
           .then(res=>{
               if(res&&res.code==1){
                   let ExchangeCoin=[];
                   for(let i of res.data){
                       let time=(new Date(i.time *1000)).toLocaleDateString();
                       ExchangeCoin.push({day:time,ExchangeCoin:i.count / Math.pow(10, 8)})
                   };
                   this.setState({
                       ExchangeCoin,
                   })
               }
           });
        this.setState({
            num:this.state.ExchangeCoin,
            dataKey:'ExchangeCoin',
            type:<FormattedMessage {...DashboardMessages.TransactionAmount }/>
        })
    }

  async assetNum(){
    await BTFetch('/dashboard/GetAssetNumByDay', 'post').then(res=>{
       if (res.code == 1) {
           let NewAsset=[];
           for(let i of res.data){
               let time=(new Date(i.time *1000)).toLocaleDateString();
               NewAsset.push({day:time,NewAsset:i.count})
           };
           this.setState({
               NewAsset,
           })
       } else {
         console.log('暂无数据', res.code);
       }
    });
    this.setState({
        num:this.state.NewAsset,
        dataKey:'NewAsset',
        type:<FormattedMessage {...DashboardMessages.IncrementalAsset }/>
    })
  }

  async requireNum(){
        await BTFetch('/dashboard/GetRequirementNumByDay','post')
            .then(res=>{
                if(res.code==1){
                    let NewRequire=[];
                    for(let i of res.data){
                        let time=(new Date(i.time *1000)).toLocaleDateString();
                        NewRequire.push({day:time,NewRequire:i.count})
                    };
                    this.setState({
                        NewRequire,
                    })
                }
            });
        this.setState({
            num:this.state.NewRequire,
            dataKey:'NewRequire',
            type:<FormattedMessage {...DashboardMessages.IncrementalDemand }/>
        })
    }

  componentDidMount() {
      BTFetch('/dashboard/GetAllTypeTotal', 'post').then(res => {
        if (res.code != 1) return;

        let data = res.data;
        if (data.length == 0) return;

        const validatedKeys = ['AccountNum', 'TxNum', 'TxAmount', 'AssetNum', 'RequirementNum']
        let obj = {}
        for (let item of data) {
          if ( validatedKeys.includes(item.type) ) {
            if (item.type == 'TxAmount') {
              obj[item.type] = parseFloat((item.total / Math.pow(10, 8)).toFixed(3))
            } else {
              obj[item.type] = item.total
            }
          }
        }
        // console.log('obj', obj);
        this.setState(obj);
      });
      //注册人数
      this.getAccount()

  }

  render() {
    return (
      <div className="container column">
        <div className="DashboardBlockDetails radius shadow" >
          <DashboardDetail
            onClick={this.getAccount}
            intl='Registration'
            total={this.state.AccountNum}
            isActive={this.state.dataKey == 'AccountNum'}
          />
          <DashboardDetail
            onClick={this.exchangeNum}
            intl='VolumeOfTransaction'
            total={this.state.TxNum}
            isActive={this.state.dataKey == 'ExchangeNum'}
          />
          <DashboardDetail
            onClick={this.exchangeCoin}
            intl='TransactionAmount'
            total={this.state.TxAmount}
            isActive={this.state.dataKey == 'ExchangeCoin'}
          />
          <DashboardDetail
            onClick={this.assetNum}
            intl='IncrementalAsset'
            total={this.state.AssetNum}
            isActive={this.state.dataKey == 'NewAsset'}
          />
          <DashboardDetail
            onClick={this.requireNum}
            intl='IncrementalDemand'
            total={this.state.RequirementNum}
            isActive={this.state.dataKey == 'NewRequire'}
          />
        </div>
        <BTDashboardChart type={this.state.type} dkey={this.state.dataKey} num={this.state.num}/>
      </div>
    )
  }
}
