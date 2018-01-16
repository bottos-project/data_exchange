import React,{PureComponent} from 'react'
import { Table, Badge, Menu, Dropdown, Icon,Upload, message, Button, Tabs, Input, DatePicker,Cascader  } from 'antd';
import moment from 'moment';
import './styles.less';
import BTList from '../../../components/BTList'
const TabPane = Tabs.TabPane;

import BTUploadAsset from './subviews/BTUploadAsset'


function handleClick(event) {
    this.setState({
        isEditVisible:true
    })
    event.preventDefault();
}


// const columns = [
//     { title: 'introduction', dataIndex: 'introduction', key: 'introduction' },
//     { title: 'count', dataIndex: 'count', key: 'count' },
//
//     { title: 'Action', dataIndex: '', key: 'x', render: () =>
//         <ul>
//             <a href="#" onClick={handleClick()}>edit </a>
//             <a href="#">Delete </a>
//             <a href="#">publish</a>
//         </ul>,
//     },
// ];

const data = [
    { key: 1, introduction: 'Audio', count: 32, description: 'the cat is singing' },
    { key: 2, introduction: 'Audio', count: 32, description: 'the cat is singing' },
    { key: 3, introduction: 'Audio', count: 32, description: 'the cat is singing' },

];

const menu = (
    <Menu>
    <Menu.Item>
    Action 1
</Menu.Item>
<Menu.Item>
Action 2
</Menu.Item>
</Menu>
);
const RangePicker = DatePicker.RangePicker;


const options = [{
    value: 'Video',
    label: 'Video',
    children: [{
        value: 'FacialRecognition',
        label: 'FacialRecognition',
        children: [{
            value: 'Person',
            label: 'Person',
        }],
    }],
}];

const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    },
    defaultFileList: [{
        uid: 1,
        name: 'xxx.png',
        status: 'done',
        reponse: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
    }, {
        uid: 2,
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
    }, {
        uid: 3,
        name: 'zzz.png',
        status: 'error',
        reponse: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
    }],
};

function onChange(value) {
    console.log(value);
}

function onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}
function callback(key) {
    console.log(key);
}

function NestedTable() {
    const expandedRowRender = () => {
            const columns = [
                { title: 'Introduction', dataIndex: 'Introduction', key: 'date' },
            ];
            const data = [];
            for (let i = 0; i < 1; ++i) {
                data.push({
                    key: i,
                    Introduction: 'some pictures of cats',
                });
            }
            return (
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            );
        };

        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Description', dataIndex: 'description', key: 'description' },
            { title: 'Bid', dataIndex: 'bid', key: 'bid' },
            { title: 'Count', dataIndex: 'Count', key: 'Count' },
            { title: 'From', dataIndex: '', key: 'y', render: ()=>
                    <div>
                        <a href="#">John</a>
                    </div>
            },
            { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                name: 'Tom',
                description: 'Picture',
                bid: '100',
                Count: 500,
                From: 'Jack',
                createdAt: '2018-01-15 23:12:00',
            });
        }

        return (
            <Table
        className="components-table-demo-nested"
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={data}
        />
    );
    }
export default class BTAsset extends PureComponent{
    constructor(props){
        super(props)

        this.state= {
            isEditVisible:false
        }

    }

    handleClick(event) {
        this.editModal.setState({
            isVisible:true
        })
        event.preventDefault();
    }

    render(){
        const columns = [
            { title: 'introduction', dataIndex: 'introduction', key: 'introduction' },
            { title: 'count', dataIndex: 'count', key: 'count' },

            { title: 'Action', dataIndex: '', key: 'x', render: () =>
                    <ul>
                        <a href="#" onClick={(e)=>this.handleClick(e)}>edit </a>
                        <a href="#">Delete </a>
                        <a href="#">publish</a>
                    </ul>,
            },
        ];

        return(
            <div >
                <BTUploadAsset isVisible={this.state.isEditVisible} ref={ref=>this.editModal = ref}/>

                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="上传资产" key="1">
                        <div className="upLoadForm">
                            <div className="ID">
                                <span>RequirementID:</span>
                                <Input placeholder="RequirementID" />
                            </div>
                            <div className="price">
                                <span>Expect Price:</span>
                                <Input/>
                                <span>-</span>
                                <Input />
                                <Icon type="pay-circle" style={{ fontSize: 16,margin:'5px' }}></Icon>
                            </div>
                            <div className="featureTag" >
                                <span>Feature Tag:</span>
                                <Input/>
                                <Input/>
                                <Input/>
                                <Icon type="plus-circle-o" style={{ fontSize: 16,margin:'5px' }}></Icon>
                            </div>
                            <div className="dateSelect">
                                <span>Expire Time:</span>
                                <RangePicker
                                    ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="dataAssetType">
                                <span>Data Asset Type: </span>
                                <Cascader options={options} onChange={onChange} placeholder="Please select" />
                            </div>
                            <div className="description">
                                <span>Description: </span>
                                <textarea></textarea>
                            </div>
                        </div>
                        <div className="upLoad">
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>
                            <div className="submit">
                                <Button type="submit">submit</Button>
                            </div>
                        </div>

                    </TabPane>
                    <TabPane tab="资产详情页" key="2">
                        <Table
                    columns={columns}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={data}
                    />
                    </TabPane>

                    <TabPane tab="已购买资产" key="3">
                        <NestedTable />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}














