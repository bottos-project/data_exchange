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
import { connect } from 'react-redux'
import BTFetch from '../../../utils/BTFetch'
import "../styles.less"
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const BlockBrowsingMessages = messages.BlockBrowsing;

class BTOtherAllBlock extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            block_view:[],
            Total_BTO:'',
            Total_Trans:'',
            Total_Nodes:''
        }
    }
    componentDidMount(){
        //获取Total_BTO总量
        /*BTFetch('/dashboard/GetSumTxAmount','GET').then(res=>{
            if(res&&res.code == 1){
                this.setState({
                    Total_BTO:res.data.num
                })
            }
        });*/
        //获取Total_Trans总量
        BTFetch('/dashboard/GetTxNum','GET').then(res=>{
            console.log({res:res})
            if(res&&res.code == 1){
                this.setState({
                    Total_Trans:res.data.num
                })
            }
        });
    }


    render(){
        return (
            <div>
                <div className="OtherBlockDetails radius shadow">
                    {/* <div>
                        <div>
                            <span>
                                <FormattedMessage {...BlockBrowsingMessages.TotalBTO}/>
                            </span>
                        </div>
                        <p>1,000,000,000</p>
                    </div> */}
                    <div>
                        <div>
                            <span>
                                <FormattedMessage {...BlockBrowsingMessages.LastBlock}/>
                            </span>
                        </div>
                        <p>{this.props.lastBlockNum} </p>
                    </div>
                    <div>
                        <div>
                            <span>
                                <FormattedMessage {...BlockBrowsingMessages.TotalTrans}/>
                            </span>
                        </div>
                        <p>{this.state.Total_Trans}</p>
                    </div>
                    <div>
                        <div>
                             <span>
                                 <FormattedMessage {...BlockBrowsingMessages.TotalNodes}/>
                             </span>
                        </div>
                        <p>{this.props.Total_Nodes}</p>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
  const { latestBlock, nodeInfos } = state.blockState
  const lastBlockNum = latestBlock ? latestBlock.block_number : 0
  const totalNodeNum = nodeInfos.length
  return { lastBlockNum, totalNodeNum }
}

export default connect(mapStateToProps)(BTOtherAllBlock)
