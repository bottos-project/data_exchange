import React,{PureComponent} from 'react'
import BTDashboardChart from './subviews/BTDashboardChart'
import BTDashboardTable from './subviews/BTDashboardTable'
import BTDashboardTitle from './subviews/BTDashboardTitle'
import BTDashboardBlock from "./subviews/BTDashboardBlock"
import "./subviews/dashboardStyle.less"
import BTFetch from "../../utils/BTFetch";
import {FormattedMessage} from 'react-intl'
import messages from '../../locales/messages'
const DashboardMessages = messages.Dashboard;

export default class BTDashboard extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            num:[],
            ExchangeNum:[],
            ExchangeCoin:[],
            NewAsset:[],
            NewRequire:[],
            dataKey:'',
            type:'',
            AccountNumAll:'',
            AccountNum:'',
            AssetNum:'',
            RequirementNum:'',
            TxAmount:'',
            TxNum:'',
        }
    }
    getAccount(){
        BTFetch('/dashboard/getAccountNumByDay','post')
            .then(res=>{
                if(res&&res.code==1) {
                    if(res.data.length==0){
                        return;
                    }
                    let AccountNum = [], AccountNumAll = '';
                    for (let i of res.data) {
                        let time = (new Date(i.time * 1000)).toLocaleDateString();
                        AccountNum.push({day: time, AccountNum: i.count})
                    }
                    this.setState({
                        // AccountNum,
                        num: AccountNum,
                        dataKey: 'AccountNum',
                        type: <FormattedMessage {...DashboardMessages.Registration}/>,
                    })
                }
            });
        /*this.setState({
            num:this.state.AccountNum,
            dataKey:'AccountNum',
            type:<FormattedMessage {...DashboardMessages.Registration}/>
        })*/
    }
   async exchangeNum(){
       await  BTFetch('/dashboard/GetTxNumByDay','post')
           .then(res=>{
               if(res&&res.code==1){
                   if(res.data.length==0){
                       return;
                   }
                   let ExchangeNum=[];
                   for(let i of res.data){
                       let time=(new Date(i.time *1000)).toLocaleDateString();
                       ExchangeNum.push({day:time,ExchangeNum:i.count})
                   };
                   this.setState({
                       ExchangeNum,
                   })
               }
           });
        this.setState({
            num:this.state.ExchangeNum,
            dataKey:'ExchangeNum',
            type:<FormattedMessage {...DashboardMessages.VolumeOfTransaction}/>
        })
    }
   async exchangeCoin(){
       await BTFetch('/dashboard/GetTxAmountByDay','post')
           .then(res=>{
               if(res&&res.code==1){
                   let ExchangeCoin=[];
                   for(let i of res.data){
                       let time=(new Date(i.time *1000)).toLocaleDateString();
                       ExchangeCoin.push({day:time,ExchangeCoin:i.count / Math.pow(10, 10)})
                   };
                   this.setState({
                       ExchangeCoin,
                   })
               }
           });
        this.setState({
            num:this.state.ExchangeCoin,
            dataKey:'ExchangeCoin',
            type:<FormattedMessage {...DashboardMessages.TransactionAmount }/>
        })
    }
   async assetNum(){
       await BTFetch('/dashboard/GetAssetNumByDay','post')
           .then(res=>{
               if(res.code==1){
                   let NewAsset=[];
                   for(let i of res.data){
                       let time=(new Date(i.time *1000)).toLocaleDateString();
                       NewAsset.push({day:time,NewAsset:i.count})
                   };
                   this.setState({
                       NewAsset,
                   })
               }
           });
        this.setState({
            num:this.state.NewAsset,
            dataKey:'NewAsset',
            type:<FormattedMessage {...DashboardMessages.IncrementalAsset }/>
        })
    }
    async requireNum(){
        await BTFetch('/dashboard/GetRequirementNumByDay','post')
            .then(res=>{
                if(res.code==1){
                    let NewRequire=[];
                    for(let i of res.data){
                        let time=(new Date(i.time *1000)).toLocaleDateString();
                        NewRequire.push({day:time,NewRequire:i.count})
                    };
                    this.setState({
                        NewRequire,
                    })
                }
            });
        this.setState({
            num:this.state.NewRequire,
            dataKey:'NewRequire',
            type:<FormattedMessage {...DashboardMessages.IncrementalDemand }/>
        })
    }

    componentDidMount(){
        BTFetch('/dashboard/GetAllTypeTotal','post')
            .then(res=>{
                if(res&&res.code==0){
                    let data=res.data;
                    if(data.length==0){
                        return;
                    }
                    for(let i in data){
                        switch (data[i].type){
                            case 'AccountNum':this.setState({AccountNum:data[i].total}); break;
                            case 'AssetNum':this.setState({AssetNum:data[i].total}); break;
                            case 'RequirementNum':this.setState({RequirementNum:data[i].total}); break;
                            case 'TxAmount':
                              this.setState({
                                TxAmount: parseFloat((data[i].total / Math.pow(10, 10)).toFixed(3))
                              });
                              break;
                            case 'TxNum':this.setState({TxNum:data[i].total}); break;
                            // default:message.error('暂无数据')
                        }
                    }
                }

            });
        //注册人数
        BTFetch('/dashboard/getAccountNumByDay','post')
            .then(res=>{
                if(res&&res.code==1) {
                    if(res.data.length==0){
                        return;
                    }
                    let AccountNum = [], AccountNumAll = '';
                    for (let i of res.data) {
                        let time = (new Date(i.time * 1000)).toLocaleDateString();
                        AccountNum.push({day: time, AccountNum: i.count})
                    }
                    this.setState({
                        // AccountNum,
                        num: AccountNum,
                        dataKey: 'AccountNum',
                        type: <FormattedMessage {...DashboardMessages.Registration}/>,
                    })
                }
            });

    }
    render(){
        return(
            <div className="container column">
                <div>
                    {/*<BTDashboardBlock handleFile={(fileName)=>this.getFileName(fileName)}/>*/}
                    <div className="DashboardBlockDetails radius shadow" >
                        <div>
                            <a style={{color:"#4F43B6",padding:"10px"}} onClick={()=>this.getAccount()}>
                                <FormattedMessage {...DashboardMessages.Registration}/>
                            </a>
                            {/*<p>
                                <FormattedMessage {...DashboardMessages.Yesterday}/>
                            </p>*/}
                            <p>{this.state.AccountNum}</p>
                        </div>
                        <div>
                            <a style={{color:"#4F43B6",padding:"10px"}} onClick={()=>this.exchangeNum()}>
                                <FormattedMessage {...DashboardMessages.VolumeOfTransaction}/>
                            </a>
                           {/* <p>
                                <FormattedMessage {...DashboardMessages.Yesterday}/>
                            </p>*/}
                            <p>{this.state.TxNum}</p>
                        </div>
                        <div>
                            <a style={{color:"#4F43B6",padding:"10px"}} onClick={()=>this.exchangeCoin()}>
                                <FormattedMessage {...DashboardMessages.TransactionAmount}/>
                            </a>
                           {/* <p>
                                <FormattedMessage {...DashboardMessages.Yesterday}/>
                            </p>*/}
                            <p>{this.state.TxAmount}</p>
                        </div>
                        <div onClick={()=>this.assetNum()}>
                            <a style={{color:"#4F43B6",padding:"10px"}}>
                                <FormattedMessage {...DashboardMessages.IncrementalAsset}/>
                            </a>
                           {/* <p>
                                <FormattedMessage {...DashboardMessages.Yesterday}/>
                            </p>*/}
                            <p>{this.state.AssetNum}</p>
                        </div>
                        <div onClick={()=>this.requireNum()}>
                            <a style={{color:"#4F43B6",padding:"10px"}}>
                                <FormattedMessage {...DashboardMessages.IncrementalDemand}/>
                            </a>
                            {/*<p>
                                <FormattedMessage {...DsashboardMessages.Yesterday}/>
                            </p>*/}
                            <p>{this.state.RequirementNum}</p>
                        </div>
                    </div>
                </div>
                <BTDashboardChart type={this.state.type} dkey={this.state.dataKey} num={this.state.num}/>
            </div>
        )
    }
}
