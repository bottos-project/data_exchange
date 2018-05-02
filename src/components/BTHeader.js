import React,{PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './styles.less'
import * as headerActions from '../redux/actions/HeaderAction'
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
import { deleteAccount, isLogin, getAccount } from '../tools/localStore'
import messages from "../locales/messages";
const HeaderMessages = messages.Header;

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

    componentDidMount(){
        let loginState = isLogin()
        this.setState({
            isLogin:loginState
        })
    }

    handlePublishDemand(){
        message.destroy()

        if( this.props.account_info == null ) {
            message.info(window.localeInfo["Header.PleaseLogInFirst"]);
            return
        }
        this.publishModal.setState({
            visible:true
        })
    }

    handlePublishAsset(){
        message.destroy()
        if( this.props.account_info == null ) {
            message.info(window.localeInfo["Header.PleaseLogInFirst"]);
            return
        }
        this.publishAssetModal.setState({
            visible:true
        })
    }

    setLogin(isLogin){
        this.setState({
            isLogin:isLogin
        })
    }

    logout(){
        let url = '/user/logout'
        let account = getAccount()
        if (!account) {
            message.success(window.localeInfo["Header.SuccessToLogOut"]);
            this.setState({
                isLogin:false
            })
            return;
        }
        BTFetch(url,'POST').then(response => {
            // if(response && response.code=='0'){
                // deleteAccount()
                this.props.setAccountInfo(null)
                this.setState({isLogin:false})
                message.success(window.localeInfo["Header.SuccessToLogOut"]);
            // }else{
            //     message.error(window.localeInfo["Header.FailedLogOut"]);
            // }
        }).catch(error => {
            message.error(window.localeInfo["Header.FailedLogOut"]);
        })
    }

    menu() {
        return <Menu>
            <Menu.Item key="1">
              <a href="#" onClick={()=>{this.logout()}}>
                  <FormattedMessage {...HeaderMessages.Logout}/>
              </a>
            </Menu.Item>
        </Menu>
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
                <Menu.Item key="1"><a href="#"  className="file" onClick={()=>this.importKeyStore()}>
                    <FormattedMessage {...HeaderMessages.ImportKeystore}/>
                </a></Menu.Item>
                <Menu.Item key="2"><a href="#" className="file" onClick={()=>this.exportKeyStore()}>
                    <FormattedMessage {...HeaderMessages.ExportKeystore}/>
                </a></Menu.Item>
            </Menu>
        )
    }

    setLocale = () => {
        let storage = window.localStorage;
        let locale = storage.getItem('locale');
        if(locale == 'en-US'){
            storage.setItem('locale','zh-CN')
            this.props.setLocale('zh-CN')
        }else{
            storage.setItem('locale','en-US')
            this.props.setLocale('en-US')
        }
        // 主动刷新当前页面
        window.location.reload()

    }

    render(){
        const { account_info, toggleLoginViewVisible, toggleRegisterViewVisible } = this.props
        return(
            <div className="container header">
                <BTPublishDemand ref={(ref)=>this.publishModal = ref}/>

                <BTPublishAssetModal ref={(ref)=>this.publishAssetModal = ref}/>

                <BTLogin />

                {/* 注册及登录框 */}
                <IsRegister />

                <div className="logoStyle">
                    <img src="./img/newLogo.svg" alt=""/>
                </div>

                <div className="loginBtnStyle">
                    <Button onClick={()=>this.handlePublishDemand()} >
                        <FormattedMessage {...HeaderMessages.PublishDemand}/>
                    </Button>
                    <Button onClick={()=>this.handlePublishAsset()} >
                        <FormattedMessage {...HeaderMessages.PublishAsset}/>
                    </Button>

                    {
                      account_info != null
                      ?
                      <div className="center">
                        <Dropdown overlay={this.menu()}>
                          <div className='header-username'>{account_info.username}</div>
                          {/* <img className="userIcon"
                              src="https://www.botfans.org/uc_server/images/noavatar_middle.gif"
                          /> */}
                        </Dropdown>
                        <Link to="/profile/check" style={{color:'rgba(0, 0, 0, 0.65)'}}>
                          <i className="iconfont icon-email" style={{ fontSize:20 }} />
                        </Link>
                      </div>
                      :
                      <div className='isLogin'>
                        <span onClick={() => toggleLoginViewVisible(true)}>
                          <FormattedMessage {...HeaderMessages.Login}/>
                        </span>
                        <span onClick={() => toggleRegisterViewVisible(true)}>
                          <FormattedMessage {...HeaderMessages.Register}/>
                        </span>
                      </div>
                    }

                    {/* <div>
                        <Dropdown overlay={this.keyStoreMenu()}>
                            <i className="iconfont icon-key" style={{fontSize:25,marginLeft:10}}/>
                        </Dropdown>
                    </div> */}

                    {/* <div className="marginLeft marginRight">
                        <BTIcon type="icon-email" style={{fontSize:20}}/>
                    </div> */}

                </div>
                <div className='switch-locate'>
                  <Button onClick={this.setLocale}>
                    {(this.props.locale == 'en-US') ? '中文' : 'English'}
                  </Button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        account_info: state.headerState.account_info
    }
}

const mapDispatchToProps = (dispatch) => {
    return { ...bindActionCreators(headerActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(BTHeader)
