

import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Menu} from 'antd'
import {connect} from 'react-redux'

import './index.css'
import login from '../../assets/images/logo.svg'
import menuList from '../../config/menuConfig'
import {setHeaderTitle} from '../../redux/actions'

const { SubMenu } = Menu

class LeftNav extends Component {

    //判断当前登录用户对item是否有权限
    hasAuth = (item) => {
        const {key,isPublic} = item

        const menus = this.props.user.role.menus
        const username = this.props.user.username
        /*
        1.如果当前用户是admin
        2.如果当前item是公开的
        3.当前用户有此item的权限：key有没有在menus中
        */
       if(username==='admin' || isPublic || menus.indexOf(key) !== -1) {
        return true
       } else if(item.children) { //如果当前用户有此item的某个子item的权限
        return !!item.children.find(child => menus.indexOf(child.key) !== -1)
       }
        return false
    }

    /*
       根据menu的数据数组动态生成对应的Menu.Item和SubMenu的标签数组
       使用map() + 递归调用
       */
      getMenuNodes = (menuList) => {
        //得到当前请求的路由路径
        const path = this.props.location.pathname

        return menuList.map(item => {
            /*
             {
                title: '首页', // 菜单标题名称
                key: '/home', // 对应的path
                icon: 'home', // 图标名称
                children:[] // 可能有，也可能没有
            }

            <Menu.Item key="1" 
                icon={<PieChartOutlined />}>
                    <Link to='/home'>首页</Link>
            </Menu.Item>

            <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                    <Menu.Item key="2" icon={<MailOutlined />}>
                        <Link to='/product'>品类管理</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<MailOutlined />}>
                        <Link to='/category'>商品管理</Link>
                    </Menu.Item>
            </SubMenu>
            */

            //如果当前用户有item对应的权限，才需要显示对应的菜单项
            if(this.hasAuth(item)) {
                if(!item.children){
                    //判断item是否是当前对应的item
                    if(item.key===path || path.indexOf(item.key)===0) {
                        this.props.setHeaderTitle(item.title)
                    }
                    return (
                     <Menu.Item key={item.key}
                     icon={<item.icon/>}>
                         <Link to={item.key} onClick={() => this.props.setHeaderTitle(item.title)}>{item.title}</Link>
                     </Menu.Item>
                    )
                } else {
     
                     //查找一个与当前路径匹配的子Item
                     const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                     //如果存在，说明当前子列表需要打开
                     if(cItem) {
                         this.openKey = item.key
                     }
     
                     return (
                         <SubMenu key={item.key} icon={<item.icon/>} title={item.title}>
                            {this.getMenuNodes(item.children)}
                         </SubMenu>
                     )
                }
            }
        })
   }

   /*
    在第一次render()之前执行一次
    为第一次render()准备数据(必须同步的)
   */
    UNSAFE_componentWillMount () {
       this.menuNodes = this.getMenuNodes(menuList)
   }

   render() {
       //得到当前请求的路由路径
       let path = this.props.location.pathname
       if(path.indexOf('/product')===0) { //当前请求的商品或其子路由界面
            path = '/product'           
       }


       //得到需要打开菜单项的key
       const openKey = this.openKey

       return (
           <div>
                <div className='left-nav'>
                    <Link to='/' className='left-nav-header'>
                            <img src={login} alt="login"/>
                            <h1>React后台</h1>
                    </Link>
                </div>
                    <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    >
                    {
                        this.menuNodes
                    }
                    </Menu>
           </div>
       )
   }
}

/*
withRouter高阶组件：
包装非路由组件，返回一个新的组件
新的组件向非路由组件传递3个属性：history/location/match
*/
export default connect(
    state => ({user:state.user}),
    {setHeaderTitle}
) (withRouter(LeftNav))