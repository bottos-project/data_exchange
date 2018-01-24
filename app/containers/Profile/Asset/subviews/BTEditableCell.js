import React,{PureComponent} from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import styles from "./styles.less"

export default class BTEditableCell extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            editable: false,
        }
    }

    handleChange (e) {
        const value = e.target.value;
        this.setState({ value });
    };
    check () {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    };
    edit () {
        this.setState({ editable: true });
    }
    render(){
        const { value, editable } = this.state;

        return(
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <Input
                                value={value}
                                onChange = {(e) => this.handleChange(e)}
                                onPressEnter = {() => this.check()}
                            />
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick = {() => this.check()}
                            />
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick ={() => this.edit() }
                            />
                        </div>
                }
            </div>
        )
    }
}
