import React,{PureComponent} from 'react'
import BTDashboardChart from './subviews/BTDashboardChart'
import BTDashboardTable from './subviews/BTDashboardTable'
import BTDashboardTitle from './subviews/BTDashboardTitle'
import BTDashboardBlock from "./subviews/BTDashboardBlock"
import "./subviews/dashboardStyle.less"
import BTFetch from "../../utils/BTFetch";

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
            type:'注册人数'
        })
    }
    exchangeNum(){
        this.setState({
            num:this.state.getExchangeNum,
            dataKey:'getExchangeNum',
            type:'交易量'
        })
    }
    exchangeCoin(){
        this.setState({
            num:this.state.getExchangeCoin,
            dataKey:'getExchangeCoin',
            type:'交易金额'
        })
    }
    assetNum(){
        this.setState({
            num:this.state.getNewAsset,
            dataKey:'getNewAsset',
            type:'新增资产'
        })
    }
    requireNum(){
        this.setState({
            num:this.state.getNewRequire,
            dataKey:'getNewRequire',
            type:'新增需求'
        })
    }
    componentDidMount(){
        //注册人数
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetAccountNumByDay','post',{},{full_path:true,})
            .then(res=>{
                if(res.code==1){
                    let getAccountNum=[],getAccountNumAll='';
                    for(let i of res.data){
                        let time=(new Date(i.time *1000)).toLocaleDateString();
                        getAccountNum.push({day:time,getAccountNum:i.count})
                        // 今日总量
                        getAccountNumAll+=Number(i.count);

                    };
                    // 第一次初始加载为注册人数信息
                    this.setState({
                        getAccountNum,
                        num:getAccountNum,
                        dataKey:'getAccountNum',
                        type:'注册人数',
                        getAccountNumAll
                    })
                }
            });
        /*this.setState({
            num:this.state.getAccountNum,
            dataKey:'getAccountNum',
            type:'注册人数'
        });*/
        //交易量
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetTxNumByDay','post',{},{full_path:true,})
            .then(res=>{
                if(res.code==1){
                    let getExchangeNum=[];
                    for(let i of res.data){
                        let time=(new Date(i.time *1000)).toLocaleDateString();
                        getExchangeNum.push({day:time,getExchangeNum:i.count})
                    };
                    this.setState({
                        getExchangeNum,
                    })
                }
            });
        //交易金额
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetTxAmountByDay','post',{},{full_path:true,})
            .then(res=>{
                if(res.code==1){
                    let getExchangeCoin=[];
                    for(let i of res.data){
                        let time=(new Date(i.time *1000)).toLocaleDateString();
                        getExchangeCoin.push({day:time,getExchangeCoin:i.count})
                    };
                    this.setState({
                        getExchangeCoin,
                    })
                }
            });
        //新增资产
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetAssetNumByDay','post',{},{full_path:true,})
            .then(res=>{
                if(res.code==1){
                    let getNewAsset=[];
                    for(let i of res.data){
                        let time=(new Date(i.time *1000)).toLocaleDateString();
                        getNewAsset.push({day:time,getNewAsset:i.count})
                    };
                    this.setState({
                        getNewAsset,
                    })
                }
            });
        //新增需求
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetRequirementNumByDay','post',{},{full_path:true,})
            .then(res=>{
                if(res.code==1){
                    let getNewRequire=[];
                    for(let i of res.data){
                        let time=(new Date(i.time *1000)).toLocaleDateString();
                        getNewRequire.push({day:time,getNewRequire:i.count})
                    };
                    this.setState({
                        getNewRequire,
                    })
                }
            });

    }
    render(){
        return(
            <div className="container column">
                <div>
                    <BTDashboardTitle/>
                </div>
                <div>
                    {/*<BTDashboardBlock handleFile={(fileName)=>this.getFileName(fileName)}/>*/}
                    <div className="DashboardBlockDetails radius shadow">
                        <div>
                            <a onClick={()=>this.getAccount()}>注册人数</a>
                            <p>今日：</p>
                            <p>昨日：{this.state.getAccountNumAll}</p>
                            <p>查看详情</p>
                            <p>更新时间</p>
                            <p>18.03.09 18a:43:59</p>
                        </div>
                        <div>
                            <a onClick={()=>this.exchangeNum()}>交易量</a>
                            <p>今日：</p>
                            <p>昨日：</p>
                            <p>查看详情</p>
                            <p>更新时间</p>
                            <p>18.03.09 18:43:59</p>
                        </div>
                        <div>
                            <a onClick={()=>this.exchangeCoin()}>交易金额</a>
                            <p>今日：</p>
                            <p>昨日：</p>
                            <p>查看详情</p>
                            <p>更新时间</p>
                            <p>18.03.09 18:43:59</p>
                        </div>
                        <div onClick={()=>this.assetNum()}>
                            <a>新增资产</a>
                            <p>今日：</p>
                            <p>昨日：</p>
                            <p>查看详情</p>
                            <p>更新时间</p>
                            <p>18.03.09 18:43:59</p>
                        </div>
                        <div onClick={()=>this.requireNum()}>
                            <a>新增需求</a>
                            <p>今日：</p>
                            <p>昨日：</p>
                            <p>查看详情</p>
                            <p>更新时间</p>
                            <p>18.03.09 18:43:59</p>
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