import React,{PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './styles.less'
import * as headerActions from '../redux/actions/HeaderAction'
import {Button,Modal,Menu, Dropdown, Icon,message} from 'antd'
import { injectIntl, FormattedMessage, defineMessages } from 'react-intl';
import BTFetch from '../utils/BTFetch'
import {importFile,exportFile} from '../utils/BTUtil'
import BTIpcRenderer from '../tools/BTIpcRenderer'
import messages from "../locales/messages";
const HeaderMessages = messages.Header;
const MenuMessages = messages.Menu;

const pkg = require('../../package.json')

class BTHeader extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:true,
        }

        this.checkAccount = this.checkAccount.bind(this)
    }

    checkAccount(e) {
      message.destroy()
      if( this.props.account_info == null ) {
        // 如果未登录，则提示
        message.info(window.localeInfo["Header.PleaseLogInFirst"]);
        return e.preventDefault()
      }
    }

    logout = () => {
      BTFetch('/user/logout', 'POST')
      this.props.setAccountInfo(null)
      message.success(window.localeInfo["Header.SuccessToLogOut"]);
    }

    menu() {
        return <Menu>
            <Menu.Item key="1">
              <a href="#" onClick={this.logout}>
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
        const { account_info } = this.props
        return(
            <div className="container header">
              <div style={{position: 'absolute', top: 0, right: 10}}>v: {pkg.version}</div>

                <div className="logoStyle">
                    <img src="./img/logo.svg" alt=""/>
                </div>

                <div className="loginBtnStyle">
                  <Link to='/publishAsset' onClick={this.checkAccount} >
                    <img src='./img/publishAsset.svg' />
                    <FormattedMessage {...HeaderMessages.PublishAsset}/>
                  </Link>
                  <Link to='/publishDemand' onClick={this.checkAccount}>
                    <img src='./img/publishDemand.svg' />
                    <FormattedMessage {...HeaderMessages.PublishDemand}/>
                  </Link>
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
                    </div>
                    :

                    <Link to='/loginOrRegister'>
                      <div className='flex center' style={{width: 47, height: 47}}>
                        <img src='./img/profile.svg' />
                      </div>
                      <FormattedMessage {...MenuMessages.LoginOrRegister}/>
                    </Link>

                  }

                  <Link to='/profile/wallet' onClick={this.checkAccount}>
                    <img src='./img/wallet.svg' />
                    <FormattedMessage {...MenuMessages.Wallet} />
                  </Link>

                  <Link to='/profile/check' onClick={this.checkAccount}>
                    <img src='./img/check.svg' />
                    <FormattedMessage {...MenuMessages.MyMessages} />
                  </Link>

                  {/* <div>
                      <Dropdown overlay={this.keyStoreMenu()}>
                          <i className="iconfont icon-key" style={{fontSize:25,marginLeft:10}}/>
                      </Dropdown>
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


const mapStateToProps = (state) => {
  const { account_info, locale } = state.headerState
  return { account_info, locale }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(headerActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BTHeader)
