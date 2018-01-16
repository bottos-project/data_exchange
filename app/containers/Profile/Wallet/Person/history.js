import React,{PureComponent} from 'react'
import { Pagination } from 'antd';
import {Table} from 'antd'
const columns = [
    { title: '交易号',  dataIndex: 'name',   },
    { title: '区块',  dataIndex: 'age',  },
    { title: '交易完成时间', dataIndex: 'time', },
    { title: '消耗铂币', dataIndex: 'bobi', },
];

const data = [{
    key: '1',
    name: '0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    age: '0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    time: '2017-11-3 12:29:00',
    bobi:20,
}, {
    key: '2',
    name: '0x1233f4d813cfa446450a3bb4f9a64558a0262d97',
    age: '0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    time: '2018-1-10 17:10:07',
    bobi:60,
},{
    key: '3',
    name: '0x1233f4d813cfa446450a3bb4f9a64558a0262d97',
    age: '0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    time: '2018-1-10 17:10:07',
    bobi:60,
},{
    key: '4',
    name: '0x1233f4d813cfa446450a3bb4f9a64558a0262d97',
    age: '0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    time: '2018-1-10 17:10:07',
    bobi:60,
},{
    key: '5',
    name: '0x1233f4d813cfa446450a3bb4f9a64558a0262d97',
    age: '0x03f2b4d813cfa446450a3bb4f9a64558a0262d97',
    time: '2018-1-10 17:10:07',
    bobi:60,
}];
export default class History extends PureComponent{

    render(){
        return (
            <div>
                {/*头部信息1*/}
                <div>
                    <p><span>交易号&nbsp;:&nbsp;</span><span>0x1233f4d813cfa446450a3bb4f9a64558a0262d97</span></p>
                    <p><span>区块号&nbsp;:&nbsp;</span><span>0x1233f4d813cfa446450a3bb4f9a64558a0262d97</span></p>

                    <p><span>交易时间 ：</span><span>2016-2-12 12:22:46</span><span>&nbsp;&nbsp;交易金额</span><span>2 bobi</span></p>
                </div>
                <Table columns={columns} dataSource={data}  />
            </div>
           /* <div className="history">
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

            </div>*/
        )
    }
}