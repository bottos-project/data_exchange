import React,{PureComponent} from 'react'
import "./dashboardStyle.less"
import BTFetch from "../../../utils/BTFetch";




export default class BTDashboardTitle extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
    }
    componentDidMount(){
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetAccountNumByDay','post',{},{full_path:true,})
            .then(res=>{
                if(res.code==1){
                    let getAccountNum=[];
                    for(let i of res.data){
                        console.log(i.time)
                        let time=(new Date(i.time *1000)).toLocaleDateString();
                        getAccountNum.push({day:time,requireNumPerDay:i.count})
                    };
                    this.setState({
                        data:getAccountNum,
                    })
                    // this.props.num=this.state.data;
                }
            });
    }
    getAccount(){
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetAccountNumByDay','post',{},{full_path:true,})
            .then(res=>{
                if(res.code==1){
                    let getAccountNum=[];
                    for(let i of res.data){
                        console.log(i.time)
                        let time=(new Date(i.time *1000)).toLocaleDateString();
                        getAccountNum.push({day:time,requireNumPerDay:i.count})
                    };
                    this.setState({
                        data:getAccountNum,
                    })
                }
            });
    }
    exchangeNum(){

    }
    exchangeCoin(){

    }
    assetNum(){

    }
    requireNum(){

    }
    render(){
        return(
            <div className="DashboardBlockDetails radius shadow">
               <div>
                   <a onClick={()=>this.getAccount()}>注册人数</a>
                   <p>今日：</p>
                   <p>昨日：</p>
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
        )
    }
}