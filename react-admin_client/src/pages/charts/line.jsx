
/**
 * 折线图路由
 */

import React, { Component } from 'react'
import {Card, Button} from 'antd' 
import ReactEcharts from 'echarts-for-react'
export default class Line extends Component {

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
                type: 'line',
                data: sales
            },
            {
                name: '库存',
                type: 'line',
                data: stores
            },
            {
                name: '浏览量',
                type: 'line',
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

        var data = [];

        for (var i = 0; i <= 360; i++) {
            var t = i / 180 * Math.PI;
            var r = Math.sin(2 * t) * Math.cos(2 * t);
            data.push([r, i]);
        }

        return {
            title: {
                text: '极坐标双数值轴'
            },
            legend: {
                data: ['line']
            },
            polar: {
                center: ['50%', '54%']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            angleAxis: {
                type: 'value',
                startAngle: 0
            },
            radiusAxis: {
                min: 0
            },
            series: [{
                coordinateSystem: 'polar',
                name: 'line',
                type: 'line',
                showSymbol: false,
                data: data
            }],
            animationDuration: 2000
        }
    }

   render() {
    const {sales,stores} = this.state
        return (
            <div>
                <Card> 
                    <Button type='primary' onClick={this.update}>更新</Button> 
                </Card> 
                <Card title='折线图一'> 
                    <ReactEcharts option={this.getOption(sales,stores)}/> 
                </Card>
                <Card title='折线图二'> 
                    <ReactEcharts option={this.getOption1()}/> 
                </Card>
            </div>
        )
   }
}