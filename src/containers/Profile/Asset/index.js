import React,{PureComponent} from 'react'
import { Table, Badge, Menu, Dropdown, Icon,Upload, message, Button, Tabs, Input,Cascader  } from 'antd';
import moment from 'moment';
import './styles.less';
import BTList from '../../../components/BTList'

import BTAssetDetail from './subviews/BTAssetDetail'
import BTUploadAsset from './subviews/BTUploadAsset'
import BTHaveBought from "./subviews/BTHaveBought"
import BTMyAssetSet from "./subviews/BTMyAssetSet"
import BTFetch from "../../../utils/BTFetch";
import BTAssetTitle from "./subviews/BTAssetTitle";
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const PersonalAssetMessages = messages.PersonalAsset;
const TabPane = Tabs.TabPane;

export default class BTProfileAsset extends PureComponent{
    constructor(props){
        super(props)
    }


    render(){

        return(
            <div style={{width:"100%"}}>
                <BTAssetTitle/>
                <div>
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
            </div>
        )
    }
}














