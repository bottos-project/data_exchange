import React,{PureComponent} from 'react'

import { Form, Icon, Input, Button } from 'antd';
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
class company extends PureComponent {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
/*    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }*/
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // const { getFieldDecorator,getFieldsValue,getFieldValue,setFields } = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                <FormItem {...formItemLayout} >
                    {
                        getFieldDecorator('username',{

                        })(
                            <Input placeholder="请输入用户名" id="error1" />
                        )
                    }
                </FormItem>
                <FormItem
                >
                    {
                        getFieldDecorator('password',{})(
                            <Input placeholder="密码" id="error2" />

                        )
                    }
                </FormItem>
                {/*<FormItem {...formItemLayout}>
                    {
                        getFieldDecorator('email',{

                        })(
                            <Input placeholder="邮箱" type="email" id="error1"/>
                        )
                    }
                </FormItem>*/}
                {/*<FormItem
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('phone',{})(
                            <Input placeholder="手机号" id="error2" />
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
                    <Button>发送验证码</Button>
                </FormItem>*/}

                <FormItem
                >
                    {
                        getFieldDecorator('companyName',{})(
                            <Input placeholder="公司名" id="error2" />

                        )
                    }
                </FormItem>
                {/* <FormItem
                >
                    {
                        getFieldDecorator('contacts',{})(
                            <Input placeholder="公司联系人" id="error2" />

                        )
                    }
                </FormItem> */}
                {/* <FormItem
                >
                    {
                        getFieldDecorator('contactsPhone',{})(
                            <Input placeholder="联系人手机号" id="error2" />

                        )
                    }
                </FormItem> */}

            </div>
        );
    }
}

const CompanyUser= Form.create()(company);
export default CompanyUser;
