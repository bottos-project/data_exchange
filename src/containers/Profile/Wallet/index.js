import React,{PureComponent} from 'react'
// import {Wallet,Transfer,History} from './Person'
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
    }

    render(){
        return (
            <div className="flex container column" style={{height:200}}>
               <BTAccountListHeader/>
            <div className="container">
             <List
                 style={{flex:1}}
                 dataSource={accountList}
                     renderItem = {(item)=>{
                         return(
                             <BTAccountItem {...item}/>
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
    }

    transAccount(){
        console.log('转账')
    }

    exportAccount(accountName){
        let exportFileName = accountName+'.bto'
        BTIpcRenderer.getKeyStore(accountName,(keyStore)=>{
            exportFile(keyStore,'utf8',exportFileName)
        })
    }

    render(){
        return(
            <div className="container accountItem">
                <div className="flex accountLeft">
                    <div>
                        <span className="font25 colorTitle">{this.props.accountName}</span>
                        <span>可用现金</span>
                    </div>
                    <div className="font25 colorRed">{this.props.accounts}</div>
                </div>
                <div>
                    <Button className="marginRight" type="primary" onClick={()=>this.transAccount()}>转账</Button>
                    <Button type="primary" onClick={()=>this.exportAccount(this.props.accountName)}>导出账号</Button>
                </div>
            </div>
        )
    }
}

class BTAccountListHeader extends PureComponent{
    constructor(props){
        super(props)
    }

    importAccount(){
        importFile((keyStore)=>{
            BTIpcRenderer.setKeyStore(keyStore)
        })
    }

    render(){
        return(
            <div className="container accountListHeader">
                <a href="#" className="file" onClick={()=>this.importAccount()}>导入文件<input type="file" id="files" name="导入文件"/></a>
                {/* <Button onClick={()=>this.importAccount()}>导入账号</Button> */}
            </div>
        )
    }
}