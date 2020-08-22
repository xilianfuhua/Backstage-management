
//设置角色权限的form组件

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
    Form,
    Input,
    Tree
} from 'antd'

import menuList from '../../config/menuConfig'

const Item = Form.Item


export default class AuthForm extends Component {

    formRef = React.createRef()

    static propTypes = {
        role: PropTypes.object
    }

    constructor (props) {
      super(props)

        //根据传入角色menus生成初始状态
        const {menus} = this.props.role
        this.state = {
          checkedKeys:menus
        }
    }

    //为父组件提交获取最新menus数据方法
    getMenus = () => this.state.checkedKeys

    getTreeData = (menuList) => {
        return menuList.reduce((pre,item) => {
            const {title,key,children} = item
            // console.log(title,children)
            pre.push({
              title,
              key,
              children
            })
            return pre
        },[])
    }

    //选中某个node时的回调
    onCheck = checkedKeys => {
      console.log('onCheck', checkedKeys);
      this.setState({checkedKeys});
    };

    componentDidUpdate () {
        this.formRef.current.setFieldsValue({
            roleName: this.props.role.name,
    })
   }

   //根据新传入的role来更新checkedKeys状态
   //当组件接收到新的属性时自动调用
   componentWillReceiveProps (nextProps) {
     console.log('接收到新的属性自动调用',nextProps);
     
      const menus = nextProps.role.menus
      this.setState({
        checkedKeys:menus
      })
   }

   UNSAFE_componentWillMount () {
     const initData = [
       {
         title:'平台权限',
         key:'all',
         children:this.getTreeData(menuList)
       }
     ]
    this.treeData = initData
    console.log('设置权限弹窗：',this.treeData )
    
   }
   

   render() {

       const {role} = this.props
       const {checkedKeys} = this.state

       return (
        <Form ref={this.formRef}>
              <Item
              label='角色名称'
              name='roleName'
              initialValue={role.name}
              >
                <Input disabled></Input>
              </Item>

              <Tree
                checkable
                defaultExpandAll='true'
                checkedKeys={checkedKeys} //默认选中
                // onSelect={onSelect}
                onCheck={this.onCheck}
                treeData={this.treeData}
                />
        </Form>
       )
   }
}