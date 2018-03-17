import React,{PureComponent} from 'react'
import BTFetch from '../../../utils/BTFetch'
import "../styles.less"
export default class BTOtherAllBlock extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            block_view:[],
            Total_BTO:'',
            Total_Trans:'',
            Total_Nodes:''
        }
    }
    componentDidMount(){
        //获取Total_BTO总量
        BTFetch('/dashboard/GetSumTxAmount','GET').then(res=>{
            if(res.code == 1){
                this.setState({
                    Total_BTO:res.data.num
                })
            }
        });
        //获取Total_Trans总量
        BTFetch('/dashboard/GetAllTxNum','GET').then(res=>{
            if(res.code == 1){
                this.setState({
                    Total_Trans:res.data.num
                })
            }
        })
        BTFetch('/dashboard/GetNodeInfos','GET').then(res=>{
            if(res.code == 1){
                console.log(typeof JSON.parse(res.data),JSON.parse(res.data).length);
                let Total_Nodes=JSON.parse(res.data).length;
                this.setState({
                    Total_Nodes,
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
                            <span>Total BTO</span>
                        </div>
                        <p>{this.state.Total_BTO}</p>
                    </div>
                    <div>
                        <div>
                            <span>Last Block</span>
                        </div>
                        <p> </p>
                    </div>
                    <div>
                        <div>
                            <span>Total Trans</span>
                        </div>
                        <p>{this.state.Total_Trans}</p>
                    </div>
                    <div>
                        <div>
                             <span>Total Nodes</span>
                        </div>
                        <p>{this.state.Total_Nodes}</p>
                    </div>
                </div>

            </div>
        )
    }
}