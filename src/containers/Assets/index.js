import React, {Component} from 'react'

// import BTAssetCell from './subviews/AssetCell'
import {Pagination, List} from 'antd'
import Assetlist from './subviews/Assetlist'
import BTMyTag from '../../components/BTMyTag'
import BTFetch from '../../utils/BTFetch'
import CustomTabBar from '@/components/CustomTabBar'

const keyMap = ['All', 'Text', 'Picture', 'Voice', 'Video']

export default class BTAssets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [{"asset_id": "filehashtest","asset_name": "assetnametest","description": "destest","expire_time": 345,"feature_tag":12345,"op_type":1,"price":888,"sample_hash":"hasttest","sample_path":"pathtest","storage_hash":"sthashtest","storage_path":"stpathtest","upload_date": 999}],
            row_count: 0,
            page_num: '',
            activeKey: '0',
        };

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.getPagination(1, 10)
    }

    onChange(page,pageSize,assetType=this.state.activeKey) {
        // this.setState({dataSource:[]});
        this.getPagination(page,pageSize,assetType)
    }

    getPagination(page,pageSize,assetType=0) {
        let reqUrl = '/asset/queryAllAsset';
        let param = {
            "pageSize": pageSize,
            "pageNum": page,
            assetType:assetType
        };

        BTFetch(reqUrl,'POST',param).then(response=>{
            console.log({response})
            if (response && response.code == 1) {
              const {row_count, row} = response.data
                if (row_count == 0 || !Array.isArray(row)) {
                    return ;
                }
                this.setState({
                    dataSource: row,
                    row_count,
                });
            } else {
                window.message.error(window.localeInfo["Asset.FailedToQueryTheMarketSource"])
            }
        }).catch(error => {
            window.message.error(window.localeInfo["Asset.FailedToQueryTheMarketSource"])

        });
    }

    handleChange = (activeKey) => {
      this.setState({ activeKey });
      this.getPagination(1,10,activeKey)
    }

    render() {

      if ( React.isValidElement(this.props.children) ) {
        return this.props.children
      }
      return (
        <div className='container column'>
          <CustomTabBar onChange={this.handleChange} keyMap={keyMap} activeKey={this.state.activeKey} />
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={this.state.dataSource}
            renderItem={item => (
              <List.Item>
                <Assetlist key={item.asset_id} list={item} />
              </List.Item>
            )}
          />

          <Pagination
            hideOnSinglePage
            showQuickJumper
            total={this.state.row_count}
            defaultCurrent={1}
            pageSize={16}
            onChange={this.onChange}
          />

        </div>
      )
    }
}
