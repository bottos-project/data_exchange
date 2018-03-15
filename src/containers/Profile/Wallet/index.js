import React,{PureComponent} from 'react'
// import {Wallet,Transfer,History} from './Person'
import { Tabs,List,Button, Row,Col,Modal,Input,message } from 'antd';
import {Link} from 'react-router'
import Walletall from './Person/walletall'
import './styles.less'
import {exportFile} from '../../../utils/BTUtil'
import BTIpcRenderer from '../../../tools/BTIpcRenderer'
import BTCryptTool from '../../../tools/BTCryptTool'
import BTUnlogin from '../../../components/BTUnlogin'
const ipc = window.electron.ipcRenderer
const {dialog} = window.electron.remote

const TabPane = Tabs.TabPane;

export default class BTWallet extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            accountList:[]
        }
    }

    componentDidMount(){
        let accountList = BTIpcRenderer.getKeyStoreList()
        this.setState({
            accountList
        })
    }

    render(){
        return (
            <div className="flex container column" style={{height:200}}>
               <BTAccountListHeader/>
            <div className="container">
             <List
                 style={{flex:1}}
                 dataSource={this.state.accountList}
                     renderItem = {(item,index)=>{
                        let newItem = {
                            accountName:item.slice(0,-9)
                        }
                         return(
                             <BTAccountItem {...newItem}/>
                         )
                     }}
                 />
            </div>
            </div>
        )
    }
}

class BTAccountItem extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            password:'',
            newPassword:'',
            reNewPassword:''
        }
    }

    changePwd(accountName){
        // let keyStore = BTIpcRenderer.getKeyStore(accountName)
        this.setState({visible:true})
    }

    exportAccount(accountName){
        ipc.send('save-dialog')

        // dialog.showSaveDialog(this,{

        // },(filePath)=>{
        //     console.log({
        //         filePath
        //     })
        // })

        // let exportFileName = accountName
        // let keyStore = BTIpcRenderer.getKeyStore(accountName)
        // if(!keyStore.error){
        //     BTIpcRenderer.exportKeyStore(accountName,JSON.parse(keyStore.result))
        // }
    }

    onHandleOk(){
        if(this.state.password == '') {message.error('请输入原密码');return}
        if(this.state.newPassword == '') {message.error('请输入新密码');return}
        if(this.state.reNewPassword == '') {message.error('请输入确认密码');return}
        // 使用原密码解密账户
       try{
        let keyStoreFile = BTIpcRenderer.getKeyStore(this.props.accountName)
        let keyStoreStr = JSON.parse(keyStoreFile.result)
        let keyStoreString = BTCryptTool.aesDecrypto(keyStoreStr,this.state.password)
        let keyStore = JSON.parse(keyStoreString)

        if(this.state.newPassword!=this.state.reNewPassword){
            message.error('两次新密码输入不一致')
            return;
        }
        let privateKeyStr = JSON.stringify(keyStore)
        let cryptStr = BTCryptTool.aesEncrypto(privateKeyStr,this.state.newPassword)
        // 存储keystore文件到本地
        BTIpcRenderer.saveKeyStore(keyStore.account_name,cryptStr)
        message.success('密码修改成功')
        this.setState({
            visible:false,
            password:'',
            newPassword:'',
            reNewPassword:''
        })
       }catch(error){
           message.error('密码修改失败')
       }
    }

    onHandleCancel(){
        this.setState({
            visible:false,
            password:'',
            newPassword:'',
            reNewPassword:''
        })
    }

    render(){
        // let loginState = localStorage.isLogin()
        return(
            <div className="container accountItem">

            <Modal 
                visible={this.state.visible}
                onOk={()=>this.onHandleOk()}
                onCancel={()=>this.onHandleCancel()}
            >
                <Input style={{marginTop:20,marginBottom:20}} type="password" placeholder="请输入原密码" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/>
                <Input style={{marginBottom:20}} type="password" placeholder="请输入新密码" value={this.state.newPassword} onChange={(e)=>this.setState({newPassword:e.target.value})}/>
                <Input type="password" placeholder="请再次确认新密码" value={this.state.reNewPassword} onChange={(e)=>this.setState({reNewPassword:e.target.value})}/>
            </Modal>


                <div className="flex accountLeft">
                    <div>
                        <Link to="/profile/wallet/accountlist"><span className="font25 colorTitle">{this.props.accountName}</span></Link>
                        
                        {/* <span>可用现金</span> */}
                    </div>
                    {/* <div className="font25 colorRed">{this.props.accounts}</div> */}
                </div>
                <div>
                    <Button className="marginRight" type="primary" onClick={()=>this.changePwd(this.props.accountName)}>修改密码</Button>
                    <Button type="primary" onClick={()=>this.exportAccount(this.props.accountName)}>导出账号</Button>
                </div>
            </div>
        )
    }
}

class BTAccountListHeader extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            password:''
        }
    }

    importAccount(){
        this.setState({
            visible:true,
            keyStoreStr:''
        })
    }

    importKeyStore(){
        let keyStoreStr = BTIpcRenderer.importFile()
        this.setState({
            keyStoreStr
        })
    }

    onHandleOk(){
        if(this.state.password=='') {
            message.error('请输入KeyStore文件的密码')
            return
        }
       try{
            let keyStoreCryptStr = BTCryptTool.aesDecrypto(this.state.keyStoreStr,this.state.password)
            let keyStore = JSON.parse(keyStoreCryptStr);
            BTIpcRenderer.saveKeyStore(keyStore.account_name,this.state.keyStoreStr);
            this.setState({password:'',visible:false})
       }catch(error){
           message.error('密码错误')
       }
    }

    onHandleCancel(){
        this.setState({
            visible:false
        })
    }

    render(){
        return(
            <div className="container accountListHeader">
                <Modal 
                    visible={this.state.visible}
                    onOk={()=>this.onHandleOk()}
                    onCancel={()=>this.onHandleCancel()}
                >
                    <Button onClick={()=>this.importKeyStore()}>导入KeyStore文件</Button>
                    <Input style={{marginBottom:10}} type="password" name="password" placeholder="请输入导入keystore的密码" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}></Input>
                </Modal>
                <Button onClick={()=>this.importAccount()}>导入账号</Button>
            </div>
        )
    }
}