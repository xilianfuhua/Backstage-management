/**
 * 
 * 登入的路由组件
 * 
 */

import React, { Component } from 'react'
import { 
    Form,
    Input, 
    Button,
    message
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import './login.css'
import logo from '../../assets/images/logo.svg'
import memoryUtils from '../../utils/memoryUtils'
import {login} from '../../redux/actions'


/**
 * 
 * async和await
 * 
 */

class Login extends Component {
   render() {

    //如果用户已经登入，自动跳转到管理界面
    const user = this.props.user
    if(user && user._id) {
        return <Redirect to='/home'/>
    }

    //对所有表单字段进行检验
    const onFinish = async values => {
        // console.log('提交登录的ajax请求',values)
        const {username,password} = values
            //调用分发异步action的函数 => 发登录的异步请求，有了结果后更新状态
            this.props.login(username,password)
      }
       return (
           <div className='login'>
               <header className='login-header'>
                   <img src={logo} alt="logo"/>
                   <h1>后台管理系统</h1>
               </header>
               <section className='login-content'> 
                   <h2>用户登录</h2>
                   <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    >
                    <Form.Item name="username"
                    hasFeedback
                    //声明式验证：直接用别人定义好的规则进行验证
                    rules={
                        [
                            { required: true,whitespace:true, message: '请输入用户名!' },
                            { min: 4, message: '用户名至少4位!' },
                            { max: 12, message: '用户名最多12位!' },
                      
                        ]
                    }>
                        <Input 
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                        type="username"
                        placeholder="用户名"
                        style={{ fontSize: '14px', color: '#08c' }}  
                        />
                    </Form.Item>
                    <Form.Item name="password"
                    rules={
                        [
                            { required: true,whitespace:true, message: '请输入密码!' },
                            { min: 4, message: '密码至少4位!' },
                            { max: 12, message: '密码最多12位!' }
                            ]
                        } hasFeedback>
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                        style={{ fontSize: '14px', color: '#08c'}}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                        </Button>
                    </Form.Item>
                    </Form>
               </section>
           </div>
       )
   }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login)

/**
 * 
 * 1.前台表单验证
 * 2.搜集表单数据
 */