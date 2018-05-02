import React,{PureComponent} from 'react'
import { Table, Badge, Menu, Dropdown, Icon,Upload, message, Button, Tabs, Input,Cascader  } from 'antd';
import moment from 'moment';
import './styles.less';
import BTList from '../../../components/BTList'
import BTAssetDetail from './subviews/BTAssetDetail'
import BTUploadAsset from './subviews/BTUploadAsset'
import BTMyAssetSet from "./subviews/BTMyAssetSet"
import BTDemandTitle from "./subviews/BTAssetTitle";
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const PersonalDemandMessages = messages.PersonalDemand;
const TabPane = Tabs.TabPane;

export default class BTProfileNeed extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){

        return(
            <div style={{width:"100%"}}>
                <BTDemandTitle/>
                <Tabs>
                    {/*<TabPane tab="发布需求" key="1">*/}
                        {/*<BTUploadAsset/>*/}
                    {/*</TabPane>*/}
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
