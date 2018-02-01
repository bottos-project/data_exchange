import React,{PureComponent} from 'react'
import { Table, Icon } from 'antd'
import "./style.less"

const columns = [
    { title: 'To', dataIndex: 'to', key: 'to',render:() =>
            <div>
                <a href="#" style={{color:"#6d6df5"}}>Jack</a>
            </div>
    },
    { title: 'State', dataIndex: 'state', key:'state' },
    { title: 'price', dataIndex: 'price', key: 'price',render:()=>
            <div>
                <img src="http://upload.ouliu.net/i/2018012217455364b5l.png" style={{width:20,height:20,margin:5}} alt=""/>
                <span>200</span>
            </div>
    },
    { title: 'Sample', dataIndex: 'sample', key: 'sample',render:() =>
            <a>
                <Icon type="download" style={{color:"black",fontWeight:900}}/>
            </a>
    },
    { title: 'SampleSize',dataIndex:'sampleSize',key:'sampleSize'},
    { title: 'From', dataIndex: 'from', key: 'from',render:() =>
            <div>
                <a href="#" style={{color:"#6d6df5"}}>Tom</a>
            </div>
    },
    { title: 'Action', dataIndex: '', key: 'x', render: () =>
            <div>
                <a href="#" style={{backgroundColor:"black",color:"white",margin:"2px",padding:"1px 5px",borderRadius:"3px"}}>Cancel</a>
                <a href="#" style={{backgroundColor:"black",color:"white",margin:"2px",padding:"1px 5px",borderRadius:"3px"}}>Agree</a>
                <a href="#" style={{backgroundColor:"black",color:"white",margin:"2px",padding:"1px 5px",borderRadius:"3px"}}>Reject</a>
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
                    bordered
                    columns={columns}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={data}
                />
            </div>
        )
    }
}





