import React,{PureComponent} from 'react'

import BTAssetCell from './subviews/AssetCell'
import {Pagination} from 'antd'
import Assetlist from './subviews/Assetlist'
import BTMyTag from '../../components/BTMyTag'
import BTFetch from '../../utils/BTFetch'
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
            data:[]
        };
    }
    componentDidMount(){
        var param={
            "userName": "btd121",
            "random": Math.ceil(Math.random()*100),
            "signatures": "0xxxx"
        }
        BTFetch('http://10.104.21.10:8080/v2/asset/queryAllAsset','POST',JSON.stringify(param),{
            full_path:true,
        }).then(response=>{
            if(response.code==1){
                let data=JSON.parse(response.data);
                console.log(data)
                this.setState({
                    data:data,
                })
            }
        });
    }
    onChange(pageNumber){
        console.log('Page:',pageNumber)
    }
    render(){
        return(
            <div>
                <BTHeaderSearch/>

                <div style={{marginTop:20}}>
                    <ul>
                        {
                            this.state.data.map((value,index)=>{
                                return (

                                    <li key={index}><Assetlist list={value} /></li>
                                )
                            })
                        }
                        {/*<li><Assetlist linkto="/assets/detail"/></li>    linkto="/assets/detail"*/}
                        {/*<li><Assetlist linkto="/assets/detail"/></li>*/}
                        {/*<li><Assetlist linkto="/assets/detail"/></li>*/}
                        {/*<li><Assetlist linkto="/assets/detail"/></li>*/}
                        {/*<li><Assetlist linkto="/assets/detail"/></li>*/}
                        {/*<li><Assetlist linkto="/assets/detail"/></li>*/}
                        {/*<li><Assetlist linkto="/assets/detail"/></li>*/}

                    </ul>
                </div>

                <div style={{marginBottom:20}}>
                    <Pagination showQuickJumper  onChange={(e)=>this.onChange(e)} defaultCurrent={1} pageSize={4} total={this.state.data.length} />
                </div>
            </div>
        )
    }
}