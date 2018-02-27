import React,{PureComponent} from 'react'
import BlockHeader from './BlockView/blockHeader'
import BlockList from './BlockView/blockList'
import BTMap from './BlockView/BTMap'
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
        title:'Lest Block',
        num:1.426
    },
    {
        key:3,
        title:'Total Trans',
        num:7.538
    },
    {
        key:4,
        title:'Total Modes',
        num:7.538
    }
]
export default class BTBlockList extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            list:list
        }
    }
    render(){
        return (
            <div className="blockbox">
                <div className='blockheader'>
                    {
                        this.state.list.map(function(res){
                            // console.log(res)
                            return (<div className='headerView' key={res.key}>
                                <div className='view-img'>
                                    <p style={{background:"url('https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1516257913&di=8e4a6c5bf89123bfa27db5c4b298a993&src=http://userimg.yingyonghui.com/head/03/1468655276295/6420803.png-thumb')",
                                    }}> </p>
                                    <span>{res.title}</span>

                                </div>
                                <h4>{res.num}</h4>
                            </div>)
                        })
                    }
                </div>
                <div className='blockall'>
                    <div className='view_all'>
                        <div className="view_header">
                            <h2>Blocks</h2>
                            <a >View All</a>
                        </div>
                        <div className="blockdetail">
                            <BlockList/>
                            <BlockList/>
                            <BlockList/>
                            <BlockList/>
                            <BlockList/>

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