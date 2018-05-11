import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
// import {Wallet,Transfer,History} from './Person'
import { List, Button, Input, message } from 'antd';
import {Link} from 'react-router'
import './styles.less'
import {exportFile} from '../../../utils/BTUtil'
import BTIpcRenderer from '../../../tools/BTIpcRenderer'
import BTCryptTool from '@bottos-project/bottos-crypto-js'
import BTUnlogin from '../../../components/BTUnlogin'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import BTCointList from './subvies/BTCointList'
import CustomTabBar from '@/components/CustomTabBar'

const WalletMessages = messages.Wallet;


class BTWallet extends PureComponent {
    constructor(props){
        super(props)
        let currentAccount = props.account_info ? props.account_info.username : ''
        this.state = {
            walletList: [],
            accountList: [currentAccount],
            selectWallet: '',
            activeKey: '0',
        }
    }
    handleChange = (key) => {
      // console.log('key', key);
      // console.log('this.state.accountList[key]', this.state.accountList[key]);
      this.setState({
        activeKey: key,
        selectWallet: this.state.accountList[key]
      });
    }

    componentDidMount(){
        let props = this.props;
        // console.log('props', props);
        if(props.location) {
            this.setLoginState(props.location.query.selectWallet)
        }else{
            this.setLoginState()
        }
    }

    setLoginState(username){
      const { account_info, isLogin } = this.props
      if (isLogin) {
        let walletList = BTIpcRenderer.getKeyStoreList()
        let accountList = walletList.map(item => item.endsWith('.keystore') ? item.slice(0,-9) : item)
        let selectWallet = username ? username : account_info.username
        this.setState({
            selectWallet,
            walletList,
            accountList
        })
          // console.log(BTIpcRenderer.getKeyStore(username),selectWallet)
      }
    }

    checkWallet(item){
        this.setState({
            selectWallet:item.slice(0,-9)
        })
    }

    render() {
      const { children, isLogin } = this.props
      if ( React.isValidElement(children) ) {
        return children
      } else if (!isLogin) {
        return <div className="container center"><BTUnlogin /></div>
      }

      let checkedStyle = {backgroundColor:'rgb(154,125,224)'}
      let unCheckedStyle = {borderColor:'rgb(154,125,224)'}
      let walletListPath = {
          pathname:'/profile/wallet/walletlist',
          query:this.state.walletList
      }

      return (
        <div className='container column'>
          <CustomTabBar
            style={{position: 'relative'}}
            onChange={this.handleChange}
            keyMap={this.state.accountList}
            activeKey={this.state.activeKey}
          >
            <Link to={walletListPath}>
              <button className='wallet-management'>
                <FormattedMessage {...WalletMessages.More}/>>>>
              </button>
            </Link>
          </CustomTabBar>

          <BTCointList className="flex" selectWallet={this.state.selectWallet}/>
        </div>
      )


    }
}

const mapStateToProps = (state) => {
  const account_info = state.headerState.account_info
  const isLogin = account_info != null
  return { account_info, isLogin }
}

export default connect(mapStateToProps)(BTWallet)
