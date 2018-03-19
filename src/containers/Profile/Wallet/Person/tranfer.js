import React,{PureComponent} from 'react'
import BTFetch from '../../../../utils/BTFetch'
import {getBlockInfo, getDataInfo} from "../../../../utils/BTCommonApi";
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const WalletMessages = messages.Wallet;
export default class Transfer extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            userCoin:'',
            userAddress:''
        }
    }
    handleChange(e){
        this.setState({userCoin:e.target.value})
    }
    handleAddress(e){
        this.setState({userAddress:e.target.value})
    }
     async submit(){
         let block=(await getBlockInfo()).data;
         console.log(block);
         let username='12'
        let param={
            "code":"currency",
            "action":"transfer",
            "args":{
                "from":username,
                "to":this.state.userAddress,
                "quantity":this.state.userCoin
            }
        };
       // let getDataInfo = await getDataInfo(param);
       let getDataBin=(await getDataInfo(param)).data.bin;
       console.log(getDataBin);
       let data={
           "ref_block_num": block.ref_block_num,
           "ref_block_prefix": block.ref_block_prefix,
           "expiration": block.expiration,
           "scope": [
               username,
               this.state.userAddress
           ],
           "read_scope": [],
           "messages": [{
               "code": "currency",
               "type": "transfer",
               "authorization": [],
               "data": getDataBin
           }],
           "signatures": []
       };
        BTFetch('http://10.104.21.10:8080/v2/user/transfer','post',data,{
            full_path:true,
        }).then(res=>{
            console.log(res);
            if(res.code==1){
                alert('转账成功')
            }else{
                alert('转账失败')
            }
        })

    }
    clear(){
        this.setState({userCoin:'',userAddress:''},()=>{
            this.refs.theCoin.focus();
        })
    }
    render(){
        var paddingLeft='10px';
        return (
            <div className='transfer'>
                <header>
                    <FormattedMessage {...WalletMessages.Transfer}/>
                </header>
                <div className='transfer-content'>
                    <div className="transfer-from">
                        <span>
                            <FormattedMessage {...WalletMessages.From}/>
                        </span>
                        <div className="transfer-right">
                            <select name="" id="">
                                <option value="btd121">btd121</option>
                                <option value="">Haoyu</option>
                                <option value="">Yugedaren</option>
                            </select>
                            <span style={{paddingLeft}}>0x479973e3c24e1D5368868e69e23d1EsafqWd</span>
                        </div>
                    </div>
                    <div className="transfer-from">
                        <span>
                            <FormattedMessage {...WalletMessages.Token}/>
                        </span>
                        <div className="transfer-right">
                            <input
                                ref='theCoin'
                                value={this.state.userCoin}
                                onChange={(e)=>this.handleChange(e)}
                                type="text" style={{width:'120px'}}/>
                        </div>
                    </div>
                    <div className="transfer-from">
                        <span>
                            <FormattedMessage {...WalletMessages.To}/>
                        </span>
                        <div className="transfer-right">
                            <input
                                value={this.state.userAddress}
                                ref='theAddress'
                                onChange={(e)=>this.handleAddress(e)}
                                type="text"/>
                        </div>
                    </div>
                </div>
                <div className="token-submit">
                    <button className='add' onClick={(e)=>this.submit()}>
                        <FormattedMessage {...WalletMessages.Submit}/>
                    </button>
                    <button className='cancel' onClick={()=>this.clear()}>
                        <FormattedMessage {...WalletMessages.Cancel}/>
                    </button>
                </div>
            </div>
        )
    }
}