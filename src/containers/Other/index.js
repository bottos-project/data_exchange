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
            Total_Block:''
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
    render(){
        return(
            <div className="container column">
                <div>
                    <BTOtherTitle/>
                </div>
                <div>
                    <BTOtherAllBlock lastBlock={this.state.Total_Block}/>
                </div>
                <div>
                    <BTMap/>
                </div>
                <div>
                    <BTOtherBlocks newblock={(block)=>this.getNewBlock(block)} />
                    <BTOtherExchange/>
                </div>
            </div>
        )
    }
}