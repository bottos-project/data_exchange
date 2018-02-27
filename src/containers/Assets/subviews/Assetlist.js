import React,{PureComponent} from 'react'
import {Link} from 'react-router'
import './styles.less'

import {Icon} from 'antd'
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
export default class Assetlist extends PureComponent{
    constructor(props){
        super(props)
    }
    commitAsset(){
        this.assetListModal.setState({
            visible:true
        })
    }
    render(){
        var linkto=this.props.linkto||'/';
        return <div className='list'>
            {/*<BTAssetList ref={(ref)=>this.assetListModal = ref}/>*/}
            <div className="img">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt="logo" width="250"/>
                <p></p>
            </div>
            <div className="main">
                <div className='title'>
                    <h4><Link to={linkto}>年轻人表情图标</Link></h4>
                    <p>发布人：John</p>
                </div>
               <div className="tag">
                   <span>图片</span>
                   <span>数据挖掘</span>
                   <span>表情</span>
                   <span>微笑</span>
               </div>
                <div className="font">
                    We supply a series of design principles, practical
                    patterns and high quality design resources (Sketch and Axure),
                    to help people create their product prototypes beautifully and efficiently.

                </div>
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
                    <span>300</span>
                </div>
                <div className='bottom'>
                    <span>购买</span>
                    <Link to="/profile/shopcart"><Icon type="shopping-cart" style={{fontSize:30,color:'black'}}/></Link>
                </div>
                {/*<p onClick={()=>this.commitAsset()}>提交资产</p>*/}
            </div>
        </div>
    }
}
