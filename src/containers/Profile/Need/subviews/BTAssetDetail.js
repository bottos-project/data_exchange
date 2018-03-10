import React,{PureComponent} from 'react'
import {Popconfirm,Table} from 'antd';
import BTFetch from "../../../../utils/BTFetch";


export default class BTAssetDetail extends PureComponent{
    constructor(props){
        super(props)
        const data = [];
        this.state = {
            data,
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
            { title: 'expire_time', dataIndex: 'expire_time', key: 'expire_time' },
            { title: 'Description', dataIndex: 'description', key: 'description' },
            { title: 'PublishDate', dataIndex:'publish_date', key: 'publishDate'},
            { title: 'Sample', dataIndex: 'sample_path', key: 'sample' ,render:(sample_path)=>{
                    return(
                        <a href={sample_path}>Download</a>
                    )

                }},
            { title: 'Delete', dataIndex: 'delete',
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
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','text/plain');
        fetch("http://10.104.10.152:8080/v2/requirement/Query",{
            method:"post",
            header:myHeaders,
            body:JSON.stringify({
                feature_tag:111
            })
        }).then(response=>response.json()).then(data=>{
            console.log(data)
            // let resultData = data.data
            // console.log({
            //     resultData
            // })
            // if(resultData == 'null') return;

            let newdata = [{
                requirement_name:'dsf',
                feature_tag:'dsf',
                price:'dsf',
                expire_time:'dsf',
                description:'dsf',
                publish_date:'dsf',
                sample_path:'http://www.baidu.com',
                    }]

            // const theSureData = JSON.parse(data.data);
            // console.log(data);
            // var newdata = [];
            // for(let i=0;i<theSureData.length;i++){
            //     newdata.push({
            //         key: i,
            //         title:theSureData[i].requirement_name,
            //         type:theSureData[i].feature_tag,
            //         price:theSureData[i].price,
            //         deadline:theSureData[i].expire_time,
            //         description:theSureData[i].description,
            //         publishDate:theSureData[i].publish_date,
            //         Sample:theSureData[i].sample_path,
            //     })
            // }

            this.setState({
                data:newdata
            })
        }).catch(error=>{
            console.log(error)
        })
    }


    render(){
        const { data } = this.state;
        const columns = this.columns(data);
        return(

            <div>
                <Table bordered dataSource={data} columns={columns} />
            </div>
        )
    }
}