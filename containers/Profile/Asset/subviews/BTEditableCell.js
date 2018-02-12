// import React,{PureComponent} from 'react'
// import { Table, Input, Icon, Button, Popconfirm } from 'antd';
// import styles from "./styles.less"
//
// export default class BTEditableCell extends PureComponent{
//     constructor(props){
//         super(props);
//         this.state = {
//             value: this.props.value,
//             editable: false,
//         }
//     }
//
//     handleChange (e) {
//         const value = e.target.value;
//         this.setState({ value });
//     };
//     check () {
//         this.setState({ editable: false });
//         if (this.props.onChange) {
//             this.props.onChange(this.state.value);
//         }
//     };
//     edit () {
//         this.setState({ editable: true });
//     }
//     render(){
//         const { value, editable } = this.state;
//
//         return(
//             <div className="editable-cell">
//                 {
//                     editable ?
//                         <div className="editable-cell-input-wrapper">
//                             <Input
//                                 value={value}
//                                 onChange = {(e) => this.handleChange(e)}
//                                 onPressEnter = {() => this.check()}
//                             />
//                             <Icon
//                                 type="check"
//                                 className="editable-cell-icon-check"
//                                 onClick = {() => this.check()}
//                             />
//                         </div>
//                         :
//                         <div className="editable-cell-text-wrapper">
//                             {value || ' '}
//                             <Icon
//                                 type="edit"
//                                 className="editable-cell-icon"
//                                 onClick ={() => this.edit() }
//                             />
//                         </div>
//                 }
//             </div>
//         )
//     }
// }
import { Table, Input, Popconfirm } from 'antd';

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            render: (text, record) => this.renderColumns(text, record, 'name'),
        }, {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
            render: (text, record) => this.renderColumns(text, record, 'age'),
        }, {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
            render: (text, record) => this.renderColumns(text, record, 'address'),
        }, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                const { editable } = record;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                                : <a onClick={() => this.edit(record.key)}>Edit</a>
                        }
                    </div>
                );
            },
        }];
        this.state = { data };
        this.cacheData = data.map(item => ({ ...item }));
    }
    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }
    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }
    edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }
    save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.setState({ data: newData });
            this.cacheData = newData.map(item => ({ ...item }));
        }
    }
    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }
    render() {
        return <Table bordered dataSource={this.state.data} columns={this.columns} />;
    }
}

ReactDOM.render(<EditableTable />, mountNode);