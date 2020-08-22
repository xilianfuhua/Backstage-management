
//添加/修改用户的form组件

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
    Form,
    Input,
    Select,
} from 'antd'

const Item = Form.Item
const Option = Select.Option

export default class UserForm extends PureComponent {

    formRef = React.createRef()

    static propsTypes = {
        roles:PropTypes.array.isRequired,
        user:PropTypes.object
    }

    componentDidUpdate () {
        this.formRef.current.setFieldsValue({
            username: this.props.user.username,
            phone: this.props.user.phone,
            email: this.props.user.email,
            role_id: this.props.user.role_id,
    })
   }

   render() {
       
       const {roles,user} = this.props
       console.log(user);
       

       return (
          <Form ref={this.formRef}>
              <Item
              label='用户名'
              name='username'
              initialValue={user.username}
              
               //声明式验证：直接用别人定义好的规则进行验证
               rules={
                    [
                        { required: true,whitespace:true, message: '用户名必须输入!' }
                    ]
                }
              >
                <Input placeholder='请输入用户名'></Input>
              </Item>
              {
                  user._id?null:(
                    <Item
                    label='密码'
                    name='password'
                    initialValue=''
                    
                     //声明式验证：直接用别人定义好的规则进行验证
                     rules={
                          [
                              { required: true,whitespace:true, message: '密码必须设置!' }
                          ]
                      }
                    >
                      <Input type='password' placeholder='请输入密码'></Input>
                    </Item>
                  )
              }
              <Item
              label='手机号'
              name='phone'
              initialValue={user.phone}
              
               //声明式验证：直接用别人定义好的规则进行验证
               rules={
                    [
                        { required: true,whitespace:true, message: '手机号必须输入!' }
                    ]
                }
              >
                <Input placeholder='请输入手机号'></Input>
              </Item>
              <Item
              label='邮箱'
              name='email'
              initialValue={user.email}
              
               //声明式验证：直接用别人定义好的规则进行验证
               rules={
                    [
                        { required: true,whitespace:true, message: '邮箱必须输入!' }
                    ]
                }
              >
                <Input placeholder='请输入邮箱'></Input>
              </Item>
              <Item
              label='角色'
              name='role_id'
              initialValue={user.role_id}
              
              >
                <Select>
                    {
                        roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                    }
                </Select>
              </Item>
          </Form>
       )
   }
}