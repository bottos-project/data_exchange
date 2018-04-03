import React,{PureComponent} from 'react'
import {Modal,Input,message,Button} from 'antd'
import BTIpcRenderer from '../../../../tools/BTIpcRenderer'
import BTCryptTool from '../../../../tools/BTCryptTool'
import {Link} from 'react-router'
import messages from '../../../../locales/messages'
import {FormattedMessage} from 'react-intl'
const WalletMessages = messages.Wallet;

export default class BTWalletItem extends PureComponent{
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
        let exportFileName = accountName
        let keyStore = BTIpcRenderer.getKeyStore(accountName)
        if(!keyStore.error){
            BTIpcRenderer.exportKeyStore(accountName,JSON.parse(keyStore.result))
        }
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
        console.log(this.props)
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
                        <Link to={{
                                pathname:'/profile/wallet/accountlist',
                                query:{selectWallet:this.props.accountName}
                            }}><span className="font25 colorTitle">{this.props.accountName}</span></Link>
                        
                        {/* <span>可用现金</span> */}
                    </div>
                    {/* <div className="font25 colorRed">{this.props.accounts}</div> */}
                </div>
                <div>
                    {/* <Button className="marginRight" type="primary" onClick={()=>this.changePwd(this.props.accountName)}>
                        <FormattedMessage {...WalletMessages.ModifyThePassword}/>
                    </Button> */}
                    <Button type="primary" onClick={()=>this.exportAccount(this.props.accountName)}>
                        <FormattedMessage {...WalletMessages.ExportTheAccount }/>
                    </Button>
                </div>
            </div>
        )
    }
}
