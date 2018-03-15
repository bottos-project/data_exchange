import React,{PureComponent} from 'react'
import {Popconfirm,Table, Upload, Icon, message} from 'antd';
import BTFetch from "../../../../utils/BTFetch"
const Dragger = Upload.Dragger;

const props = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};



export default class BTMyAssetSet extends PureComponent{
    constructor(props){
        super(props);
        this.columns = [
            { title: 'sampleName', dataIndex: 'sampleName', key: 'sampleName' },
            { title: 'sampleSize', dataIndex: 'sampleSize', key: 'sampleSize' },
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: "Download", dataIndex: '', key: 'x', render: () =>
                    <a>
                        <Icon type="download" style={{color:"black",fontWeight:900}}/>
                    </a>
            },
            { title: 'Delete', dataIndex: 'delete',
                render: (text, record) => {
                    return (
                        // this.state.dataSource.length > 1 ?
                        //     (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                            <a href="#" style={{color:"#6d6df5"}}>Delete</a>
                        </Popconfirm>
                        // ) : null
                    );
                },
            },
        ];

        const data = [];
        for (let i = 0; i < 7; ++i) {
            data.push({
                key: i,
                sampleName:"samples.zip",
                sampleSize:"3M",
                date: '2018-01-15 23:12:00',
            });
        }

        this.state = {
            data,
        }
    }

    onDelete(key){
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }
    componentDidMount() {
       /* BTFetch("","post",{}).then(data=>{
            console.log(data)
        })*/
    }

    render(){
        const { data } = this.state;
        const columns = this.columns;
        return(
            <div className="set">
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p style={{color:"#666666"}} className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p style={{color:"#666666"}} className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dragger>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={data}
                        className="shadow radius table"
                    />
            </div>
        )
    }
}



