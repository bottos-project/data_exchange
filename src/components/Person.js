// 这个可以不要了

import React,{PureComponent} from 'react'

import { Form, Icon, Input, Button, Row, Col } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};
const shortformItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 2 },
    },
    wrapperCol: {
        xs: { span: 12 },
        sm: { span: 9 },
    },
};
class person extends PureComponent {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        // const { getFieldDecorator,getFieldsValue, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const { getFieldDecorator,getFieldsValue,getFieldValue,setFields } = this.props.form;

        // Only show error after a field is touched.
        // const userNameError = isFieldTouched('userName') && getFieldError('userName');
        // const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                <FormItem {...formItemLayout} >
                    {
                        getFieldDecorator('username',{

                        })(
                            <Input placeholder={window.localeInfo["Header.PleaseEnterTheUserName"]} id="error1" />
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout}>
                    {
                        getFieldDecorator('password',{
                        })(
                            <Input placeholder={window.localeInfo["Header.PleaseEnterThePassword"]} type="password" id="error1"/>
                        )
                    }
                </FormItem>
                <FormItem {...formItemLayout}>
                    {
                        getFieldDecorator('newpassword',{
                        })(
                            <Input placeholder={window.localeInfo["Header.PleaseEnterTheSurePassword"]} type="password" id="error1"/>
                        )
                    }
                </FormItem>
                <FormItem>
                  <Row gutter={8}>
                    <Col span={12}>
                      {
                          getFieldDecorator('verificationCode',{})(
                              <Input placeholder={window.localeInfo["Header.PleaseEnterTheVerificationCode"]} id="error1"/>
                          )
                      }
                    </Col>
                    <Col span={12}>
                      验证码
                    </Col>
                  </Row>
                </FormItem>
                {/* <FormItem
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('phone',{})(
                            <Input placeholder="手机号码" id="error2" />
                        )
                    }

                </FormItem>
                <FormItem
                >
                    {
                        getFieldDecorator('msg',{})(
                            <Input placeholder="验证码" id="error2" />

                        )
                    }
                    <Button type="primary">发送验证码</Button>
                </FormItem>*/}
            </div>
        );
    }
}

const PersonUser = Form.create()(person);
export default PersonUser;
