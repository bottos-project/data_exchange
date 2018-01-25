import React, {PureComponent} from 'react'
import BTList from '../../../components/BTList'
import BTShopListCell from './subviews/BTShopListCell'

import { Checkbox,Row,Col,Button,Table } from 'antd';
const CheckboxGroup = Checkbox.Group;



const columns = [
    { title: 'title', dataIndex: 'title', key: 'title' },
    { title: 'price', dataIndex: 'price', key: 'price' },
    { title: 'fileName', dataIndex: 'fileName', key: 'fileName' },
    { title: 'fileSize', dataIndex: 'fileSize', key: 'fileSize' },
    { title: 'date', dataIndex: 'date', key: 'date' },
    { title: 'From', dataIndex: 'from', key: 'from'},
    { title: 'Action', dataIndex: '', key: 'x', render: () =>
            <ul>
                <a href="#">Delete</a>
            </ul>,
    },

];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
      key: i,
      title:"pandas",
      price: '150',
      fileName:"pandas.zip",
      fileSize:"123M",
      date: '2018-01-15 23:12:00',
      from:"Jack",
  });
}


export default class BTShopCart extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            filterMultiple:false ,
            indeterminate: true,
            checkAll: false,
            selectedRowKeys: []
        }
    }

    onSelectChange(selectedRowKeys){
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      }

    onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }

    render(){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
        selectedRowKeys,
        onChange: (e)=>this.onSelectChange(e),
        hideDefaultSelections: true,
        type:"radio",  //单选
        selections: [{
            key: 'all-data',
            text: 'Select All Data',
            onSelect: () => {
            this.setState({
                selectedRowKeys: [...Array(46).keys()], // 0...45
            });
            },
        }, {
            key: 'odd',
            text: 'Select Odd Row',
            onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                return false;
                }
                return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
            },
        }, {
            key: 'even',
            text: 'Select Even Row',
            onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                return true;
                }
                return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
            },
        }],
        onSelection: this.onSelection,
        };
        return (
            <div className="container column">
                <div>
                    <Table rowSelection={rowSelection}  columns={columns} dataSource={data}
                    />
                </div>
                <div>
                    <Button type="primary">结算</Button>
                </div>
            </div>
        );
    }
}



