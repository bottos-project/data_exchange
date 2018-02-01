import React,{PureComponent} from 'react'
import BlockHeader from './BlockView/blockHeader'
import BlockList from './BlockView/blockList'
import Map from './BlockView/map'
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
                                <img src="" alt=""/>
                                <p>{res.num}</p>
                                <h4>{res.title}</h4>
                            </div>)
                        })
                    }
                    {/*<div className='headerView'>
                        <img src="" alt=""/>
                        <p>7.538</p>
                        <h4>Total BTO</h4>
                    </div>*/}
                   {/* <BlockHeader />
                    <BlockHeader />
                    <BlockHeader />
                    <BlockHeader />*/}
                </div>
                <div className='blockall'>
                    <div className='view_all'>
                        <div className="view_header">
                            <h2><i></i>Blocks</h2>
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
                        <Map/>
                    </div>
                </div>
            </div>
        )
    }
}