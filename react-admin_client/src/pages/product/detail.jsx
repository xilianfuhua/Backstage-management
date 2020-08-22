
//Product的详情子路由组件

import React, { Component } from 'react'
import {
    Card,
    List
} from 'antd'

import {ArrowLeftOutlined} from '@ant-design/icons'

import LinkButton from '../../components/link-button'
import {BASE_IMG_URL} from '../../utils/constants'
import {reqCategory} from '../../api'
import memoryUtils from '../../utils/memoryUtils'

const Item = List.Item

// import   '../../assets/images'

export default class ProductDetail extends Component {

   state = {
       cName1:'', //一级分类名称
       CName2:'' //二级分类名称
   }

   async componentDidMount () {
       //得到当前商品的分类id
       const {categoryId,pCategoryId} = memoryUtils.product
       if(pCategoryId==='0') { //一级分类下的商品
            const result = await reqCategory(categoryId)
            const cName1 = result.data.name
            this.setState({cName1})
       } else {
           /*
            // 通过多个await方式发多个请求：后面一个请求是在前一个请求成功后才发
            const result1 = await reqCategory(pCategoryId)
            const result2 = await reqCategory(categoryId)
            const cName1 = result1.status
            const cName2 = result2.status
            */
           //一次性发送多个请求，只有都成功了，才正常处理
           const result = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
           const cName1 = result[0].data.name
            const cName2 = result[1].data.name
            this.setState({
                cName1,
                cName2
            })
       }
   }

   //在卸载之前清除保存的数据
  componentWillUnmount () {
    memoryUtils.product = {}
  }

   render() {
       const title = (
            <span>
                <LinkButton>
                    <ArrowLeftOutlined 
                    style={{marginRight:7,fontSize:17}}
                    onClick={() => this.props.history.goBack()}
                    />
                </LinkButton>
                <span>商品详情</span>
            </span>
       )
       const {name,desc,price,imgs,detail} = memoryUtils.product
       const {cName1,cName2} = this.state
       return (
           <Card title={title} className='product-detail'>
               <List bordered>
                   <Item>
                       <span className='lef'>商品名称：</span>
                       <span className='le'>{name}</span>
                   </Item>
                   <Item>
                       <span className='lef'>商品描述：</span>
                       <span className='le'>{desc}</span>
                   </Item>
                   <Item>
                       <span className='lef'>商品价格：</span>
                       <span className='le'> {price} </span>
                   </Item>
                   <Item>
                       <span className='lef'>所属分类：</span>
                       <span className='le'>{cName1} {cName2 ? '-->' + cName2 : ''} </span>
                   </Item>
                   <Item className='he'>
                       <span className='lef'>商品图片：</span>
                       <span className='le'>
                           
                        {
                            imgs.map(img => (
                            <img
                                key={img}
                                src={BASE_IMG_URL + img}
                                className="product-img"
                                alt="img"
                            />
                            ))
                        }
                       </span>
                   </Item>
                   <Item>
                       <span className='lef'>商品详情：</span>
                       <span className='le' dangerouslySetInnerHTML={{__html:detail}}></span>
                   </Item>
               </List>
           </Card>
       )
   }
}