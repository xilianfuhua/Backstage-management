
/**
 * 柱状图路由
 */

import React, { Component } from 'react'
import {Card, Button} from 'antd' 
import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component {

    state = {
        sales: [5, 20, 36, 10, 10, 20], // 销量的数组
        stores: [6, 10, 25, 20, 15, 10], // 库存的数组
      }
    

    getOption = (sales,stores) => {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
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

    update = () => {
        this.setState(state =>({
            sales:state.sales.map(s => s+1),
            stores:state.stores.reduce((pre,store) => {
                    pre.push(store-1)
                return pre
            },[])
        }))
    }

    getOption1 = () => {
        return {
            title: {
                text: '某地区蒸发量和降水量',
                subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['蒸发量', '降水量']
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '蒸发量',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name: '降水量',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    markPoint: {
                        data: [
                            {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                            {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        }
    }

   render() {
       const {sales,stores} = this.state
       return (
           <div>
                <Card> 
                    <Button type='primary' onClick={this.update}>更新</Button> 
                </Card> 
                <Card title='柱状图一'> 
                    <ReactEcharts option={this.getOption(sales,stores)}/> 
                </Card>
                <Card title='柱状图二'> 
                    <ReactEcharts option={this.getOption1()}/> 
                </Card>
           </div>
       )
   }
}