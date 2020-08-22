
//Product的默认子路由组件

import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message
} from 'antd'

import {
    PlusOutlined
} from '@ant-design/icons'

import LinkButton from '../../components/link-button'
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
import memoryUtils from '../../utils/memoryUtils'

const Option = Select.Option

export default class ProductHome extends Component {

   state = {
       total:0,//商品总数量
       products:[], //商品的数组
       loading:false, //是否在加载中
       searchName:'', //搜索关键字名称
       searchType:'productName', //根据哪个字段搜索
   }

   //初始化table的列的数组
   initColumns = () => {
    this.columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
        },
        {
          title: '价格',
          dataIndex: 'price',
          render: (price) => '￥' + price //当前指定了对应的属性，传入的是对应的属性值
        },
        {
            title: '状态',
            // dataIndex: 'status',
            render: (product) => {
                const {status,_id} = product
                return (
                    <span>
                        <Button 
                        type='primary' 
                        style={{marginRight:10}} 
                        onClick={() => this.updateStatus(_id,status===1 ? 2 : 1)}
                        >
                            {status===1 ? '下架' : '上架'}
                        </Button>
                        <span>{status===1 ? '在售' : '已下架'}</span>
                    </span>
                )
            }
          },
          {
            title: '操作',
            render: (product) => {
                return (
                    <span>
                        {/* 将product对象使用state传递给目标路由组件 */}
                        <LinkButton onClick={() => this.showDetail(product)}>详情</LinkButton>
                        <LinkButton onClick={() => this.showUpdate(product)}>修改</LinkButton>
                    </span>
                )
            }
          },
      ];
   }

   //显示商品详情界面
   showDetail = (product) => {
    memoryUtils.product = product
    this.props.history.push('/product/detail')
   }

   //显示修改商品界面
   showUpdate = (product) => {
    memoryUtils.product = product
    this.props.history.push('/product/addupdate')
   }

   //获取指定页码的列表数据显示
   getProducts = async (pageNum) => {
       this.pageNum = pageNum //保存pageNum
       this.setState({loading:true}) //显示loading

       const {searchName,searchType} = this.state
       //如果搜索关键字有值，说明要做搜索分页
       let result
       if(searchName) {
            result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
       } else { //一般分页
            result = await  reqProducts(pageNum,PAGE_SIZE)
       }

       this.setState({loading:false}) //隐藏loading
       if(result.status===0) {
           //取出分页数据，更新状态，显示分页列表
           const {total,list} = result.data
           this.setState({
               total,
               products:list
           })
       }
   }

   //更新指定商品的状态
   updateStatus = async (productId,status) => {
        const result = await reqUpdateStatus(productId,status)
        if(result.status===0) {
            message.success('修改商品成功',1)
            this.getProducts(this.pageNum)
        }
   }

   UNSAFE_componentWillMount () {
       this.initColumns()
   }

   componentDidMount () {
       this.getProducts(1)
   }

   render() {

      //取出状态数据
      const {products,total,loading,searchName,searchType} = this.state
      
      

       const title = (
           <span>
               <Select value={searchType} 
               style={{width:120}} 
               onChange={value => {this.setState({searchType:value})}}
               >
                   <Option value='productName'>按名称搜索</Option>
                   <Option value='productDesc'>按描述搜索</Option>
               </Select>
               <Input 
               placeholder='关键字' 
               style={{width:150,margin:'0 15px'}} 
               value={searchName}
               onChange={event => {this.setState({searchName:event.target.value})}}
               />
               <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
           </span>
       )

       const extra = (
           <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>
               <PlusOutlined/>
               添加商品
           </Button>
       )

       return (
          <Card title={title} extra={extra}>
              <Table 
              dataSource={products} 
              bordered
              loading={loading}
              rowKey='_id'
              columns={this.columns} 
              pagination={{
                  current:this.pageNum,
                  total, 
                  defaultPageSize:PAGE_SIZE,
                  showQuickJumper:true,
                  onChange:this.getProducts
                //   this.getProducts 相当于 (pageNum) => {this.getProducts(pageNum)} 因为参数一样
                  }}/>
          </Card>
       )
   }
}