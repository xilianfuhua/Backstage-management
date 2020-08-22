
/**
 * 用户路由
 */

import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {formateDate} from '../../utils/dateUtils'
import LinkButton from '../../components/link-button/index'
import {PAGE_SIZE} from '../../utils/constants'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api'
import UserForm from './user-form'
export default class User extends Component {

    formRef = React.createRef()

    state = {
        users:[],//所有的用户列表
        roles:[],//所有角色的列表
        isShow:false,//标识是否显示确认框
    }

    initColumns = () => {
        this.columns = [
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'邮箱',
                dataIndex:'email'
            },
            {
                title:'电话',
                dataIndex:'phone'
            },
            {
                title:'注册时间',
                dataIndex:'create_time',
                render:formateDate
            },
            {
                title:'所属角色',
                dataIndex:'role_id',
                render: (role_id) => this.roleNames[role_id]
            },
            {
                title:'操作',
                render:(user) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
                        <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            }
        ]
    }

    //根据role的数组，生成包含所有角色名的对象(属性名用角色id值)
    initRoleName = (roles) => {
        const roleNames = roles.reduce((pre,role) => {
            pre[role._id] = role.name
            return pre
        },{})
        //保存
        this.roleNames = roleNames
    }

    //显示添加界面
    showAdd = () => {
        this.user = null //去除前面保存的user
        this.setState({isShow:true})
    }

    //显示修改界面
    showUpdate = (user) => {
        this.user = user //保存user
        this.setState({
            isShow:true
        })
    }

    //删除指定用户
    deleteUser = (user) => {
        Modal.confirm({
            title: `确认删除${user.username}吗？`,
            content: '您还是再挣扎一下下吧',
            icon: <ExclamationCircleOutlined />,
            okText:'确定',
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if(result.status===0) {
                    message.success(`成功删除${user.username}`)
                    this.getUsers()
                } else {
                    message.error('删除失败')
                }
            },
            cancelText:'取消'
          })
    }

    //添加/更新用户
    addOrUpdateUser = async () => {
        this.setState({
            isShow:false
        })
        //1.收集输入数据
        const user = this.formRef.current.formRef.current.getFieldsValue()
        
        //清空输入数据
        this.formRef.current.formRef.current.resetFields()

        //如果是更新，需要给user指定_id属性
        if(this.user && this.user._id) {
            user._id = this.user._id
        }
        
        console.log(user)
        //2.提交添加的请求
        const result = await reqAddOrUpdateUser(user)
        console.log(result)
        //3.更新列表显示
        if(result.status===0){
            message.success(`${this.user ? '修改' : '添加'}用户成功`)
            this.getUsers()
        }
    }

    //获取所有用户
    getUsers = async () => {
        const result = await reqUsers()
        if(result.status===0) {
            const {users,roles} = result.data
            this.initRoleName(roles)
            this.setState({
                users,
                roles
            })
        }
    }

    UNSAFE_componentWillMount () {
        this.initColumns()
    }

    componentDidMount () {
        this.getUsers()
    }

   render() {

       const {users,isShow,roles} = this.state
       const user = this.user || {}

       const title = <Button type='primary' onClick={() => this.showAdd()}>创建用户</Button>

       return (
           <Card title={title}>
                 <Table 
                    bordered
                    rowKey='_id'
                    dataSource={users} 
                    columns={this.columns}
                    pagination={{defaultPageSize:PAGE_SIZE}}
                    />
                    <Modal
                    title={user._id ? '修改用户' : '添加用户'}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    okText='确定'
                    onCancel={() => {
                         //清空输入数据
                        this.formRef.current.formRef.current.resetFields()
                        this.setState({isShow:false})
                    }}
                    cancelText='取消'
                    >
                    <UserForm ref={this.formRef} user={user} roles={roles}/>
                    </Modal>
           </Card>
       )
   }
}