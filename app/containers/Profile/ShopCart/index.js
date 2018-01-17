import React, {PureComponent} from 'react'
import BTList from '../../../components/BTList'
import BTShopListCell from './subviews/BTShopListCell'

import { Checkbox,Row,Col,Button,Table } from 'antd';
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];


const columns = [{
  title: '资产名称',
  dataIndex: 'name',
}, {
  title: '价格',
  dataIndex: 'age',
}, {
  title: '数量',
  dataIndex: 'address',
},
{
    title: '类型',
    dataIndex: 'dataType',
  }];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    dataType:'数据清洗'
  });
}


export default class BTShopCart extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            checkedList: defaultCheckedList,
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
            <div style={{padding:20}}>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                <div>
                    <Button type="primary">结算</Button>
                </div>
            </div>
        );
    }
}


const test = ()=>{
    // <div style={{padding:20}}>
            //     <div>
            //     <Checkbox.Group style={{ width: '100%' }} onChange={(e)=>this.onChange(e)}>
            //         <Col>
            //         <Row span={8}><Checkbox value="A"><span><BTShopListCell/></span></Checkbox></Row>
            //         <Row span={8}><Checkbox value="B"><BTShopListCell/></Checkbox></Row>
            //         <Row span={8}><Checkbox value="C"><BTShopListCell/></Checkbox></Row>
            //         <Row span={8}><Checkbox value="D"><BTShopListCell/></Checkbox></Row>
            //         <Row span={8}><Checkbox value="E"><BTShopListCell/></Checkbox></Row>
            //         </Col>
            //     </Checkbox.Group>
            //     </div>

            //     <div>
            //         <Button type="primary">结算</Button>
            //     </div>
            // </div>
}

