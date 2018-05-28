import React, {Component} from 'react'

// import BTAssetCell from './subviews/AssetCell'
import {Pagination, List} from 'antd'
import Assetlist from './subviews/Assetlist'
import BTMyTag from '../../components/BTMyTag'
import BTFetch from '../../utils/BTFetch'
import CustomTabBar from '@/components/CustomTabBar'

// const keyMap = ['All', 'Text', 'Picture', 'Voice', 'Video']
import { arTypeKeyMap } from '@/utils/keyMaps.js'

export default class BTAssets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            row_count: 0,
            activeKey: '0',
            keyMap:[]
        };

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.getPagination(1, 10)
        this.setKeyMap()
    }

    setKeyMap(){
        let keyMapZh = ["全部","文本","图片","声音","视频"]
        let keyMapEn = ['All', 'Text', 'Picture', 'Voice', 'Video']
        let storage = window.localStorage;
        let locale = storage.getItem('locale')
        console.log({locale})
        if(locale=='en-US'){
            this.setState({keyMap:keyMapEn})
        }else{
            this.setState({keyMap:keyMapZh})
        }
    }

    onChange(page,pageSize,assetType=this.state.activeKey) {
        // this.setState({dataSource:[]});
        this.getPagination(page,pageSize,assetType)
    }

    getPagination(page,pageSize,assetType=0) {
        let reqUrl = '/asset/queryAllAsset';
        let param = {
            "page_size": pageSize,
            "page_num": page,
            asset_type: Number.parseInt(asset_type)
        };

        BTFetch(reqUrl,'POST',param).then(response=>{
            // console.log('response', response)
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
          <CustomTabBar onChange={this.handleChange} keyMap={this.state.keyMap} activeKey={this.state.activeKey} />
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
