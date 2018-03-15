import React,{PureComponent} from 'react'
import BTOtherTitle from "./subviews/BTOtherTitle"
import BTOtherAllBlock from "./subviews/BTOtherAllBlock";
import BTMap from "./subviews/BTMap"
import BTOtherBlocks from "./subviews/BTOtherBlocks";
export default class BTOther extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            list:[],
            block_view:[],
            Total_BTO:'',
            Total_Trans:'',
            Total_Nodes:''
        }
    }

    render(){
        return(
            <div className="container column">
                <div>
                    <BTOtherTitle/>
                </div>
                <div>
                    <BTOtherAllBlock/>
                </div>
                <div>
                    <BTOtherBlocks/>
                    <BTMap/>
                </div>
            </div>
        )
    }
}