import React,{PureComponent} from 'react'
import BTFetch from '../../../utils/BTFetch'
import "../styles.less"
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const BlockBrowsingMessages = messages.BlockBrowsing;
export default class BTOtherAllBlock extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            block_view:[],
            Total_BTO:'',
            Total_Trans:'',
            Total_Nodes:'',
            Total_Block:''
        }
    }
    componentDidMount(){
        //获取Total_BTO总量
        /*BTFetch('/dashboard/GetSumTxAmount','GET').then(res=>{
            if(res&&res.code == 1){
                this.setState({
                    Total_BTO:res.data.num
                })
            }
        });*/
        //获取Total_Trans总量
        BTFetch('/dashboard/GetAllTxNum','GET').then(res=>{
            if(res&&res.code == 1){
                this.setState({
                    Total_Trans:res.data.num
                })
            }
        });

        BTFetch('/dashboard/GetNodeInfos','GET').then(res=>{
            if(res&&res.code == 0){
                // let Total_Nodes=JSON.parse(res.data).length;
                if(res.data==null){
                    return ;
                }
                console.log(res.data)
                this.setState({
                    Total_Nodes:res.data.length
                })
            }
        })


    }
    render(){
        return (
            <div>
                <div className="OtherBlockDetails radius shadow">
                    <div>
                        <div>
                            <span>
                                <FormattedMessage {...BlockBrowsingMessages.TotalBTO}/>
                            </span>
                        </div>
                        <p>1,000,000,000</p>
                    </div>
                    <div>
                        <div>
                            <span>
                                <FormattedMessage {...BlockBrowsingMessages.LastBlock}/>
                            </span>
                        </div>
                        <p>{this.props.lastBlock} </p>
                    </div>
                    <div>
                        <div>
                            <span>
                                <FormattedMessage {...BlockBrowsingMessages.TotalTrans}/>
                            </span>
                        </div>
                        <p>{this.state.Total_Trans}</p>
                    </div>
                    <div>
                        <div>
                             <span>
                                 <FormattedMessage {...BlockBrowsingMessages.TotalNodes}/>
                             </span>
                        </div>
                        <p>{this.state.Total_Nodes}</p>
                    </div>
                </div>

            </div>
        )
    }
}