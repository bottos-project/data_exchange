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
            getAccountNum:[],
            getExchangeNum:[],
            getExchangeCoin:[],
            getNewAsset:[],
            getNewRequire:[],
            dataKey:'',
            type:'',
            getAccountNumAll:''
        }
    }
    getAccount(){
        this.setState({
            num:this.state.getAccountNum,
            dataKey:'getAccountNum',
            type:<FormattedMessage {...DashboardMessages.Registration}/>
        })
    }
    exchangeNum(){
        this.setState({
            num:this.state.getExchangeNum,
            dataKey:'getExchangeNum',
            type:<FormattedMessage {...DashboardMessages.VolumeOfTransaction}/>
        })
    }
    exchangeCoin(){
        this.setState({
            num:this.state.getExchangeCoin,
            dataKey:'getExchangeCoin',
            type:<FormattedMessage {...DashboardMessages.TransactionAmount }/>
        })
    }
    assetNum(){
        this.setState({
            num:this.state.getNewAsset,
            dataKey:'getNewAsset',
            type:<FormattedMessage {...DashboardMessages.IncrementalAsset }/>
        })
    }
    requireNum(){
        this.setState({
            num:this.state.getNewRequire,
            dataKey:'getNewRequire',
            type:<FormattedMessage {...DashboardMessages.IncrementalDemand }/>
        })
    }
    componentDidMount(){
        //注册人数
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetAccountNumByDay','post',{},{full_path:true,})
            .then(res=>{
                // if(res.code==1){
                //     let getAccountNum=[],getAccountNumAll='';
                //     for(let i of res.data){
                //         let time=(new Date(i.time *1000)).toLocaleDateString();
                //         getAccountNum.push({day:time,getAccountNum:i.count})
                //         // 今日总量
                //         getAccountNumAll+=Number(i.count);
                //
                //     };
                //     // 第一次初始加载为注册人数信息
                //     this.setState({
                //         getAccountNum,
                //         num:getAccountNum,
                //         dataKey:'getAccountNum',
                //         type:<FormattedMessage {...DashboardMessages.Registration}/>,
                //         getAccountNumAll
                //     })
                //
                // }
                let getAccountNum=[{
                    day: '3-16',
                    getAccountNum:420,
                }, {
                    day: '3-17',
                    getAccountNum:377,
                }, {
                    day: '3-18',
                    getAccountNum:552,
                }, {
                    day: '3-19',
                    getAccountNum:605,
                },{
                    day: '3-20',
                    getAccountNum:573,
                },{
                    day: '3-21',
                    getAccountNum:674,
                },{
                    day: '3-22',
                    getAccountNum:697,
                }];
                this.setState({
                    getAccountNum,
                    num:getAccountNum,
                    dataKey:'getAccountNum',
                    type:<FormattedMessage {...DashboardMessages.Registration}/>,
                })
            });
        /*this.setState({
            num:this.state.getAccountNum,
            dataKey:'getAccountNum',
            type:'注册人数'
        });*/
        //交易量
        // BTFetch('http://10.104.10.152:8080/v2/dashboard/GetTxNumByDay','post',{},{full_path:true,})
        //     .then(res=>{
                // if(res.code==1){
                //     let getExchangeNum=[];
                //     for(let i of res.data){
                //         let time=(new Date(i.time *1000)).toLocaleDateString();
                //         getExchangeNum.push({day:time,getExchangeNum:i.count})
                //     };
                //     this.setState({
                //         getExchangeNum,
                //     })
                // }
                let getExchangeNum=[{
                    day: '3-16',
                    getExchangeNum:1845,
                }, {
                    day: '3-17',
                    getExchangeNum:1797,
                }, {
                    day: '3-18',
                    getExchangeNum:2264,
                }, {
                    day: '3-19',
                    getExchangeNum:2597,
                },{
                    day: '3-20',
                    getExchangeNum:2356,
                },{
                    day: '3-21',
                    getExchangeNum:2497,
                },{
                    day: '3-22',
                    getExchangeNum:3064,
                }];
                this.setState({
                    getExchangeNum,
                    num:getExchangeNum,
                    dataKey:'getExchangeNum',
                        })
            // });
        //交易金额
        // BTFetch('http://10.104.10.152:8080/v2/dashboard/GetTxAmountByDay','post',{},{full_path:true,})
        //     .then(res=>{
        //         if(res.code==1){
        //             let getExchangeCoin=[];
        //             for(let i of res.data){
        //                 let time=(new Date(i.time *1000)).toLocaleDateString();
        //                 getExchangeCoin.push({day:time,getExchangeCoin:i.count})
        //             };
        //             this.setState({
        //                 getExchangeCoin,
        //             })
        //         }
        //     });
        let getExchangeCoin=[{
            day: '3-16',
            getExchangeCoin:185,
        }, {
            day: '3-17',
            getExchangeCoin:197,
        }, {
            day: '3-18',
            getExchangeCoin:224,
        }, {
            day: '3-19',
            getExchangeCoin:297,
        },{
            day: '3-20',
            getExchangeCoin:256,
        },{
            day: '3-21',
            getExchangeCoin:341,
        },{
            day: '3-22',
            getExchangeCoin:378,
        }];
        this.setState({
            getExchangeCoin,
            num:getExchangeCoin,
            dataKey:'getExchangeCoin',
        })
        //新增资产
        // BTFetch('http://10.104.10.152:8080/v2/dashboard/GetAssetNumByDay','post',{},{full_path:true,})
        //     .then(res=>{
        //         if(res.code==1){
        //             let getNewAsset=[];
        //             for(let i of res.data){
        //                 let time=(new Date(i.time *1000)).toLocaleDateString();
        //                 getNewAsset.push({day:time,getNewAsset:i.count})
        //             };
        //             this.setState({
        //                 getNewAsset,
        //             })
        //         }
        //     });
        let getNewAsset=[{
            day: '3-16',
            getNewAsset:85,
        }, {
            day: '3-17',
            getNewAsset:97,
        }, {
            day: '3-18',
            getNewAsset:124,
        }, {
            day: '3-19',
            getNewAsset:117,
        },{
            day: '3-20',
            getNewAsset:146,
        },{
            day: '3-21',
            getNewAsset:141,
        },{
            day: '3-22',
            getNewAsset:178,
        }];
        this.setState({
            getNewAsset,
            num:getNewAsset,
            dataKey:'getNewAsset',
        })
        //新增需求
        // BTFetch('http://10.104.10.152:8080/v2/dashboard/GetRequirementNumByDay','post',{},{full_path:true,})
        //     .then(res=>{
        //         if(res.code==1){
        //             let getNewRequire=[];
        //             for(let i of res.data){
        //                 let time=(new Date(i.time *1000)).toLocaleDateString();
        //                 getNewRequire.push({
        //                     day:time,
        //                     getNewRequire:i.count
        //                 })
        //             };
        //             this.setState({
        //                 getNewRequire,
        //             })
        //         }
        //     });
        let getNewRequire=[{
            day: '3-16',
            getNewRequire:105,
        }, {
            day: '3-17',
            getNewRequire:117,
        }, {
            day: '3-18',
            getNewRequire:124,
        }, {
            day: '3-19',
            getNewRequire:127,
        },{
            day: '3-20',
            getNewRequire:146,
        },{
            day: '3-21',
            getNewRequire:176,
        },{
            day: '3-22',
            getNewRequire:181,
        }];
        this.setState({
            getNewRequire,
            num:getNewRequire,
            dataKey:'getNewRequire',
        })

    }
    render(){
        return(
            <div className="container column">
                <div>
                    <BTDashboardTitle/>
                </div>
                <div>
                    {/*<BTDashboardBlock handleFile={(fileName)=>this.getFileName(fileName)}/>*/}
                    <div className="DashboardBlockDetails radius shadow" >
                        <div>
                            <a style={{color:"#4F43B6",padding:"10px"}} onClick={()=>this.getAccount()}>
                                <FormattedMessage {...DashboardMessages.Registration}/>
                            </a>
                            <p>
                                <FormattedMessage {...DashboardMessages.Yesterday}/>
                            </p>
                            <p>674</p>
                        </div>
                        <div>
                            <a style={{color:"#4F43B6",padding:"10px"}} onClick={()=>this.exchangeNum()}>
                                <FormattedMessage {...DashboardMessages.VolumeOfTransaction}/>
                            </a>
                            <p>
                                <FormattedMessage {...DashboardMessages.Yesterday}/>
                            </p>
                            <p>2497</p>
                        </div>
                        <div>
                            <a style={{color:"#4F43B6",padding:"10px"}} onClick={()=>this.exchangeCoin()}>
                                <FormattedMessage {...DashboardMessages.TransactionAmount}/>
                            </a>
                            <p>
                                <FormattedMessage {...DashboardMessages.Yesterday}/>
                            </p>
                            <p>341</p>
                        </div>
                        <div onClick={()=>this.assetNum()}>
                            <a style={{color:"#4F43B6",padding:"10px"}}>
                                <FormattedMessage {...DashboardMessages.IncrementalAsset}/>
                            </a>
                            <p>
                                <FormattedMessage {...DashboardMessages.Yesterday}/>
                            </p>
                            <p>141</p>
                        </div>
                        <div onClick={()=>this.requireNum()}>
                            <a style={{color:"#4F43B6",padding:"10px"}}>
                                <FormattedMessage {...DashboardMessages.IncrementalDemand}/>
                            </a>
                            <p>
                                <FormattedMessage {...DashboardMessages.Yesterday}/>
                            </p>
                            <p>176</p>
                        </div>
                    </div>
                </div>
                <div>
                    <BTDashboardChart type={this.state.type} dkey={this.state.dataKey} num={this.state.num}/>
                </div>
                <div>
                    {/*<BTDashboardTable/>*/}
                </div>
            </div>
        )
    }
}