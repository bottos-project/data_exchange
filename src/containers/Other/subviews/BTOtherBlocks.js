import React,{PureComponent} from 'react'
import BlockList from './blockList'
import BTFetch from "../../../utils/BTFetch";
export default class BTOtherBlocks extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            block_view:[],
        }
    }
    componentDidMount() {
        BTFetch('/dashboard/GetRecentTxList', 'GET', {}, {
            full_path: false,
            service:"service"
        }).then(res => {
            if (res.code == 1) {
                this.setState({
                    block_view: JSON.parse(res.data)
                })
            }
        });
    }

    render(){
        return(
                <div className="OtherBlocksMessage">
                    <div>
                        <h3>Blocks</h3>
                        <a >View All</a>
                    </div>
                    <div>
                        {
                            this.state.block_view.map((data,index)=>{
                                return(
                                    <BlockList key={index} block={data}/>
                                )
                            })
                        }
                    </div>
                </div>
        )
    }
}