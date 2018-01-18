import React,{PureComponent} from 'react'
import { Table, Icon } from 'antd'

const columns = [
    { title: 'Name', dataIndex: '', key: 'y', render: ()=>
            <div>
                <a href="#">John</a>
            </div>
    },
    { title: 'Introduction', dataIndex: 'introduction', key: 'introduction' },
    { title: 'State', dataIndex: 'state', key:'state' },
    { title: 'Count', dataIndex: 'count', key: 'count' },
    { title: 'Bid', dataIndex: 'bid', key: 'bid' },
    { title: 'From', dataIndex: 'from', key: 'from' },
    { title: 'Action', dataIndex: '', key: 'x', render: () =>
            <div>
                <a href="#">Cancel </a>
                <a href="#">Agree </a>
                <a href="#">Reject</a>
            </div>
},
];

const data = [
    { key: 1, introduction:'i want to buy some Audios',state:'checked', bid:'200',count: 50, from: 'Tom', description: 'My name is John ,i want to buy some Audios' },
    { key: 2, introduction:'i want to buy some Videos',state:'checking',bid:'150',count: 50, from: 'Tom', description: 'My name is Jim i want to buy some Videos' },
    { key: 3, introduction:'i want to buy some Pictures',state:'checking',bid:'120',count: 50, from: 'Tom', description: 'My name is Joe i want to buy some Pictures' },
];

export default class BTCheck extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Table
                    columns={columns}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={data}
                />
            </div>
        )
    }
}





