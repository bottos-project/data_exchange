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
import Transfer from "./tranfer";
import Wallet from './wallet'
import { Pagination } from 'antd';
import '../styles.less'
import History from "./history";
import BTFetch from '../../../../utils/BTFetch'
export default class Walletall extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            acount:0,
            history:[]
        }
    }
    componentDidMount(){
        let param={
            username:'btd121'
        }
        BTFetch('/user/getAccount','POST',(param),{
            service:'service',
        }).then(res=>{
            console.log(res.data);
            if(res.code == 1){
                this.setState({
                    acount:res.data
                })
            }

        });

    }
    render(){
        return (
            <div className='all'>
                <div className='wallet_all'>
                    <Transfer />
                    <Wallet acount={this.state.acount} />
                </div>
                <History />
            </div>


        )
    }
}
