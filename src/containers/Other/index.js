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
import { Link } from 'react-router'
import { Col, Row } from 'antd'
import BTOtherAllBlock from "./subviews/BTOtherAllBlock";
import BTMap from "./subviews/BTMap"
import BTOtherBlocks from "./subviews/BTOtherBlocks";
import BTOtherExchange from "./subviews/BTOtherExchange";
import BTFetch from "../../utils/BTFetch";
import {FormattedMessage} from 'react-intl'

import messages from '@/locales/messages'
const BlockBrowsingMessages = messages.BlockBrowsing;

class BTOther extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            list:[],
            block_view:[],
            Total_BTO:'',
            Total_Trans:'',
            newblock:'',
            nodes:[],
            Total_Nodes:''
        }
    }

    componentDidMount(){
        this.getMaps()
    }


    getMaps(){
      let url = '/dashboard/GetNodeInfos'
      BTFetch(url,'GET').then(response=>{
          if(response && response.code==1){
              let data = response.data
              // let nodes = data.row
              // let Total_Nodes = data.row_count
              this.setState({nodes: data, Total_Nodes: data.length})
          }
      }).catch(error => {
        console.error(error);
      })
    }


    render() {
      // const routeParams = this.props.routeParams
      // if (routeParams.name == 'allblocks') {
      //   return <BTOtherBlocks newblock={(block)=>this.getNewBlock(block)} />
      // } else if (routeParams.name == 'alltransaction') {
      //   return <BTOtherExchange />
      // }
      const { locale, children } = this.props
      if ( React.isValidElement(children) ) {
        return children
      }

      return (
        <div className="container column">
          <div>
              <BTOtherAllBlock Total_Nodes={this.state.Total_Nodes}/>
          </div>
          <div>
              <BTMap node={this.state.nodes} locale={locale} />
          </div>
          <Row gutter={16}>
            <Col span={12}>
              <div className="blockView">
                <h3>
                  <FormattedMessage {...BlockBrowsingMessages.Block}/>
                </h3>
                <Link to='/blocks/allblocks'>
                  <FormattedMessage {...BlockBrowsingMessages.All} />
                  &gt;&gt;&gt;
                </Link>
              </div>

              <BTOtherBlocks />
            </Col>
            <Col span={12}>
              <div className="blockView">
                <h3>
                  <FormattedMessage {...BlockBrowsingMessages.Transaction} />
                </h3>
                <Link to='/blocks/alltransaction'>
                  <FormattedMessage {...BlockBrowsingMessages.All} />
                  &gt;&gt;&gt;
                </Link>
              </div>

              <BTOtherExchange />
            </Col>
          </Row>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  const { locale } = state.headerState
  return { locale }
}

export default connect(mapStateToProps)(BTOther)
