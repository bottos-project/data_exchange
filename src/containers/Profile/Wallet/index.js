import React,{PureComponent} from 'react'
// import {Wallet,Transfer,History} from './Person'
<<<<<<< HEAD
import { Tabs,List,Button, Row,Col,Modal,Input,message } from 'antd';
import Walletall from './Person/walletall'
import './styles.less'
import {exportFile} from '../../../utils/BTUtil'
import BTIpcRenderer from '../../../tools/BTIpcRenderer'
import BTCryptTool from '../../../tools/BTCryptTool'
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
        console.log({
            accountList
        })
        this.setState({
            accountList
        })
=======
import { Tabs,List,Button, Row,Col } from 'antd';
import Walletall from './Person/walletall'
import './styles.less'
import {importFile,exportFile} from '../../../utils/BTUtil'
import BTIpcRenderer from '../../../tools/BTIpcRenderer'

const TabPane = Tabs.TabPane;


const accountList = [
    {
        accountName:'BTO',
        accounts:5059,
        accountAddress:'lkjsadfl;dsfjdsaf'
    },
    {
        accountName:'EOS',
        accounts:50.49,
        accountAddress:'lkjsadfl;dsfjdsaf'
    },
    {
        accountName:'BCW',
        accounts:1.98,
        accountAddress:'lkjsadfl;dsfjdsaf'
    }
]

export default class BTWallet extends PureComponent{
    constructor(props){
        super(props)
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
    }

    render(){
        return (
            <div className="flex container column" style={{height:200}}>
               <BTAccountListHeader/>
            <div className="container">
             <List
                 style={{flex:1}}
<<<<<<< HEAD
                 dataSource={this.state.accountList}
                     renderItem = {(item,index)=>{
                        let newItem = {
                            accountName:item.slice(0,-4)
                        }
                         return(
                             <BTAccountItem {...newItem}/>
=======
                 dataSource={accountList}
                     renderItem = {(item)=>{
                         return(
                             <BTAccountItem {...item}/>
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
                         )
                     }}
                 />
            </div>
            </div>
        )
<<<<<<< HEAD
=======

>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
    }
}

class BTAccountItem extends PureComponent{
    constructor(props){
        super(props)
<<<<<<< HEAD
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
=======
    }

    transAccount(){
        console.log('转账')
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
    }

    exportAccount(accountName){
        let exportFileName = accountName+'.bto'
<<<<<<< HEAD
        let keyStore = BTIpcRenderer.getKeyStore(accountName)
        exportFile(keyStore,exportFileName)
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
        BTIpcRenderer.setKeyStore(keyStore.account_name,cryptStr)
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
=======
        BTIpcRenderer.getKeyStore(accountName,(keyStore)=>{
            exportFile(keyStore,'utf8',exportFileName)
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
        })
    }

    render(){
        return(
            <div className="container accountItem">
<<<<<<< HEAD

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
                        <span className="font25 colorTitle">{this.props.accountName}</span>
                        {/* <span>可用现金</span> */}
                    </div>
                    {/* <div className="font25 colorRed">{this.props.accounts}</div> */}
                </div>
                <div>
                    <Button className="marginRight" type="primary" onClick={()=>this.changePwd(this.props.accountName)}>修改密码</Button>
=======
                <div className="flex accountLeft">
                    <div>
                        <span className="font25 colorTitle">{this.props.accountName}</span>
                        <span>可用现金</span>
                    </div>
                    <div className="font25 colorRed">{this.props.accounts}</div>
                </div>
                <div>
                    <Button className="marginRight" type="primary" onClick={()=>this.transAccount()}>转账</Button>
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
                    <Button type="primary" onClick={()=>this.exportAccount(this.props.accountName)}>导出账号</Button>
                </div>
            </div>
        )
    }
}

class BTAccountListHeader extends PureComponent{
    constructor(props){
        super(props)
<<<<<<< HEAD
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
        let keyStoreStr = BTIpcRenderer.ipcImportFile()
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
            BTIpcRenderer.setKeyStore(keyStore.account_name,this.state.keyStoreStr);
            this.setState({password:'',visible:false})
       }catch(error){
           message.error('密码错误')
       }
    }

    onHandleCancel(){
        this.setState({
            visible:false
=======
    }

    importAccount(){
        importFile((keyStore)=>{
            BTIpcRenderer.setKeyStore(keyStore)
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
        })
    }

    render(){
        return(
            <div className="container accountListHeader">
<<<<<<< HEAD
                <Modal 
                    visible={this.state.visible}
                    onOk={()=>this.onHandleOk()}
                    onCancel={()=>this.onHandleCancel()}
                >
                    <Button onClick={()=>this.importKeyStore()}>导入KeyStore文件</Button>
                    <Input style={{marginBottom:10}} type="password" name="password" placeholder="请输入导入keystore的密码" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}></Input>
                </Modal>
                <Button onClick={()=>this.importAccount()}>导入账号</Button>
=======
                <a href="#" className="file" onClick={()=>this.importAccount()}>导入文件<input type="file" id="files" name="导入文件"/></a>
                {/* <Button onClick={()=>this.importAccount()}>导入账号</Button> */}
>>>>>>> 987e290a1a15fccda791f29484116e8f83355471
            </div>
        )
    }
}