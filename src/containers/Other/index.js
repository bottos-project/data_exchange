import React,{PureComponent} from 'react'
import BlockHeader from './BlockView/blockHeader'
import BlockList from './BlockView/blockList'
import BTMap from './BlockView/BTMap'
import BTFetch from '../../utils/BTFetch'
// import {BlockHeader,BlockList} from './BlockView'
import './styles.less'
// import BlockList from "./BlockView/blockList";
const list=[
    {
        key:1,
        title:'Total BTO',
        num:7.538
    },
    {
        key:2,
        title:'Last Block',
        num:1.426
    },
    {
        key:3,
        title:'Total Trans',
        num:7.538
    },
    {
        key:4,
        title:'Total Nodes',
        num:7.538
    }
]
export default class BTBlockList extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            list:list,
            block_view:[],
            Total_BTO:'',
            Total_Trans:'',
            Total_Nodes:''
        }
    }
    componentDidMount(){
        BTFetch('http://10.104.10.152:8080/v2/dashboard/GetRecentTxList','GET',{},{
            full_path:true,
        }).then(res=>{
            if(res.code == 1){
                this.setState({
                    block_view:JSON.parse(res.data)
                })
            }
        });
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
            <div className="blockbox">
                <div className='blockheader'>
                    <div className='headerView'>
                        <div className='view-img'>
                            <p style={{background:"url('https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1516257913&di=8e4a6c5bf89123bfa27db5c4b298a993&src=http://userimg.yingyonghui.com/head/03/1468655276295/6420803.png-thumb')",}}> </p>
                            <span>Total BTO</span>
                        </div>
                        <h4>{this.state.Total_BTO}</h4>
                    </div>
                    <div className='headerView'>
                        <div className='view-img'>
                            <p style={{background:"url('https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1516257913&di=8e4a6c5bf89123bfa27db5c4b298a993&src=http://userimg.yingyonghui.com/head/03/1468655276295/6420803.png-thumb')",}}> </p>
                            <span>Last Block</span>
                        </div>
                        <h4>1</h4>
                    </div>
                    <div className='headerView'>
                        <div className='view-img'>
                            <p style={{background:"url('https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1516257913&di=8e4a6c5bf89123bfa27db5c4b298a993&src=http://userimg.yingyonghui.com/head/03/1468655276295/6420803.png-thumb')",}}> </p>
                            <span>Total Trans</span>
                        </div>
                        <h4>{this.state.Total_Trans}</h4>
                    </div>
                    <div className='headerView'>
                        <div className='view-img'>
                            <p style={{background:"url('https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1516257913&di=8e4a6c5bf89123bfa27db5c4b298a993&src=http://userimg.yingyonghui.com/head/03/1468655276295/6420803.png-thumb')",}}> </p>
                            <span>Total Nodes</span>
                        </div>
                        <h4>{this.state.Total_Nodes}</h4>
                    </div>
                   {/* {
                        this.state.list.map(function(res){
                            return (<div className='headerView' key={res.key}>
                                <div className='view-img'>
                                    <p style={{background:"url('https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1516257913&di=8e4a6c5bf89123bfa27db5c4b298a993&src=http://userimg.yingyonghui.com/head/03/1468655276295/6420803.png-thumb')",
                                    }}> </p>
                                    <span>{res.title}</span>

                                </div>
                                <h4>{res.num}</h4>
                            </div>)
                        })
                    }*/}
                </div>
                <div className='blockall'>
                    <div className='view_all'>
                        <div className="view_header">
                            <h2>Blocks</h2>
                            <a >View All</a>
                        </div>
                        <div className="blockdetail">
                            {
                                this.state.block_view.map((data,index)=>{
                                   return(
                                       <BlockList key={index} block={data}/>
                                   )
                                })
                            }
                            {/*<BlockList/>*/}
                            {/*<BlockList/>*/}
                            {/*<BlockList/>*/}
                            {/*<BlockList/>*/}
                            {/*<BlockList/>*/}

                        </div>
                    </div>
                    <div className="node">
                        <h4>Node Distribution</h4>
                        <BTMap/>
                    </div>
                </div>
            </div>
        )
    }
}