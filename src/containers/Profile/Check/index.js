import React,{PureComponent} from 'react'
import { Table, Icon } from 'antd'
import "./style.less"
import BTFetch from "../../../utils/BTFetch";

const columns = [
    { title: 'To', dataIndex: 'requireID', key: 'requireID',render:() =>
            <div>
                <a href="#" style={{color:"#6d6df5"}}>Jack</a>
            </div>
    },
    { title: 'State', dataIndex: 'state', key:'state' },
    { title: 'FeatureTag', dataIndex: 'featureTag', key:'featureTag' },
    { title: 'Price', dataIndex: 'price', key: 'price',render:()=>
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
    { title: 'From', dataIndex: 'assetID', key: 'assetID',render:() =>
            <div>
                <a href="#" style={{color:"#6d6df5"}}>Tom</a>
            </div>
    },
    { title: 'Cancel', dataIndex: '', key: 'x', render: () =>
            <div>
                <a href="#" style={{backgroundColor:"black",color:"white",padding:"1px 5px",borderRadius:"3px"}}>Cancel</a>
            </div>
},
    { title: 'Agree', dataIndex: '', key: 'y', render: () =>
            <div>
                <a onClick={()=>this.onClick()} href="#" style={{backgroundColor:"black",color:"white",padding:"1px 5px",borderRadius:"3px"}}>Agree</a>
            </div>
    },
    { title: 'Reject', dataIndex: '', key: 'z', render: () =>
            <div>
                <a href="#" style={{backgroundColor:"black",color:"white",padding:"1px 5px",borderRadius:"3px"}}>Reject</a>
            </div>
    },
    { title: 'Date', dataIndex: 'date', key: 'date' },

];

const data = [];
for (let i = 0; i < 5; ++i) {
    data.push({
        key: i,
        requireID:"jack",
        state:"checking",
        featureTag:"pictures",
        price:"200",
        sample:"samples.zip",
        sampleSize:"3M",
        date: '2018-01-15 23:12:00',
        // description:"pictures of pandas",
        assetID:"Tom"
    });
}

export default class BTCheck extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            agree:"",
            reject:"",
            cancel:"",
            data:[],
        }
    }

    componentDidMount() {
        BTFetch("","post",JSON.stringify({sessionID:"lalala"})).then(data=>{
            data = {
                code:'1',
                response:{
                    dlf:'sdf'
                }
            };
            let response = data.response;
            this.setState({
                data:response
            });
            console.log(data)
        }).catch(error=>{
            console.log(error)
        })
    }
    render(){
        return(
            <div style={{width:"90%",height:"100%"}}>
                <Table
                    bordered
                    columns={columns}
                    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={data}
                />
            </div>
        )
    }
}





