import React,{PureComponent} from 'react'
import {Popconfirm,Table,message} from 'antd';
import BTFetch from "../../../../utils/BTFetch";


export default class BTAssetDetail extends PureComponent{
    constructor(props){
        super(props)
        const data = [];
        this.state = {
            data:[],
        };
    }

    columns(data){
        console.log({
            data
        })

        return [
            { title: 'Title', dataIndex: 'requirement_name', key: 'title' },
            { title: 'Type', dataIndex: 'feature_tag', key: 'type' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
            { title: 'expire_time', dataIndex: 'expire_time', key: 'expire_time' ,render:(time)=>{
                return <span>{(new Date(time*1000)).toLocaleDateString()}</span>
                }},
            { title: 'Description', dataIndex: 'description', key: 'description' },
            { title: 'PublishDate', dataIndex:'publish_date', key: 'publishDate',render:(time)=>{
                return <span>{(new Date(time*1000)).toLocaleDateString()}</span>
                }},
            { title: 'Sample', dataIndex: 'sample_path', key: 'sample' ,render:(sample_path)=>{
                    return(
                        <a href={sample_path}>Download</a>
                    )

                }},
            { title: 'Delete', dataIndex: 'delete',key:'y',
                render: (text, record) => {
                    return (
                        // this.state.dataSource.length > 1 ?
                        //     (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                            <a href="#">Delete</a>
                        </Popconfirm>
                        // ) : null
                    );
                },
            },
            { title: 'Deadline', dataIndex: 'deadline', key: 'deadline' },
        ];
    }

    onDelete(key){
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
        const deleteDataSource = this.state.data[key];//被删除的一行的数据
        BTFetch("","post",deleteDataSource).then((data)=>{
            console.log(data)
        })
    }
    componentDidMount() {
        let param={
            "pageSize":20,
            "pageNum":1,
            "username":"btd121"
            // "featureTag":12345
        };
        BTFetch("/requirement/query",'post',param)
            .then(res=>{
                console.log(res.data.Row)
                if(res.code==0&&res.data.Row!='null'){
                    this.setState({
                        data:res.data.Row,
                    });
                }else{
                    message.warn('暂无发布资产')
                }
        }).catch(error=>{
            console.log(error)
        })
    }


    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(

            <div>
                <Table className="shadow radius table" bordered dataSource={this.state.data} columns={columns} />
            </div>
        )
    }
}