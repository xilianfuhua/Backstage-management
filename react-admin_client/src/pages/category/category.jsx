
/**
 * 商品路由
 */

import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    message,
    Modal
} from 'antd'

import {
    PlusOutlined,
    ArrowRightOutlined
} from '@ant-design/icons'

import LinkButton from '../../components/link-button'
import {reqCategorys,reqUpdateCategory,reqAddCategory} from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'

export default class Category extends Component {

    formRef = React.createRef()

   state = {
       loading:false, //是否正在获取数据中
       categorys:[], //一级分类列表
       subCategorys:[], //二级分类列表
       parentId:'0', //当前需要显示分类列表的父分类ID (parentId)
       parentName:'', //当前需要显示分类列表的父分类名称
       showStatus:0, //标识添加/更新的确认框显示，0：都不显示，1：显示添加，2：显示修改
   }

   //初始化Table所有列的数组
   initColumns = () => {
    this.columns = [
        {
          title: '分类的名称',
          dataIndex: 'name', // 显示数据对应的属性名
        },
        {
          title: '操作',
          width:300,
          render: (category) => (
              <span>
                  <LinkButton onClick={ () => this.showUpdate(category)}>修改分类</LinkButton>
                  {/* 如何向事件回调函数传递参数: 先定义一个匿名函数，在函数调用处理的函数并传入数据 */}
                  {this.state.parentId==='0' ? <LinkButton onClick={() => this.showSubCategorys(category)} >查看子分类</LinkButton> : null}
              </span>
          )
        }
      ]
   }

   //异步获取一级/二级分类列表显示 
   //parentId:如果没有指定根据状态中的parentId请求，如果指定了就根据指定的请求
   getCategorys = async (parentId) => {
       //在发请求前显示loading
       this.setState({loading:true})
       parentId = parentId || this.state.parentId
       //发异步ajax请求，获取数据
       const result = await reqCategorys(parentId)
       //在请求完成后，隐藏loading
       this.setState({loading:false})
       if(result.status===0) {
           //取出分类数组(可能是一级也可能是二级的)
            const categorys = result.data
            if(parentId==='0') {
                 //更新一级分类状态
                this.setState({
                    categorys
                })
            } else {
                //更新二级分类状态
                this.setState({
                    subCategorys:categorys
                })
            }
       } else {
            message.error('获取分类列表失败！')
       }
   }

   //显示指定一级分类对象的二级列表
   showSubCategorys = (category) => {
        //更新状态
        this.setState({
            parentId:category._id,
            parentName:category.name
        }, () => { //在状态更新且重新render()后执行
            console.log('parentId',this.state.parentId)
              //获取二级分类列表
            this.getCategorys()
        })
        //setState() 不能立即获取最新的状态: 因为setState()是异步更新状态的
   }

   //显示指定的一级分类
   showCategorys = () => {
       //更新为显示一级列表状态
    this.setState ({
        parentId:'0',

    })
   }

   //点击取消隐藏确认框
   handleCancel = () => {
       this.setState({
           showStatus:0
       })
   }

   //显示添加的确认框
   showAdd = () => {
        this.setState({
            showStatus:1
        })
   }

   //添加分类
   addCategory = () => {
        console.log('addCategory()')
        this.formRef.current.formRef.current.validateFields().then( async values => {
             //隐藏确认框
        this.setState({
            showStatus:0
        })

        //搜集数据并提交添加分类的请求
        const {parentId,categoryName} = values
        //清除输入数据
        this.formRef.current.formRef.current.resetFields()
        const result = await reqAddCategory(categoryName,parentId)
        if(result.status===0){
            
            //添加的分类就是当前分类列表下的分类
            if(parentId===this.state.parentId){
                //重新获取当前分类列表显示
                this.getCategorys()
            } else if(parentId==='0') { //在二级分类列表下添加一级分类，重新获取一级分类列表但不需要显示
                this.getCategorys('0')
            }
        }
        })
        .catch(errorInfo => {
            message.error('请输入',1)
        })
   }

   //显示修改的确认框
   showUpdate = (category) => {
       
    //保存分类对象
    this.category = category
    //更新状态
    this.setState({
        showStatus:2
    })
   }

   //修改分类
   updateCategory = () => {
        console.log('updateCategory()');
        //进行表单验证，只有通过了才处理
        this.formRef.current.formRef.current.validateFields().then( async values => {
                //准备数据
                const categoryId = this.category._id
                // const categoryName = this.refs.updateForm.getFieldValue('categoryName')
                const {categoryName} = values  //得到子组件传过来的值
                //清除输入数据
                // this.formRef.current.formRef.current.resetFields()
                
                //发请求更新分类
                const result = await reqUpdateCategory({categoryId,categoryName})
                if(result.status===0) {
                    //重新显示列表
                    this.getCategorys()
                }
            
                
                //隐藏确认框
                this.setState({
                    showStatus:0
                })
            
        })
        .catch( () => {
            message.error('请输入',1)
          })
   }


   //为第一次render准备数据
   UNSAFE_componentWillMount () {
       this.initColumns()
   }

   //执行异步任务：发异步ajax请求
   componentDidMount () {
       //获取一级分类列表显示
        this.getCategorys()
   }

   render() {

        //读取状态数据
        const {categorys,subCategorys,parentId,parentName,loading,showStatus} = this.state

        //读取指定分类
        const category = this.category || {name:''} //如果还没有  指定一个空对象
        // console.log(category.name)

       //card的左侧
       const title = parentId==='0' ? '一级分类列表' : (
           <span>
               <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
               <ArrowRightOutlined style={{margin:10}}/>
               <span>{parentName}</span>
           </span>
       )
        //card的右侧
        const exyra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined />
                添加
            </Button>
        )
          

       return (
        <Card title={title} extra={exyra}>
            <Table 
            bordered
            rowKey='_id'
            loading={loading}
            dataSource={parentId==='0' ? categorys : subCategorys} 
            columns={this.columns}
            pagination={{defaultPageSize:6,showQuickJumper:true,}}
            />
             <Modal
            title="添加分类"
            visible={showStatus===1}
            onOk={this.addCategory}
            okText='确定'
            onCancel={this.handleCancel}
            cancelText='取消'
            >
            <AddForm 
            categorys={categorys}
            parentId={parentId}
            ref={this.formRef}
            />
            </Modal>
            <Modal
            title="修改分类"
            visible={showStatus===2}
            onOk={this.updateCategory}
            okText='确定'
            onCancel={this.handleCancel}
            cancelText='取消'
            >
            <UpdateForm 
            categoryName={category.name}
            ref={this.formRef}/>
            </Modal>
        </Card>
       )
   }
}


