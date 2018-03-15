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
                        {/*<TabPane tab="发布资产" key="1">*/}
                            {/*<BTUploadAsset/>*/}
                        {/*</TabPane>*/}
                        <TabPane tab="已发布资产" key="2">
                            <BTAssetDetail/>
                        </TabPane>
                        <TabPane tab="已购买资产" key="3" >
                            <BTHaveBought/>
                        </TabPane>
                        <TabPane tab="我的资产库" key="4">
                            <BTMyAssetSet/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}














