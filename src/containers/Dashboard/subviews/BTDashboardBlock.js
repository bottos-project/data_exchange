import React,{PureComponent} from 'react'
import "./dashboardStyle.less"
import BTFetch from "../../../utils/BTFetch";
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const DashboardMessages = messages.Dashboard;



export default class BTDashboardTitle extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
    }
    componentDidMount(){

    }
    getAccount(){

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
                   <a style={{color:"#4F43B6"}} onClick={()=>this.getAccount()}>
                       <FormattedMessage {...DashboardMessages.Registration}/>
                   </a>
                   <p>
                       <FormattedMessage {...DashboardMessages.Yesterday}/>
                   </p>
               </div>
                <div>
                    <a style={{color:"#4F43B6"}} onClick={()=>this.exchangeNum()}>
                        <FormattedMessage {...DashboardMessages.VolumeOfTransaction}/>
                    </a>
                    <p>
                        <FormattedMessage {...DashboardMessages.Yesterday}/>
                    </p>
                </div>
                <div>
                    <a style={{color:"#4F43B6"}} onClick={()=>this.exchangeCoin()}>
                        <FormattedMessage {...DashboardMessages.TransactionAmount}/>
                    </a>
                    <p>
                        <FormattedMessage {...DashboardMessages.Yesterday}/>
                    </p>
                </div>
                <div onClick={()=>this.assetNum()}>
                    <a style={{color:"#4F43B6"}}>
                        <FormattedMessage {...DashboardMessages.IncrementalAsset}/>
                    </a>
                    <p>
                        <FormattedMessage {...DashboardMessages.Yesterday}/>
                    </p>
                </div>
                <div onClick={()=>this.requireNum()}>
                    <FormattedMessage {...DashboardMessages.IncrementalDemand}/>
                    <p>
                        <FormattedMessage {...DashboardMessages.Yesterday}/>
                    </p>
                </div>
            </div>
        )
    }
}