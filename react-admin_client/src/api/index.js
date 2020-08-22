/**
 * 
 * 包含应用中所有接口请求函数的模块
 * 每个接口的返回值都是promise
 * 
 */
import jsonp from 'jsonp'
import ajax from './ajax'
import {message} from 'antd'

// const BASE = 'http://localhost:5000'
const BASE = '/api'

//登录
export const reqLogin = (username,password) => ajax(BASE+'/login',{username,password},'POST')

//获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list',{parentId})

//添加分类
export const reqAddCategory = (categoryName,parentId) => ajax(BASE + '/manage/category/add',{categoryName,parentId},'POST')

//更新分类
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax(BASE + '/manage/category/update',{categoryId,categoryName},'POST')

//获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info',{categoryId})

//获取商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax(BASE + '/manage/product/list',{pageNum,pageSize})

//更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId,status) => ajax(BASE + '/manage/product/updateStatus',{productId,status},'POST')


/*
搜索商品分页列表(根据商品名称/商品描述)
searchType: 搜索类型，productName/productDesc
*/
export const reqSearchProducts = ({ pageNum,pageSize,searchName,searchType}) => ajax(BASE +'/manage/product/search',{
    pageNum,
    pageSize,
    [searchType]:searchName
})

//搜索商品分页列表(根据商品描述)
// export const reqSearchProducts2 = ({ pageNum,pageSize,searchName}) => ajax(BASE +'/manage/product/search',{
//     pageNum,
//     pageSize,
//     productDesc:searchName
// })

//删除图片
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete',{name},'POST')

//添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/'+ (product._id ? 'update' : 'add'),product,'POST')

//修改商品
// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update',product,'POST')

//获取所有角色的列表
export const reqRoles = () => ajax(BASE + '/manage/role/list')

//添加角色
export const reqAddRoles = (roleName) => ajax(BASE + '/manage/role/add',{roleName},'POST')

//设置角色权限
export const reqUpdateRoles = (role) => ajax(BASE + '/manage/role/update',role,'POST')

//获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/manage/user/list')

//删除指定用户
export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', {userId} ,'POST')

//添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/'+(user._id ? 'update' : 'add'),user,'POST')



/*
json请求的接口请求函数
*/
export const reqWeather = () => {
    return new Promise((resolve,reject) => {
        const url = 'http://www.tianqiapi.com/api?version=v9&appid=23035354&appsecret=8YvlPNrz'
    //发送jsonp请求
    jsonp(url,{},(err,data) => {
        //如果成功了
        if(!data.errcode){
            const {wea,wea_img} = data.data[0]
            const imgUrl = `http://tq.daodaoim.com//tianqiapi/skin/pitaya/${wea_img}.png`
            const city = data.city
            resolve({wea,imgUrl,city})
        } else {
            //如果失败了
            message.error('天气获取失败')
        }
    })
    })
}
reqWeather()