import React, {Component} from 'react'

import BTAssetCell from './subviews/AssetCell'
import {Pagination,message} from 'antd'
import Assetlist from './subviews/Assetlist'
import BTMyTag from '../../components/BTMyTag'
import BTFetch from '../../utils/BTFetch'
import {List} from 'antd'

const BTHeaderSearch = () => (
    <div className="searchViewStyle">
        <div>
            <BTMyTag>全部</BTMyTag>
            <BTMyTag>图像</BTMyTag>
            <BTMyTag>数据清洗</BTMyTag>

            <BTMyTag>全部</BTMyTag>
            <BTMyTag>视频</BTMyTag>
            <BTMyTag>音频</BTMyTag>
            <BTMyTag>图片</BTMyTag>
        </div>
        <div style={{marginTop:20}}>
        <BTMyTag>全部</BTMyTag>
        <BTMyTag>数据挖掘</BTMyTag>
        <BTMyTag>图像</BTMyTag>
        <BTMyTag>数据清洗</BTMyTag>

        <BTMyTag>全部</BTMyTag>
        <BTMyTag>视频</BTMyTag>
        <BTMyTag>音频</BTMyTag>
        </div>
    </div>
) ;

export default class BTAssets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            rowCount: 0,
            pageNum: ''
        };

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.getPagination(1,12)
    }

    onChange(page,pageSize) {
        // this.setState({dataSource:[]});
        this.getPagination(page,pageSize)
    }

    getPagination(page,pageSize) {
        let reqUrl = '/asset/query';
        let param = {
            "pageSize": pageSize,
            "pageNum": page,
        };
        BTFetch(reqUrl,'POST',param).then(response=>{
            if (response && response.code == 0) {
              const {rowCount, row} = response.data
                if (rowCount == 0 || !Array.isArray(row)) {
                    return ;
                }
                this.setState({
                    dataSource: row,
                    rowCount,
                });
            } else {
                message.error(window.localeInfo["Asset.FailedToQueryTheMarketSource"])
            }
        }).catch(error => {
            console.log(error)
            message.error(window.localeInfo["Asset.FailedToQueryTheMarketSource"])

        });
    }

    render() {

      if ( React.isValidElement(this.props.children) ) {
        return this.props.children
      }
        return (
            <div style={{width:"100%"}}>
                <List
                  dataSource={this.state.dataSource}
                  renderItem={(item) => (
                    <Assetlist key={item.asset_id} list={item} />
                  )}
                />

                <Pagination
                  hideOnSinglePage
                  showQuickJumper
                  total={this.state.rowCount}
                  defaultCurrent={1}
                  pageSize={12}
                  onChange={this.onChange}
                />

            </div>
        )
    }
}
