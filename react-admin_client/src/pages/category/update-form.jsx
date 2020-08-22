
//修改分类的form组件

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    Form,
    Input,
} from 'antd'

const Item = Form.Item

export default class UpdateForm extends Component {
    formRef = React.createRef()

   static propTypes = {
        categoryName:PropTypes.string.isRequired,
   }

   componentDidUpdate () {
        this.formRef.current.setFieldsValue({
        categoryName: this.props.categoryName,
    })
   }

   render() {
       const {categoryName} = this.props
       
       return (
          <Form ref={this.formRef}>
              <Item
              initialValue={categoryName}
              name='categoryName'
               rules={
                    [
                        { required: true,whitespace:true, message: '分类名称必须输入!' }
                    ]
                }
              >
                <Input placeholder='请输入分类名称'></Input>
              </Item>
          </Form>
       )
   }
}
