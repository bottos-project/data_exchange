import React,{PureComponent} from 'react'
import { Table, Badge, Menu, Dropdown, Icon,Upload, message, Button, Tabs, Input,Cascader  } from 'antd';
import moment from 'moment';
import './styles.less';
import BTList from '../../../components/BTList'
import BTAssetDetail from './subviews/BTAssetDetail'
import BTUploadAsset from './subviews/BTUploadAsset'
import BTMyAssetSet from "./subviews/BTMyAssetSet"

const TabPane = Tabs.TabPane;

export default class BTProfileNeed extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){

        return(
            <div style={{width:"90%"}}>
                <Tabs>
                    <TabPane tab="发布需求" key="1">
                        <BTUploadAsset/>
                    </TabPane>
                    <TabPane tab="已发布需求" key="2">
                        <BTAssetDetail/>
                    </TabPane>
                    <TabPane tab="我的资源库" key="3">
                        <BTMyAssetSet/>
                    </TabPane>

                </Tabs>
            </div>
        )
    }
}














