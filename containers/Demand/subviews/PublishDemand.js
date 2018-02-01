import React,{PureComponent} from 'react'

import {Modal,Form, Icon, Input, Button,DatePicker,TimePicker} from 'antd'
const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

export default class BTPublishDemand extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:false
        }
    }

    handleOk(){
        this.setState({
            visible: false,
        });
    }

    handleCancel(){
        this.setState({
            visible:false
        })
    }

    render(){
        return(
            <Modal visible={this.state.visible}
                onOk={()=>this.handleOk()}
                onCancel={()=>this.handleCancel()}
            >
                <div>
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="标题"
                            >
                            <Input placeholder="请输入需求标题" id="error" />
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="招募价格"
                            >
                            <Input placeholder="请输入招募价格" id="error" />
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="截止时间"
                            hasFeedback
                            // validateStatus="success"
                            >
                            <DatePicker style={{ width: '100%' }} />
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="需求描述"
                            >
                            <TextArea rows={4} />
                        </FormItem>

                    </Form>
                </div>
            </Modal>
        )
    }
}

