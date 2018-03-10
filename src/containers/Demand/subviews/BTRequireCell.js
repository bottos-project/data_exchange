import React,{PureComponent} from 'react'
import BTAssetList from '../../../components/BTAssetList'
import {Link} from 'react-router'
import './styles.less'

import {Icon} from 'antd'
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
export default class BTRequireCell extends PureComponent{
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
        let data = this.props
        let linkto = this.props.linkto || '/'
        let path = {
            pathname:linkto,
            state:data
        }
        return <div className='list'>
            <BTAssetList ref={(ref)=>this.assetListModal = ref} handleFile={(fileInfo)=>this.handleFile(fileInfo)}/>
            <div className="img">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt="logo" width="250"/>
                <p></p>
            </div>
            <div className="main">
                <div className='title'>
                    <h4><Link to={path}>{data.requirement_name}</Link></h4>
                    <p>发布人：{data.username}&nbsp;<span>有效时间：</span>{data.expire_time}</p>
                </div>
                <div className="font">{data.description} </div>
                <ul className="ant-list-item-action infomation" style={{marginLeft:0}}>
                    <li><IconText type="star-o" text="156" /></li>
                    <li><IconText type="like-o" text="156" /></li>
                    <li><IconText type="message" text="2" /></li>
                </ul>
            </div>
            <div className="down">
                <em></em>
                <div className="icon">
                    <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" width='32' alt=""/>
                    <span>{data.price}</span>
                </div>
                <p onClick={()=>this.commitAsset()}>提交资产</p>
            </div>
        </div>
    }
}