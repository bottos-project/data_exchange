import React,{PureComponent} from 'react'
import Transfer from "./tranfer";
import { Pagination } from 'antd';
import '../styles.less'
export default class Walletall extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        var marginLeft='0'
        // var float='left'
        return (
            <div className='all'>


            <div className='wallet_all'>
                <div className='wallet' style={{marginLeft}}>
                    <header>总额 <span>+</span></header>
                    <ul className='wallet_data'>
                        <li>
                            <span className='account'>account</span>
                            <span className='address'>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                            <span className='total'>total</span>
                        </li>
                        <li>
                            <span className='account'>account</span>
                            <span className='address'>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                            <span className='total'>total</span>
                        </li>
                        <li>
                            <span className='account'>account</span>
                            <span className='address'>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                            <span className='total'>total</span>
                        </li>

                    </ul>
                </div>
                    {/*交易*/}
                <Transfer />
            </div>
                <div className="history">
                    <header>Transfer History  </header>
                    <div className="content">
                        <div className="exchange">
                            <span className='number'>交易号&nbsp;:</span>
                            <span>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                        </div>
                        <div className="exchange">
                            <span className='number'>交易号&nbsp;:</span>
                            <span>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                        </div>
                        <div className="exchange">
                            <span className='number'>交易号&nbsp;:</span>
                            <span>aaa</span>
                        </div>
                    </div>
                    <ul className='ul'>
                        <li>
                            <span className='one'>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                            <span className='two'>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                            <span className='three'>2017-11-03&nbsp;12:02</span>
                            <span className='four'>35</span>
                        </li>
                        <li>
                            <span className='one'>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                            <span className='two'>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                            <span className='three'>2017-11-03&nbsp;12:02</span>
                            <span className='four'>35</span>
                        </li>
                        <li>
                            <span className='one'>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                            <span className='two'>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                            <span className='three'>2017-11-03&nbsp;12:02</span>
                            <span className='four'>35</span>
                        </li>
                        <li>
                            <span className='one'>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                            <span className='two'>0x03f2b4d813cfa446450a3bb4f9a64558a0262d97</span>
                            <span className='three'>2017-11-03&nbsp;12:02</span>
                            <span className='four'>35</span>
                        </li>
                    </ul>
                    <Pagination showQuickJumper defaultCurrent={2} total={500}  />

                </div>
            </div>
            /**/

        )
    }
}
