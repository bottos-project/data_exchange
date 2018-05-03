import React, { PureComponent } from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import './styles.less';
import BTList from '../../../components/BTList'

import BTAssetDetail from './subviews/BTAssetDetail'
import BTUploadAsset from './subviews/BTUploadAsset'
import BTHaveBought from "./subviews/BTHaveBought"
import BTMyAssetSet from "./subviews/BTMyAssetSet"
import BTFetch from "../../../utils/BTFetch";
import { FormattedMessage } from 'react-intl'
import messages from '../../../locales/messages'
const PersonalAssetMessages = messages.PersonalAsset;

export default class BTProfileAsset extends PureComponent{
    render(){
      if ( React.isValidElement(this.props.children) ) {
        return this.props.children
      }
        return(
            <div style={{width:"100%"}}>
                <Tabs className="tabs">

                    <TabPane tab={<FormattedMessage {...PersonalAssetMessages.PublishedAsset}/>} key="2">
                        <BTAssetDetail/>
                    </TabPane>
                    <TabPane tab={<FormattedMessage {...PersonalAssetMessages.HaveBoughtAsset}/>} key="3" >
                        <BTHaveBought/>
                    </TabPane>
                    <TabPane tab={<FormattedMessage {...PersonalAssetMessages.MyAssetSet}/>} key="4">
                        <BTMyAssetSet/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
