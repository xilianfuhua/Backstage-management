
/**
 * 柱状图路由
 */

import React, { Component } from 'react'
import {Card} from 'antd' 
import ReactEcharts from 'echarts-for-react'
export default class Chart2 extends Component {

    state = {
        sales: [5, 20, 36, 10, 10, 20], // 销量的数组
        stores: [6, 10, 25, 20, 15, 10], // 库存的数组
      }
    

    getOption = (sales,stores) => {
        return {
            tooltip: {},
            legend: {
                data:['销量','库存','浏览量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sales
            },
            {
                name: '库存',
                type: 'bar',
                data: stores
            },
            {
                name: '浏览量',
                type: 'bar',
                data: [20,30,40,25,23,33]
            }]
        }
    }

   render() {
       const {sales,stores} = this.state
       return (
           <div style={{marginBottom:'-45px'}}>
                <Card bordered={false}> 
                    <ReactEcharts option={this.getOption(sales,stores)}/> 
                </Card>
           </div>
       )
   }
}