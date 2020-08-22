

import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'

import LinkButton from '../link-button'
import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import './index.css'
import {logout} from '../../redux/actions'

class Header extends Component {

    state = {
        currentTime:formateDate(Date.now()), //当前时间字符串
        imgUrl:'' , //天气图片地址
        wea:'' , //天气的文本
        city:'' //城市
    }

    getTime = () => {
        //每隔一秒钟获取当前时间，并更新状态数据currentTime
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        }, 1000);
    }

    getWeather= async () => {
        //调用接口请求函数
        const {wea,imgUrl,city} = await reqWeather()
        //更新状态
        this.setState({wea,imgUrl,city})
    }

    getTitle = () => {
        //得到当前请求路径
        const path = this.props.location.pathname

        let title
        menuList.forEach(item => {
            if(item.key===path) { //如果当前item对象的key与path一样，itemde title就是需要显示的title
                title = item.title
            } else if (item.children) {
                //在所有子item中查找匹配的
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                //如果有值才能说明匹配了
                if(cItem) {
                    //取出他的title
                    title = cItem.title
                }
            }
        })
        return title
    }

    //退出登录
    logout = () => {
        
        //显示确认框
        Modal.confirm({
            title: '您确定要退出吗?',
            content: '您还是再挣扎一下下吧',
            icon: <ExclamationCircleOutlined />,
            okText:'确定',
            onOk: () => {
            this.props.logout()
            },
            cancelText:'取消'
          })
    }
 
    /*
    第一次render()之后执行一次
    一般在此执行异步操作：发ajax请求/启动定时器
    */
    componentDidMount () {
        //获取当前时间
        this.getTime()
        //获取当前天气
        this.getWeather()
    }

    //不能这么做：不会更新显示
    // UNSAFE_componentWillMount () {
    //      this.title = this.getTitle()
    // }

    //在当前组件卸载之前调用
    componentWillUnmount () {
        //清除定时器
        clearInterval(this.intervalId)
    }

   render() {

       const {currentTime,imgUrl,wea,city} = this.state
       const username = this.props.user.username

        //得到当前需要显示的title
        //const title = this.getTitle()
        const title = this.props.headerTitle
        console.log('---',title)
       

       return (
           <div className='header'>
               <div className='header-top'>
                   <span>欢迎你 :  {username} </span>
                   <LinkButton onClick={this.logout}>退出</LinkButton>
               </div>
               <div className='header-bottom'>
                   <div className='header-bottom-left'>{title}</div>
                   <div className='header-bottom-right'>
                       <span>{currentTime}</span>
                       <span className='span0'>{city}</span>
                       <span>{wea}</span>
                       <img src={imgUrl} alt="weather"/>
                   </div>
               </div>
           </div>
       )
   }
}
export default connect(
    state => ({headerTitle:state.headerTitle,user:state.user}),
    {logout}
)(withRouter(Header))