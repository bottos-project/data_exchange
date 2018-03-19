import React,{PureComponent} from 'react'
import { Pagination } from 'antd';
import {Table} from 'antd'
import {Icon} from 'antd'
import BTFetch from '../../../../utils/BTFetch'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const WalletMessages = messages.Wallet;
class Detail extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            history:[],
        }
    }
    render(){
        let data = this.props.historydetail;
        // console.log(this.state.history);
        return <div className="detail">
           {/* {
                this.state.history.length == 0 ? <span></span>
                    :
                    ( <div className='left'>
                        <p><span>交易号&nbsp;:&nbsp;</span><span>{data.tx_id}</span></p>
                        <p><span>Form&nbsp;:&nbsp;</span><span>{data.from}</span></p>
                        <p><span>时间&nbsp;:&nbsp;</span><span>{data.tx_time}</span></p>

                    </div>
                    <div className="right">
                        <p><span>块号&nbsp;:&nbsp;</span><span>{data.block_num}</span></p>
                        <p><span>To&nbsp;:&nbsp;</span><span>{data.to}</span></p>
                        <p><span>金额&nbsp;:&nbsp;</span><span>转出&nbsp;{data.price}BTO</span></p>
                    </div>
                )
            }*/}
            <div className='left'>
                <p>
                    <span>
                        <FormattedMessage {...WalletMessages.TransactionID}/>
                    </span>
                    <span>
                        {data.tx_id}
                    </span>
                </p>
                <p>
                    <span>
                        <FormattedMessage {...WalletMessages.From}/>
                    </span>
                    <span>
                        {data.from}
                    </span>
                </p>
                <p>
                    <span>
                        <FormattedMessage {...WalletMessages.Date}/>
                    </span>
                    <span>
                        {data.tx_time}
                    </span>
                </p>

            </div>
            <div className="right">
                <p>
                    <span>
                        <FormattedMessage {...WalletMessages.BlockNumber}/>
                    </span>
                    <span>
                        {data.block_num}
                    </span>
                </p>
                <p>
                    <span>
                        <FormattedMessage {...WalletMessages.To}/>
                    </span>
                    <span>
                        {data.to}
                    </span>
                </p>
                <p>
                    <span>
                        <FormattedMessage {...WalletMessages.Price}/>
                    </span>
                <span>
                    <FormattedMessage {...WalletMessages.TurnOut}/>
                    {data.price}BTO
                </span>
                </p>
            </div>
        </div>
    }
}
export default class History extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            history:[],
            historydetail1:[]
        }
    }


    componentDidMount(){
        //转账历史记录
        let url='http://10.104.21.10:8080/v2/user/QueryTransfer';
        let data={
            "userName": "btd121",
            "random": "fileName123",
            "signatures": "0xxxx"
        };
        BTFetch(url,'post',data,{
            full_path:true,
        }).then(res=>{
            if(res.code == '1'){
                let history=JSON.parse(res.data);
                this.setState({
                    history:history,
                });
                console.log(this.state.history)
            }
        });
    }
    handleOver(e){

        this.setState({
            historydetail1:(this.state.history)[e],
        });
        console.log(e,this.state.historydetail1)

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
                        <span className="account_address">区块号</span>
                    </li>
                    {
                        this.state.history.map((data,index)=>{
                            let date1 = new Date(data.age).toLocaleString();
                            return (
                                <li key={index} onClick={()=>this.handleOver(index)}>
                                    <span className='icon'>
                                        <img src="./img/show.png" alt=""/>
                                        <img src="./img/info.png" alt=""/>

                                    </span>
                                    <span className="exhash">{data.tx_id}</span>
                                    <span className='age'>{data.tx_time}</span>
                                    <span className='coin'>{data.price}</span>
                                    <span className='from'>{data.from}</span>
                                    <span className='in_out'>
                                        <Icon type="arrow-right" style={{ fontSize: 16, color: '#00b1a9' }} />
                                    </span>
                                    <span className='to'>{data.to}</span>
                                    {/*<span className='account'>{data.account}</span>*/}
                                    <span className='account_address'>{data.block_num}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                <Detail historydetail={1} />

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