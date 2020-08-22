
//添加分类的form组件

import React, { Component } from 'react'
import PorpTypes from 'prop-types'

import {
    Form,
    Select,
    Input,
} from 'antd'

const Item = Form.Item
const Option = Select.Option

export default class AddForm extends Component {

    formRef = React.createRef()

   static propTypes = {
        categorys:PorpTypes.array.isRequired, //一级分类数组
        parentId:PorpTypes.string.isRequired // 父分类id
   }

   componentDidUpdate () {
    this.formRef.current.setFieldsValue({
        categorys: this.props.categorys,
        parentId: this.props.parentId,
        })
    }

   render() {
       const {categorys,parentId} = this.props
       return (
          <Form ref={this.formRef}>
              <Item
              name='parentId'
              initialValue={parentId}
              >
                <Select>
                    <Option value='0'>一级分类</Option>
                    {
                        categorys.map(c => <Option key={c._id}>{c.name}</Option>)
                    }
                </Select>
              </Item>
              <Item
              name='categoryName'
              initialValue=''
              hasFeedback
               //声明式验证：直接用别人定义好的规则进行验证
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