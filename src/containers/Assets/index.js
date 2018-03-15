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
        this.state={
            list:[1,2,3,4],
            current:1,
            data:[],
            dataSource:[]
        };
    }
    componentDidMount(){
        let param={
            "userName": "btd121",
            "random": Math.ceil(Math.random()*100),
            "signatures": "0xxxx"
        };
        BTFetch('/asset/queryAllAsset','POST',JSON.stringify(param),{
            full_path:false,
            service:'service'
        }).then(response=>{
            if(response.code==1){
                let data=JSON.parse(response.data);
                console.log(data);
                let dataSource  = response.data && response.data.Row;
                this.setState({
                    dataSource:JSON.parse(response.data)
                })
                this.setState({
                    data:data,
                })
            }else{
                message.error('市场资源查询失败')
            }
        }).catch(error=>{
            console.log(error)
            message.error('市场资源查询失败')

        });
    }
    onChange(pageNumber){
        console.log('Page:',pageNumber)
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
            </div>
        )
    }
}