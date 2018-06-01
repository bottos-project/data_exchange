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
            grid={{ gutter: 16, column: 4 }}
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
