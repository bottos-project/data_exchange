import React,{PureComponent} from 'react'
import { Table, Badge, Menu, Dropdown, Icon,Upload, message, Button, Tabs, Input,Cascader  } from 'antd';
import moment from 'moment';
import './styles.less';
import BTList from '../../../components/BTList'
import BTAssetDetail from './subviews/BTAssetDetail'
import BTMyAssetSet from "./subviews/BTMyAssetSet"
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const PersonalDemandMessages = messages.PersonalDemand;
const TabPane = Tabs.TabPane;

export default class BTProfileNeed extends PureComponent{
  render() {
    return (
      <div style={{width:"100%"}}>
        <Tabs>
          <TabPane tab={<FormattedMessage {...PersonalDemandMessages.PublishedDemand}/>} key="2">
            <BTAssetDetail/>
          </TabPane>
          {/*<TabPane tab="我的资源库" key="3">
            <BTMyAssetSet/>
          </TabPane>*/}
        </Tabs>
      </div>
    )
  }
}
