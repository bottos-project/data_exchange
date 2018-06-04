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
import { Pagination, Icon } from 'antd';
import BTFetch from '../../../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const WalletMessages = messages.Wallet;
class Detail extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            history:[],
        }
    }
    render(){
        let data = this.props.historydetail;
        // console.log(this.state.history);
        return <div className="detail">
           {/* {
                this.state.history.length == 0 ? <span></span>
                    :
                    ( <div className='left'>
                        <p><span>交易号&nbsp;:&nbsp;</span><span>{data.tx_id}</span></p>
                        <p><span>Form&nbsp;:&nbsp;</span><span>{data.from}</span></p>
                        <p><span>时间&nbsp;:&nbsp;</span><span>{data.tx_time}</span></p>

                    </div>
                    <div className="right">
                        <p><span>块号&nbsp;:&nbsp;</span><span>{data.block_num}</span></p>
                        <p><span>To&nbsp;:&nbsp;</span><span>{data.to}</span></p>
                        <p><span>金额&nbsp;:&nbsp;</span><span>转出&nbsp;{data.price}BTO</span></p>
                    </div>
                )
            }*/}
            <div className='left'>
                <p>
                    <span>
                        <FormattedMessage {...WalletMessages.TransactionID}/>
                    </span>
                    <span>
                        {data.tx_id}
                    </span>
                </p>
                <p>
                    <span>
                        <FormattedMessage {...WalletMessages.From}/>
                    </span>
                    <span>
                        {data.from}
                    </span>
                </p>
                <p>
                    <span>
                        <FormattedMessage {...WalletMessages.Date}/>
                    </span>
                    <span>
                        {data.tx_time}
                    </span>
                </p>

            </div>
            <div className="right">
                <p>
                    <span>
                        <FormattedMessage {...WalletMessages.BlockNumber}/>
                    </span>
                    <span>
                        {data.block_num}
                    </span>
                </p>
                <p>
                    <span>
                        <FormattedMessage {...WalletMessages.To}/>
                    </span>
                    <span>
                        {data.to}
                    </span>
                </p>
                <p>
                    <span>
                        <FormattedMessage {...WalletMessages.Price}/>
                    </span>
                <span>
                    <FormattedMessage {...WalletMessages.TurnOut}/>
                    {data.price}BTO
                </span>
                </p>
            </div>
        </div>
    }
}
export default class History extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            history:[],
            historydetail1:[]
        }
    }


    componentDidMount(){
        //转账历史记录
        let url='/user/QueryTransfer';
        let data={
            "userName": "btd121",
            "random": "fileName123",
            "signatures": "0xxxx"
        };
        BTFetch(url,'post',data,{
            full_path:true,
        }).then(res=>{
            if(res.code == '1'){
                let history=JSON.parse(res.data);
                this.setState({
                    history:history,
                });
                console.log(this.state.history)
            }
        });
    }
    handleOver(e){

        this.setState({
            historydetail1:(this.state.history)[e],
        });
        console.log(e,this.state.historydetail1)

        // e.target.parentNode.after(_detail);
    }
    render(){
        return (
            <div className="history">
                <header>Transfer History  </header>
                <ul className='ul' style={{height:'210px',overflow:'hidden'}}>
                    <li style={{background:''}}>
                        <span className='icon'>&nbsp;</span>
                        <span className='exhash'>交易号</span>
                        <span className='age'>时间</span>
                        <span className='coin'>金额</span>
                        <span className='from'>From</span>
                        <span className='in_out'>&nbsp;</span>
                        <span className='to'>To</span>
                        {/*<span className='account'>账户名称</span>*/}
                        <span className="account_address">区块号</span>
                    </li>
                    {
                        this.state.history.map((data,index)=>{
                            let date1 = new Date(data.age).toLocaleString();
                            return (
                                <li key={index} onClick={()=>this.handleOver(index)}>
                                    <span className='icon'>
                                        <img src="./img/show.png" alt=""/>
                                        <img src="./img/info.png" alt=""/>

                                    </span>
                                    <span className="exhash">{data.tx_id}</span>
                                    <span className='age'>{data.tx_time}</span>
                                    <span className='coin'>{data.price}</span>
                                    <span className='from'>{data.from}</span>
                                    <span className='in_out'>
                                        <Icon type="arrow-right" style={{ fontSize: 16, color: '#00b1a9' }} />
                                    </span>
                                    <span className='to'>{data.to}</span>
                                    {/*<span className='account'>{data.account}</span>*/}
                                    <span className='account_address'>{data.block_num}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                <Detail historydetail={1} />

                <Pagination showQuickJumper defaultCurrent={2} total={20}  />

            </div>
        )
    }
}
