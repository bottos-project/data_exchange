import React,{PureComponent} from 'react'
import { Table, Icon } from 'antd'

const columns = [
    { title: 'To', dataIndex: '', key: 'y', render: ()=>
            <div>
                <a href="#">John</a>
            </div>
    },
    { title: 'State', dataIndex: 'state', key:'state' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Sample', dataIndex: 'sample', key: 'sample',render:() =>
            <div>
                <a href="#">download</a>
            </div>
    },
    { title: 'SampleSize',dataIndex:'sampleSize',key:'sampleSize'},
    { title: 'From', dataIndex: 'from', key: 'from',render:() =>
            <div>
                <a href="#">Tom</a>
            </div>
    },
    { title: 'Action', dataIndex: '', key: 'x', render: () =>
            <div>
                <a href="#">Cancel </a>
                <a href="#">Agree </a>
                <a href="#">Reject</a>
            </div>
},
    { title: 'Date', dataIndex: 'date', key: 'date' },

];

const data = [];
for (let i = 0; i < 5; ++i) {
    data.push({
        key: i,
        to:"jack",
        state:"checking",
        price:"200",
        sample:"samples.zip",
        sampleSize:"3M",
        date: '2018-01-15 23:12:00',
        description:"pictures of pandas"
    });
}

export default class BTCheck extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div style={{width:"90%",height:"100%"}}>
                <Table
                    columns={columns}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={data}
                />
            </div>
        )
    }
}





