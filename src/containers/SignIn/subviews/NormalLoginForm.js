/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
// import React,{PureComponent} from 'react'
// import { Form, Icon, Input, Button, Checkbox } from 'antd';
// const FormItem = Form.Item;
// export default class NormalLoginForm extends PureComponent{
//     constructor(props){
//         super(props)
//     }
//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 console.log('Received values of form: ', values);
//             }
//         });
//     }
//     render(){
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <Form onSubmit={this.handleSubmit} className="login-form">
//                 <FormItem>
//                     {getFieldDecorator('userName', {
//                         rules: [{ required: true, message: 'Please input your username!' }],
//                     })(
//                         <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
//                     )}
//                 </FormItem>
//                 <FormItem>
//                     {getFieldDecorator('password', {
//                         rules: [{ required: true, message: 'Please input your Password!' }],
//                     })(
//                         <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
//                     )}
//                 </FormItem>
//                 <FormItem>
//                     {getFieldDecorator('remember', {
//                         valuePropName: 'checked',
//                         initialValue: true,
//                     })(
//                         <Checkbox>Remember me</Checkbox>
//                     )}
//                     <a className="login-form-forgot" href="">Forgot password</a>
//                     <Button type="primary" htmlType="submit" className="login-form-button">
//                         Log in
//                     </Button>
//                     Or <a href="">register now!</a>
//                 </FormItem>
//             </Form>
//         )
//     }
// }
//
//
