import React,{PureComponent} from 'react'
import { Pagination } from 'antd';
import {Table} from 'antd'
const list=[{
    'id':1,
    'exhash':'0xb084f732047fe39a2efc610cc9db603f88c7c81fdb45c67e40685928ed150cc7',
    'in_out':'转入',
    'age':1516247901000,
    'coin':230,
    'from':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'to':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'account':'sire',
    'account_address':'0xa3e07488972c3029bd42b00c0d440583b9f7d156'
},{
    'id':2,
    'exhash':'0xb084f732047fe39a2efc610cc9db603f88c7c81fdb45c67e40685928ed150cc7',
    'in_out':'转入',
    'age':1516247901000,
    'coin':230,
    'from':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'to':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'account':'sire',
    'account_address':'0xa3e07488972c3029bd42b00c0d440583b9f7d156'
},{
    'id':3,
    'exhash':'0xb084f732047fe39a2efc610cc9db603f88c7c81fdb45c67e40685928ed150cc7',
    'in_out':'转入',
    'age':1516247901000,
    'coin':230,
    'from':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'to':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'account':'sire',
    'account_address':'0xa3e07488972c3029bd42b00c0d440583b9f7d156'
},{
    'id':4,
    'exhash':'0xb084f732047fe39a2efc610cc9db603f88c7c81fdb45c67e40685928ed150cc7',
    'in_out':'转入',
    'age':1516247901000,
    'coin':230,
    'from':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'to':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'account':'sire',
    'account_address':'0xa3e07488972c3029bd42b00c0d440583b9f7d156'
},{
    'id':5,
    'exhash':'0xb084f732047fe39a2efc610cc9db603f88c7c81fdb45c67e40685928ed150cc7',
    'in_out':'转入',
    'age':1516247901000,
    'coin':230,
    'from':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'to':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'account':'sire',
    'account_address':'0xa3e07488972c3029bd42b00c0d440583b9f7d156'
},{
    'id':7,
    'exhash':'0xb084f732047fe39a2efc610cc9db603f88c7c81fdb45c67e40685928ed150cc7',
    'in_out':'转入',
    'age':1516247901000,
    'coin':230,
    'from':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'to':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'account':'sire',
    'account_address':'0xa3e07488972c3029bd42b00c0d440583b9f7d156'
},{
    'id':8,
    'exhash':'0xb084f732047fe39a2efc610cc9db603f88c7c81fdb45c67e40685928ed150cc7',
    'in_out':'转入',
    'age':1516247901000,
    'coin':230,
    'from':'0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    'to':'0xa3e07488972c3029bd42b00c0d440583b9f7d156',
    'account':'sire',
    'account_address':'0xa3e07488972c3029bd42b00c0d440583b9f7d156'
    }];
export default class History extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            history:list,
        }
    }
    handleOver(){
        // console.log(1)
    }
    render(){
        return (
            <div className="history">
                <header>Transfer History  </header>
                <ul className='ul' style={{height:'210px',overflow:'hidden'}}>
                    <li style={{background:'#00b1a9'}}>
                        <span className='exhash'>交易号</span>
                        <span className='in_out'>进出</span>
                        <span className='age'>时间</span>
                        <span className='coin'>金额</span>
                        <span className='from'>From</span>
                        <span className='to'>To</span>
                        {/*<span className='account'>账户名称</span>*/}
                        <span className="account_address">账户详细地址</span>
                    </li>
                    {
                        this.state.history.map((data)=>{
                            // debugger;
                            console.log(data)
                            let date1 = new Date(data.age).toLocaleString();
                            return (
                                <li key={data.id} onClick={()=>this.handleOver()}>
                                    <span className="exhash">{data.exhash}</span>
                                    <span className='in_out'>{data.in_out}</span>
                                    <span className='age'>{date1}</span>
                                    <span className='coin'>{data.coin}</span>
                                    <span className='from'>{data.from}</span>
                                    <span className='to'>{data.to}</span>
                                    {/*<span className='account'>{data.account}</span>*/}
                                    <span className='account_address'>{data.account_address}</span>
                                </li>
                            )
                        })
                    }

                </ul>
                <Pagination showQuickJumper defaultCurrent={2} total={20}  />

                <div className="content">
                    <div className="exchange">
                        <span className='number'>交易号&nbsp;:</span>
                        <span>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                        <span className='number'>块号&nbsp;:</span>
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
                        <span className='number'>账户详细地址&nbsp;:</span>
                    </div>
                </div>

            </div>
        )
    }
}