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
            map:[]
        }
    }

    componentDidMount(){
        BTFetch('/dashboard/GetNodeInfos','GET').then(res => {
            if (res && res.code == 0) {
                if (res.data == null) {
                    return ;
                }
                let node = [];
                for(let i of res.data){
                    node.push(i.address.split('|'));
                }
                this.props.setNodeInfos(res.data)
                this.setState({
                    map:node,
                })
            }
        }).catch(error=>error)
    }
    render() {
      // const routeParams = this.props.routeParams
      // if (routeParams.name == 'allblocks') {
      //   return <BTOtherBlocks newblock={(block)=>this.getNewBlock(block)} />
      // } else if (routeParams.name == 'alltransaction') {
      //   return <BTOtherExchange />
      // }
      if ( React.isValidElement(this.props.children) ) {
        return this.props.children
      }

      return (
        <div className="container column">
          <div>
              <BTOtherAllBlock />
          </div>
          <div>
              <BTMap node={this.state.map} />
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

export default connect()(BTOther)
