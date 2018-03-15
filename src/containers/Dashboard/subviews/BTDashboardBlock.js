import React,{PureComponent} from 'react'
import "./dashboardStyle.less"




export default class BTDashboardTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="DashboardBlockDetails radius shadow">
               <div>
                   <h4>注册人数</h4>
                   <p>今日：</p>
                   <p>昨日：</p>
                   <p>查看详情</p>
                   <p>更新时间</p>
                   <p>18.03.09 18:43:59</p>
               </div>
                <div>
                    <h4>交易量</h4>
                    <p>今日：</p>
                    <p>昨日：</p>
                    <p>查看详情</p>
                    <p>更新时间</p>
                    <p>18.03.09 18:43:59</p>
                </div>
                <div>
                    <h4>交易金额</h4>
                    <p>今日：</p>
                    <p>昨日：</p>
                    <p>查看详情</p>
                    <p>更新时间</p>
                    <p>18.03.09 18:43:59</p>
                </div>
                <div>
                    <h4>新增资产</h4>
                    <p>今日：</p>
                    <p>昨日：</p>
                    <p>查看详情</p>
                    <p>更新时间</p>
                    <p>18.03.09 18:43:59</p>
                </div>
                <div>
                    <h4>新增需求</h4>
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