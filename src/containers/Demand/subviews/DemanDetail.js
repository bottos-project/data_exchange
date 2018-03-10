import React,{PureComponent} from 'react'
import { Carousel,Button,Tag } from 'antd';
import BTAssetList from '../../../components/BTAssetList'

import './styles.less'

export default class BTDemanDetail extends PureComponent{
    constructor(props){
        super(props)
    }

    commitAsset(){
        this.assetListModal.setState({
            visible:true
        })
    }

    handleFile(fileInfo){
        console.log({
            fileInfo
        })
    }

    render(){
        let data = this.props.location.state
        return(
            <div>

                <BTAssetList ref={(ref)=>this.assetListModal = ref} handleFile={(fileInfo)=>this.handleFile(fileInfo)}/>
            <div className="detailContentStyle">
                <div style={{padding:20}}>
                    <p><span>需求ID:</span>{data.requirement_id}</p>
                    <p><span style={{fontSize:15,fontWeight:'bold'}}>标题:</span>{data.requirement_name}</p>
                    <p><span style={{fontSize:15,fontWeight:'bold'}}>资产类型:</span>{data.feature_tag}</p>
                    <p><span style={{fontSize:15,fontWeight:'bold'}}>期望价格:</span>{data.price}</p>
                    <p><span style={{fontSize:15,fontWeight:'bold'}}>下架时间:</span>{data.expire_time}</p>
                    {/* <div>
                        <Tag color="cyan">便宜</Tag>
                        <Tag color="cyan">实用</Tag>
                        <Tag color="cyan">有价值</Tag>
                    </div> */}

                    <div className="detailOptions">
                        <ul>
                            {/* <li><Button type="primary" className="buyButton">购买</Button></li> */}
                            <li><a href={data.sample_path}><Button type="danger">下载样例</Button></a></li>
                            <li><Button type="primary" onClick={()=>this.commitAsset()}>提供资产</Button></li>
                        </ul>
                    </div>
                    
                    {/* <div className="row detailOptions">
                        <li><Button type="primary" className="buyButton">购买</Button></li>
                        <li><Button type="primary">下载样例</Button></li>
                    </div> */}
                </div>
            </div>
            <div className="detailDescribe">
                <p>{data.description}</p>
            </div>
            </div>
        )
    }
}