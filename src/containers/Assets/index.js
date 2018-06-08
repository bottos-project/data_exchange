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
import React, {Component} from 'react'
import { List } from 'antd'
import AssetlistItem from './subviews/AssetlistItem'
import { BTRowFetch } from "@/utils/BTCommonApi";
import CustomTabBar from '@/components/CustomTabBar'
import { arTypeKeyMap } from '@/utils/keyMaps.js'

class BTAssets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            total: 0,
            activeKey: '0',
        };

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.getPagination(1, this.props.pageSize)
    }

    onChange(page,pageSize,asset_type=this.state.activeKey) {
        // this.setState({dataSource:[]});
        this.getPagination(page,pageSize,asset_type)
    }

    getPagination(page,pageSize,asset_type=0) {
        let reqUrl = '/asset/queryAllAsset';
        let param = {
          "page_num": page,
          "page_size": pageSize,
          asset_type: Number.parseInt(asset_type)
        };

        BTRowFetch(reqUrl, param).then(res => {
          this.setState({
            dataSource: res.row,
            total: res.total,
          })
        }).catch(err => {
          console.error(err);
          window.message.error(window.localeInfo["Asset.FailedToQueryTheMarketSource"])
        });
    }

    handleChange = (activeKey) => {
      this.setState({ activeKey });
      this.getPagination(1, this.props.pageSize, activeKey)
    }

    render() {

      if ( React.isValidElement(this.props.children) ) {
        return this.props.children
      }
      return (
        <div className='container column'>
          <CustomTabBar onChange={this.handleChange} keyMap={arTypeKeyMap} activeKey={this.state.activeKey} />
          <List
            grid={{ gutter: 16, column: 4, xxl: 5 }}
            dataSource={this.state.dataSource}
            renderItem={item => (
              <List.Item>
                <AssetlistItem key={item.asset_id} list={item} />
              </List.Item>
            )}
            pagination={{
              hideOnSinglePage: true,
              showQuickJumper: this.state.total / this.props.pageSize > 10,
              pageSize: this.props.pageSize,
              total: this.state.total,
              onChange: this.onChange
            }}

          />
        </div>
      )
    }
}

BTAssets.defaultProps = {
  pageSize: 16
};

export default BTAssets
