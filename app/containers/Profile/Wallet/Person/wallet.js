import React,{PureComponent} from 'react'
import {Table,Icon} from 'antd'
import Walletall from './walletall'
import '../styles.less'

const columns = [
    { title: '钱包别名',  dataIndex: 'account',   },
    { title: '钱包地址',  dataIndex: 'address',  },
    { title: '铂币数量', dataIndex: 'number', },
];
const data=[
    {
        key:1,
        account:'Expand',
        address:'0x1233f4d813cfa446450a3bb4f9a64558a0262d97',
        number:'20'
    },
    {
        key:2,
        account:'moa',
        address:'0x1233f4d813cfa446450a3bb4f9a64558a0262d97',
        number:'20'
    },{
        key:3,
        account:'laaa',
        address:'0x1233f4d813cfa446450a3bb4f9a64558a0262d97',
        number:'560'
    },
    {
        key:4,
        account:'fdsafdsaf',
        address:'0x1233f4d813cfa446450a3bb4f9a64558a0262d97',
        number:'10'
    }
]
export default class Wallet extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        var margin='0 30px'
        return(
            <div style={{}}>
                <Table columns={columns} dataSource={data}  />

            </div>

        )
    }
}