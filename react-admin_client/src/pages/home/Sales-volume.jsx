
/**
 * 折线图路由
 */

import React, { Component } from 'react'
import {Card} from 'antd' 
import ReactEcharts from 'echarts-for-react'
export default class SalesVolume extends Component {

    state = {
        sales: [5, 20, 36, 10, 10, 20,41], // 销量的数组
        stores: [6, 10, 25, 20, 15, 10,26], // 库存的数组
      }
    

    getOption = (sales,stores) => {
        return {
            tooltip: {},
            legend: {
                data:['衬衫','羊毛衫','雪纺衫']
            },
            xAxis: {
                data: ["周一","周二","周三","周四","周五","周六","周日"]
            },
            yAxis: {},
            series: [{
                name: '衬衫',
                type: 'line',
                data: sales
            },
            {
                name: '羊毛衫',
                type: 'line',
                data: stores
            },
            {
                name: '雪纺衫',
                type: 'line',
                data: [20,30,40,25,23,33,55]
            }]
        }
    }
   
   render() {
    const {sales,stores} = this.state
        return (
            <div>
                <Card bordered={false}> 
                    <ReactEcharts option={this.getOption(sales,stores)}/> 
                </Card>
            </div>
        )
   }
}