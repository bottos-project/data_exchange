import React,{PureComponent} from 'react'
// import {Wallet,Transfer,History} from './Person'
import { Tabs,List,Button, Row,Col,Modal,Input,message,Tag } from 'antd';
import {Link} from 'react-router'
import Walletall from './Person/walletall'
import './styles.less'
import {exportFile} from '../../../utils/BTUtil'
import BTIpcRenderer from '../../../tools/BTIpcRenderer'
import BTCryptTool from '../../../tools/BTCryptTool'
import BTUnlogin from '../../../components/BTUnlogin'
import * as localStore from '../../../tools/localStore'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import BTAccountListCell from './subvies/BTAccountListCell'
import BTAccountListHeader from './subvies/BTAccountListHeader'
import BTWalletList from './subvies/BTWalletList'
import BTAccountList from './subvies/BTAccountList'
import {getAccount} from '../../../tools/localStore'
const WalletMessages = messages.Wallet;
const TabPane = Tabs.TabPane;
const CheckableTag = Tag.CheckableTag

export default class BTWallet extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            isLogin:false,
            walletList:[],
            selectWallet:''
        }
    }

    componentDidMount(){
        let props = this.props;
        if(props.location) {
            this.setLoginState(props.location.query.selectWallet)
        }else{
            this.setLoginState()
        }
    }

    setLoginState(username){
        let isLogin = localStore.isLogin();
        this.setState({isLogin})
        if(isLogin){
            let walletList = BTIpcRenderer.getKeyStoreList()
            let userInfo = getAccount()
            let selectWallet = username ? username : userInfo.username
            this.setState({
                selectWallet,
                walletList
            })
            // console.log(BTIpcRenderer.getKeyStore(username),selectWallet)
        }
    }

    checkWallet(item){
        this.setState({
            selectWallet:item.slice(0,-9)
        })
    }

    initComponent(){
        let checkedStyle = {backgroundColor:'rgb(154,125,224)'}
        let unCheckedStyle = {borderColor:'rgb(154,125,224)'}
        let walletListPath = {
            pathname:'/profile/wallet/walletlist',
            query:this.state.walletList
        }
        return(
            <div className="container column">
                <div className="flex marginBottom walletWrap">
                    <div>
                        {
                            this.state.walletList.map((item,index)=>{
                                let isChecked = item.slice(0,-9)==this.state.selectWallet;
                                let tagStyle = isChecked ? checkedStyle : unCheckedStyle
                                if(index>2) return;
                                return (<CheckableTag checked={isChecked} onChange={()=>{this.checkWallet(item)}} style={tagStyle}>{item.slice(0,-9)}</CheckableTag>)
                            })
                        }
                        <Link to={walletListPath}><FormattedMessage {...WalletMessages.More}/>>>></Link>
                    </div>
                    <BTAccountListHeader style={{float:'right'}}/>

                </div>
                <div className="container marginTop">
                    <BTAccountList className="flex" selectWallet = {this.state.selectWallet}/>
                </div>
            </div>
        )
    }

    render(){
        
        return (
            <div className="container">
                {
                    this.state.isLogin ? this.initComponent() : <div className="container center"><BTUnlogin/></div>
                }
            </div>
        )
    }
}

