import React,{PureComponent} from 'react'
import {Popconfirm,Table} from 'antd';
import BTFetch from "../../../../utils/BTFetch";


export default class BTAssetDetail extends PureComponent{
    constructor(props){
        super(props)
        this.columns = [
            { title: 'Title', dataIndex: 'title', key: 'title' },
            { title: 'Type', dataIndex: 'type', key: 'type' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
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
        const data = [];
        for (let i = 0; i < 5; ++i) {
            data.push({
                key: i,
                title: 'pandas',
                type:'数据清洗',
                price: '150',
                deadline: '2018-01-15 23:12:00',
                description:'i want some pictures of pandas',
            });
        }
        this.state = {
            data,
            count:7
        };
    }

    onDelete(key){
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
        const deleteDataSource = this.state.data[key];//被删除的一行的数据
        BTFetch("","post",deleteDataSource).then((data)=>{
            console.log(data)
        })
    }


    render(){
        const { data } = this.state;
        const columns = this.columns;
        return(

            <div>
                <Table bordered dataSource={data} columns={columns} />
            </div>
        )
    }
}