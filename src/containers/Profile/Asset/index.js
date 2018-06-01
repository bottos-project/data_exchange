import React, { PureComponent } from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import './styles.less';

import BTPublishedAssets from './subviews/BTPublishedAssets'
import BTHaveBought from "./subviews/BTHaveBought"
import BTFetch from "../../../utils/BTFetch";
import { FormattedMessage } from 'react-intl'
import messages from '../../../locales/messages'
const PersonalAssetMessages = messages.PersonalAsset;

import CustomTabBar from '@/components/CustomTabBar'


const keyMap = [
  <FormattedMessage {...PersonalAssetMessages.PublishedAsset} />,
  <FormattedMessage {...PersonalAssetMessages.HaveBoughtAsset} />,
]

export default class BTProfileAsset extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '0'
    };
  }
  handleChange = (key) => {
    this.setState({
      activeKey: key
    });
  }

  render(){
    if ( React.isValidElement(this.props.children) ) {
      return this.props.children
    }
    return(
      <div className='container column'>
        <CustomTabBar onChange={this.handleChange} keyMap={keyMap} activeKey={this.state.activeKey} />

        <Tabs className="tabs" activeKey={this.state.activeKey}>
          <TabPane tab={<FormattedMessage {...PersonalAssetMessages.PublishedAsset} />} key="0">
            <BTPublishedAssets/>
          </TabPane>
          <TabPane tab={<FormattedMessage {...PersonalAssetMessages.HaveBoughtAsset} />} key="1" >
            <BTHaveBought/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
