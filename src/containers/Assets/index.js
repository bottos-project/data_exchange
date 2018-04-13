import React,{PureComponent} from 'react'

import BTAssetCell from './subviews/AssetCell'
import {Pagination,message} from 'antd'
import Assetlist from './subviews/Assetlist'
import BTMyTag from '../../components/BTMyTag'
import BTFetch from '../../utils/BTFetch'
import {List} from 'antd'

import BTAssetTitle from "./subviews/BTAssetTitle";
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

export default class BTAssets extends PureComponent{
    constructor(props){
        super(props);
        this.onChange=this.onChange.bind(this)
        this.state={
            dataSource:[],
            rowCount:'',
            pageNum:''
        };
    }
    componentDidMount(){
        this.getPagination(1,12)
    }
    onChange(page,pageSize){
        this.setState({dataSource:[]});
        this.getPagination(page,pageSize)
    }
    getPagination(page,pageSize){
        let reqUrl = '/asset/query';
        let param={
            "pageSize":pageSize,
            "pageNum":page,
        };
        BTFetch(reqUrl,'POST',param).then(response=>{
            if(response&&response.code==0){
                if(response.data.rowCount==0){
                    return;
                }
                let dataSource  = response.data && response.data.Row;
                this.setState({
                    dataSource:response.data.row,
                    rowCount:response.data.rowCount,
                });
            }else{
                message.error(window.localeInfo["Asset.FailedToQueryTheMarketSource"])
            }
        }).catch(error=>{
            console.log(error)
            message.error(window.localeInfo["Asset.FailedToQueryTheMarketSource"])

        });
    }
    render(){
        return(
            <div style={{width:"100%"}}>
                <BTAssetTitle />
                {/* <BTHeaderSearch/> */}
                <div style={{width:"100%"}}>
                    <List
                        dataSource={this.state.dataSource||[]}
                        renderItem={(item)=>(
                            <Assetlist list={item} />
                        )}
                    />
                </div>
                <Pagination hideOnSinglePage showQuickJumper total={this.state.rowCount} defaultCurrent={1} pageSize={12} onChange={this.onChange}/>

            </div>
        )
    }
}