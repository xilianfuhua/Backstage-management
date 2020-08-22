
//添加角色的form组件

import React, { Component } from 'react'

import {
    Form,
    Input,
} from 'antd'

const Item = Form.Item

export default class AddForm extends Component {

    formRef = React.createRef()

   render() {
       return (
          <Form ref={this.formRef}>
              <Item
              label='角色名称'
              name='roleName'
              initialValue=''
              hasFeedback
               //声明式验证：直接用别人定义好的规则进行验证
               rules={
                    [
                        { required: true,whitespace:true, message: '角色名称必须输入!' }
                    ]
                }
              >
                <Input placeholder='请输入角色名称'></Input>
              </Item>
          </Form>
       )
   }
}