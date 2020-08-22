
/**
 * 首页路由
 */

import React, { Component } from 'react'
import { Statistic, Card, Row, Col,Tabs ,Button } from 'antd'
import { QuestionCircleOutlined,ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

import './home.css'
import Chart from './chart'
import Chart2 from './chart2'
import Chart3 from './chart3'
import SalesVolume from './Sales-volume'

const { TabPane } = Tabs

export default class Home extends Component {
   render() {

       return (
        <div className="site-card-border-less-wrapper">
            <Card title="浏览总量" extra={<QuestionCircleOutlined className='bcolor'/>} bordered style={{ width: 350 }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card>
                        <Statistic
                            title="日同比"
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                        <Statistic
                            title="周同比"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                        </Card>
                    </Col>
                </Row>
            </Card>
            <Row gutter={16} className='money'>
                <Col span={12}>
                <Statistic title="活跃用户(人)" value={281293} />
                </Col>
                <Col span={12}>
                <Statistic title="账户余额(元)" value={1712893} precision={2} />
                </Col>
            </Row>,
            <div className='tu-right'>
                <SalesVolume/>
            </div>
            <div className='atab'>
                <Tabs tabPosition={"right"}>
                    <TabPane tab="访问量" key="1">
                       <Chart2/>
                    </TabPane>
                    <TabPane tab="销售量" key="2">
                        <Chart/>
                    </TabPane>
                    <TabPane tab="库存量" key="3">
                        <Chart3/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
       )
   }
}