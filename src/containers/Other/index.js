import React,{PureComponent} from 'react'
import BTOtherTitle from "./subviews/BTOtherTitle"
import BTOtherAllBlock from "./subviews/BTOtherAllBlock";
import BTMap from "./subviews/BTMap"
import BTOtherBlocks from "./subviews/BTOtherBlocks";
import BTOtherExchange from "./subviews/BTOtherExchange";
import BTFetch from "../../utils/BTFetch";
export default class BTOther extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            list:[],
            block_view:[],
            Total_BTO:'',
            Total_Trans:'',
            Total_Nodes:'',
            newblock:'',
            Total_Block:'',
            map:[]
        }
    }
    getNewBlock(){
        BTFetch('/dashboard/GetBlockList', 'POST').then(res => {
            if (res&&res.code == 1) {
                if(res.data.rowCount>0){
                    let data=res.data.row;
                    this.setState({
                        Total_Block:data[0].block_num,
                    });
                }
            }
        });
    }
    componentDidMount(){
        BTFetch('/dashboard/GetNodeInfos','GET').then(res=>{
            if(res&&res.code == 0){
                if(res.data==null){
                    return ;
                }
                let node=[];
                for(let i of res.data){
                    node.push(i.address.split('|'));
                }
                this.setState({
                    Total_Nodes:res.data.length,
                    map:node,
                })
            }
        }).catch(error=>error)
    }
    render(){
        return(
            <div className="container column">
                <div>
                    <BTOtherTitle/>
                </div>
                <div>
                    <BTOtherAllBlock total={this.state.Total_Nodes} lastBlock={this.state.Total_Block}/>
                </div>
                <div>
                    <BTMap node={this.state.map} />
                </div>
                <div>
                    <BTOtherBlocks newblock={(block)=>this.getNewBlock(block)} />
                    <BTOtherExchange/>
                </div>
            </div>
        )
    }
}