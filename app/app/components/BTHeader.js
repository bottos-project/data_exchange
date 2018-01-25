import React,{PureComponent} from 'react'
import './styles.less'

import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import * as headerActions from '../redux/actions/HeaderAction'
import {connect} from 'react-redux'
import {Button,Modal,Menu, Dropdown, Icon} from 'antd'
import BTRowMenu from '../components/BTRowMenu'

import BTPublishAssetModal from '../containers/Profile/Asset/subviews/BTPublishAssetModal'
import BTIcon from '../components/BTIcon'


class MenuLink extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Link style={{color:'white'}} {...this.props}/>
        )
    }
}


import BTPublishDemand from '../containers/Demand/subviews/PublishDemand'

const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link to="/profile/asset">资产</Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link to="profile/need">需求</Link>
        </Menu.Item>
        {/* <Menu.Item key="50">
            <Link to="/profile/wallet">钱包</Link>
        </Menu.Item>
        <Menu.Item key="60">
            <Link to="/profile/check">审核</Link>
        </Menu.Item> */}
        <Menu.Item key="2">
            <Link to="/profile/collect">收藏</Link>
        </Menu.Item>
        <Menu.Item key="3" disabled>
            <Link to="/profile/setting">设置</Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="4" disabled>
            <a href="#">登出</a>
        </Menu.Item>
    </Menu>
)


class BTHeader extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:true
        }
    }

    componentDidMount(){
        this.hidLoginView()
    }

    onLoginHandler(){
        this.showLoginView()
    }

    showLoginView(){
        this.props.headerActions.showLoginView({
            isShow:true
        })
    }

    hidLoginView(){
        this.props.headerActions.showLoginView({
            isShow:false
        })
    }

    handleOk(){
        this.props.headerActions.showLoginView({
            isShow:false
        })
    }

    handleCancel(e){
        this.props.headerActions.showLoginView({
            isShow:false
        })
    }

    handlePublishDemand(){
        this.publishModal.setState({
            visible:true
        })
    }

    handlePublishAsset(){
        this.publishAssetModal.setState({
            visible:true
        })
    }

    render(){
        return(
            <div className="container header">
                <BTPublishDemand ref={(ref)=>this.publishModal = ref}/>

                <BTPublishAssetModal ref={(ref)=>this.publishAssetModal = ref}/>

                <Modal
                    title="Basic Modal"
                    visible={this.props.headerState.isShow}
                    onOk={()=>this.handleOk()}
                    onCancel={()=>this.handleCancel()}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

               
                <div className="logoMenuStyle">
                    <div className="logoStyle">BOTTOS</div>
                </div>
                <div className="loginBtnStyle">
                    <Button onClick={()=>this.handlePublishDemand()} style={{marginRight:10}}>发布需求</Button>
                    <Button onClick={()=>this.handlePublishAsset()}>发布资产</Button>
                    {/* <Icon type="picture" style={{fontSize:30,color:'black'}}/>
                    <Icon type="video-camera" style={{fontSize:30,color:'black'}}/>
                    <Icon type="remind" style={{fontSize:30,color:'black'}}/> */}
                    
                    {/* <i className="iconfont icon-picture"></i> */}

                    {/* <i className="iconfont icon-picture"></i> */}

                    {/* <BTIcon type="icon-picture" style={{fontSize:50}}/> */}

                    <div className="marginLeft marginRight"><Link to="/profile/shopcart"><Icon type="shopping-cart" style={{fontSize:30,color:'black'}}/></Link></div>
                    <div>
                        <Dropdown overlay={menu}>
                            <img className="userIcon" 
                                src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1516257913&di=8e4a6c5bf89123bfa27db5c4b298a993&src=http://userimg.yingyonghui.com/head/03/1468655276295/6420803.png-thumb" 
                            />
                        </Dropdown>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        headerState:state.headerState
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        headerActions:bindActionCreators(headerActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BTHeader)