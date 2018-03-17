import React,{PureComponent} from 'react'
import './styles.less'
import {Link,hashHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import * as headerActions from '../redux/actions/HeaderAction'
import {connect} from 'react-redux'
import {Button,Modal,Menu, Dropdown, Icon,message} from 'antd'
import BTLogin from './Login'
import IsRegister from './Register'
import { injectIntl, FormattedMessage, defineMessages } from 'react-intl';
import BTPublishAssetModal from '../containers/Profile/Asset/subviews/BTPublishAssetModal'
import BTIcon from '../components/BTIcon'
import BTPublishDemand from '../containers/Profile/Need/subviews/publishDemandBox'
import BTFetch from '../utils/BTFetch'
import {importFile,exportFile} from '../utils/BTUtil'
import BTIpcRenderer from '../tools/BTIpcRenderer'
import {deleteAccount,isLogin} from '../tools/localStore'

const {dialog} = window.electron.remote

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

class BTHeader extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:true,
            isLogin:false
        }
    }

    // 设置本地化语言
    setLocale(){
        this.props.setLocale();
        // 主动刷新当前页面
        window.location.reload()
    }

    componentDidMount(){
        let loginState = isLogin()
        this.setState({
            isLogin:loginState
        })
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
    isShowLogin(){
        this.isLoginShow.setState({
            visible:true
        })
    }
    isRegister(){
        this.isRegisterShow.setState({
            visible:true
        })
    }

    isLogin(isLogin){
        this.setState({
            isLogin:isLogin
        })
    }

    logout(){
        let url = '/user/logout'
        BTFetch(url,'POST').then(response=>{
            if(response && response.code=='0'){
                deleteAccount()
                this.setState({isLogin:false})
                message.success('退出登录成功')
            }else{
                message.error('退出登录失败')
            }
        })
    }

    menu(){
        return(
            <Menu>
                <Menu.Item key="0">
                    <Link to="/profile/asset">
                        <FormattedMessage id='Menu.Asset' defaultMessage="资产"/>
                    </Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link to="/profile/need">需求</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/profile/collect">收藏</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/profile/setting">设置</Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="4">
                    <a href="#" onClick={()=>{this.logout()}}>登出</a>
                </Menu.Item>
            </Menu>
        )
    }

    importKeyStore(){
        let keyStore = BTIpcRenderer.importFile()
        BTIpcRenderer.saveKeyStore('keystore',keyStore)
    }

    exportKeyStore(){
        // 从本地取出keystore文件
        let keyStore = BTIpcRenderer.getKeyStore('keystore')
        exportFile(keyStore.result,'keystore.bto')

    }

    keyStoreMenu(){
        return(
            <Menu>
                <Menu.Item key="1"><a href="#" onClick={()=>this.importKeyStore()}>导入KeyStore</a></Menu.Item>
                <Menu.Item key="2"><a href="#" onClick={()=>this.exportKeyStore()}>导出KeyStore</a></Menu.Item>
            </Menu>
        )
    }

    checkMessages(){
        console.log("checkMessages")
    }


    render(){
        return(
            <div className="container header">
                <BTPublishDemand ref={(ref)=>this.publishModal = ref}/>

                <BTPublishAssetModal ref={(ref)=>this.publishAssetModal = ref}/>

                <BTLogin ref={(ref)=>this.isLoginShow = ref} onHandleLogin={(isLogin)=>this.isLogin(isLogin)}/>

                <IsRegister ref={(ref)=>this.isRegisterShow = ref}/>
                <Modal
                    title="Basic Modal"
                    visible={this.props.headerState.isShow}
                    onOk={()=>this.handleOk()}
                    onCancel={()=>this.handleCancel()}
                >
                </Modal>


                <div className="logoMenuStyle">
                    <div className="logoStyle">
                        <img src="./img/newLogo.svg" style={{maxWidth:150,minHeight:80}} alt=""/>
                    </div>
                </div>

                <div className="loginBtnStyle">
                    <Button onClick={()=>this.handlePublishDemand()} ><FormattedMessage id='Header.PublishDemand' defaultMessage="发布需求"/></Button>
                    <Button onClick={()=>this.handlePublishAsset()} >发布资产</Button>
                    <div>
                        {
                            this.state.isLogin ? 
                            <div className="center">
                                <Dropdown overlay={this.menu()}>
                                        <img className="userIcon"
                                            src="./img/usericon.jpeg"
                                        />
                                </Dropdown>
                                <Link to="/profile/check" style={{color:'rgba(0, 0, 0, 0.65)'}}><i className="iconfont icon-email" style={{fontSize:20,marginLeft:10}} onClick={()=>{this.checkMessages()}}/></Link>
                            </div>
                            
                            :
                            <div className='isLogin'><span onClick={()=>this.isShowLogin()}>登录</span>&nbsp;<span onClick={()=>this.isRegister()}>注册</span></div>
                        }
                    </div>

                    {/* <div>
                        <Dropdown overlay={this.keyStoreMenu()}>
                            <i className="iconfont icon-key" style={{fontSize:25,marginLeft:10}}/>
                        </Dropdown>
                    </div> */}

                    {/* <div className="marginLeft marginRight">
                        <BTIcon type="icon-email" style={{fontSize:20}}/>
                    </div> */}
                    <div style={{marginLeft:10}}>
                        <Button onClick={()=>this.setLocale()}>
                            {(this.props.locale == 'en-US') ? '中文' : 'English'}
                        </Button>
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