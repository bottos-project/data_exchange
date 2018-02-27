import React,{PureComponent} from 'react'
import { Pagination } from 'antd';
import {Table} from 'antd'
import {Icon} from 'antd'
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
class Detail extends PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        return <div className="detail">
            <div className='left'>
                <p><span>交易号&nbsp;:&nbsp;</span><span>23243214321413241243214321</span></p>
                <p><span>Form&nbsp;:&nbsp;</span><span>23243214321413241243214321</span></p>
                <p><span>时间&nbsp;:&nbsp;</span><span>2012-1-32 11:34;22am</span></p>

            </div>
            <div className="right">
                <p><span>块号&nbsp;:&nbsp;</span><span>23243214321413241243214321</span></p>
                <p><span>To&nbsp;:&nbsp;</span><span>23243214321413241243214321</span></p>
                <p><span>金额&nbsp;:&nbsp;</span><span>转出&nbsp;32BOB</span></p>
            </div>
        </div>
    }
}
export default class History extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            history:list,
        }
    }
    handleOver(e){
        // e.target.parentNode.after(_detail);
    }
    render(){
        return (
            <div className="history">
                <header>Transfer History  </header>
                <ul className='ul' style={{height:'210px',overflow:'hidden'}}>
                    <li style={{background:''}}>
                        <span className='icon'>&nbsp;</span>
                        <span className='exhash'>交易号</span>
                        <span className='age'>时间</span>
                        <span className='coin'>金额</span>
                        <span className='from'>From</span>
                        <span className='in_out'>&nbsp;</span>
                        <span className='to'>To</span>
                        {/*<span className='account'>账户名称</span>*/}
                        <span className="account_address">账户详细地址</span>
                    </li>
                    {
                        this.state.history.map((data)=>{
                            let date1 = new Date(data.age).toLocaleString();
                            return (
                                <li key={data.id} onClick={(e)=>this.handleOver(e)}>
                                    <span className='icon'>
                                        {/*<Icon type="arrow-up" style={{ fontSize: 16, color: '#00b1a9' }} />*/}
                                        {/*<img src="../../../../static/img/show.png" alt=""/>*/}
                                       {/* <i className='show_hide'></i>
                                        <i className='up_down'></i>*/}
                                        <img src="../../../../static/img/show.png" alt=""/>
                                        <img src="../../../../static/img/info.png" alt=""/>

                                    </span>
                                    <span className="exhash">{data.exhash}</span>
                                    <span className='age'>{date1}</span>
                                    <span className='coin'>{data.coin}</span>
                                    <span className='from'>{data.from}</span>
                                    <span className='in_out'>
                                        <Icon type="arrow-right" style={{ fontSize: 16, color: '#00b1a9' }} />
                                    </span>
                                    <span className='to'>{data.to}</span>
                                    {/*<span className='account'>{data.account}</span>*/}
                                    <span className='account_address'>{data.account_address}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                <Detail/>

                <Pagination showQuickJumper defaultCurrent={2} total={20}  />

                {/* <div className="content">
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
                </div>*/}

            </div>
        )
    }
}