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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {hashHistory} from 'react-router'
import { Popconfirm, Tabs } from 'antd'
import CustomTabBar from '@/components/CustomTabBar'
import FavoriteAssetList from './subviews/FavoriteAssetList'
import FavoriteReqList from "./subviews/FavoriteReqList"

import BTFetch from '@/utils/BTFetch'
import { getSignaturedParam } from '@/utils/BTCommonApi'
import {getAccount} from "@/tools/localStore";

import { getDateAndTime } from '@/utils/dateTimeFormat'
import { getFavReqParam } from '@/components/BTFavoriteStar'

import {FormattedMessage} from 'react-intl'
import messages from '@/locales/messages'

const TabPane = Tabs.TabPane;
const CollectMessages = messages.Collect;

// const keyMap = ['asset', 'requirement']
const keyMap = [
  <FormattedMessage {...CollectMessages.Asset} />,
  <FormattedMessage {...CollectMessages.Demand} />,
]

class BTCollect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '0'
    };
  }

  handleChange = (activeKey, value) => {
    this.setState({ activeKey });
    // this.getPagination(1, this.props.pageSize, activeKey)
  }

  render() {
    return (
      <div className='container column'>
        {/* <CustomTabBar onChange={this.handleChange} keyMap={keyMap} activeKey={this.state.activeKey} /> */}

        {/* <Tabs className="tabs" activeKey={this.state.activeKey}>
          <TabPane tab={<FormattedMessage {...CollectMessages.Asset} />} key="0"> */}
            <FavoriteAssetList />
          {/* </TabPane>
          <TabPane tab={<FormattedMessage {...CollectMessages.Demand} />} key="1" >
            <FavoriteReqList />
          </TabPane>
        </Tabs> */}

      </div>
    )
  }
}

export default FavoriteAssetList
