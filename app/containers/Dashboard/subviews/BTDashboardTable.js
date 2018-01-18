import React,{PureComponent} from 'react'
import { Table } from 'antd';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];
  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '7',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '8',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }

];



export default class BTDashboardTable extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <h4>Middle size table</h4>
                <Table columns={columns} dataSource={data} size="middle" />
            </div>
        )
    }
}