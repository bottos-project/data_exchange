import React,{PureComponent} from 'react'
import { Pagination } from 'antd';
import {Table} from 'antd'
const list=[{
    'id':1,
    'from':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'to':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'time':1516247901000,
    'num':230
},{
    'id':2,
    'from':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'to':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'time':1512397901000,
    'num':189
},{
    'id':3,
    'from':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'to':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'time':1516247901000,
    'num':892
},{
    'id':4,
    'from':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'to':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'time':1512397901000,
    'num':27
},{
    'id':5,
    'from':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'to':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'time':1562247901000,
    'num':892
},{
    'id':7,
    'from':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'to':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'time':1712397901000,
    'num':27
},{
    'id':8,
    'from':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'to':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'time':1712397901000,
    'num':27
    }];
export default class History extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            history:list,
        }
    }
    handleOver(){
        console.log(1)
    }
    render(){
        return (
            <div className="history">
                <header>Transfer History  </header>
                <div className="content">
                    <div className="exchange">
                        <span className='number'>块号&nbsp;:</span>
                        <span>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                        <span className='number'>交易号&nbsp;:</span>
                        <span>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                    </div>
                    <div className="exchange">
                        <span className='number'>Form&nbsp;:</span>
                        <span>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                        <span className='number'>To&nbsp;:</span>
                        <span>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                    </div>
                    <div className="exchange">
                        <span className='number'>时间&nbsp;:</span>
                        <span>2018-1-23 13:12:58</span>
                        <span style={{paddingLeft:20}}>金额:&nbsp;&nbsp;</span>
                        <span style={{color:'red',fontSize:14,paddingRight:10}}>20</span>
                        <span>转入</span>
                    </div>
                </div>
                <ul className='ul' style={{height:'210px',overflow:'hidden'}}>
                    <li style={{background:'#00b1a9'}}>
                        <span className='one'>区块</span>
                        <span className='two'>交易号</span>
                        <span className='three'>时间</span>
                        <span className='four'>金额</span>
                    </li>
                    {
                        this.state.history.map((data)=>{
                            let date1 = new Date(data.time).toLocaleString();
                            return (
                                <li key={data.id} onClick={()=>this.handleOver()}>
                                    <span className='one'>{data.from}</span>
                                    <span className='two'>{data.to}</span>
                                    <span className='three'>{date1}</span>
                                    <span className='four'>{data.num}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                <Pagination showQuickJumper defaultCurrent={2} total={20}  />

            </div>
        )
    }
}