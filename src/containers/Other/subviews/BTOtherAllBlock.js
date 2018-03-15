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
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetSumTxAmount','GET',{},{
            full_path:true,
        }).then(res=>{
            if(res.code == 1){
                this.setState({
                    Total_BTO:res.data.num
                })
            }
        });
        //获取Total_Trans总量
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetAllTxNum','GET',{},{
            full_path:true,
        }).then(res=>{
            if(res.code == 1){
                this.setState({
                    Total_Trans:res.data.num
                })
            }
        })
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetNodeInfos','GET',{},{
            full_path:true,
        }).then(res=>{
            if(res.code == 1){
                console.log(JSON.parse(res.data));
                this.setState({
                    // Total_Nodes:res.data.num
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