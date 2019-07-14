/**
 * @(#)2019/7/1.
 * 订单列表-视图部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import { cloneDeep } from 'lodash'
import { getImg } from 'utils/check'
import React, { Component } from 'react'
import Loading from 'widget/Loading/Loading'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Navigation from 'widget/Navigation/NavigationView'
import { Icon, Toast, Button, InputItem, WhiteSpace } from 'antd-mobile'

// 站点配置
import config from 'config/Config'
// 静态资源CDN前缀，页面中的图片img的src属性必须加上它
const CDN_BASE = config.CDN_BASE || ''

// 引入当前页样式 - 模块化
import styles from './OrderListLess.less'

/**
 * 订单列表-视图层
 *
 * @class OrderListView
 * @extends {Component}
 */
@inject('OrderListMod') // 在视图注入module层数据
@inject('AppStore') // 注入全局Store
@withRouter // 在组件中可通过this.props.history.push跳转路由
@observer // 将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
class OrderListView extends Component {
  constructor(props, context) {
    super(props, context)
    // 注入的OrderListMod
    this.appStore = this.props.AppStore
    this.store = cloneDeep(this.props.OrderListMod)
    this.state = {
      loading: false,
    }
  }

  // 已插入真实DOM
  async componentDidMount() {
    this.setState({ loading: true })
    const userName = this.appStore.state.user
    await this.store.getOrderList(userName) // 获得订单列表
    this.setState({ loading: false })
  }

	/**
	 * 每条订单渲染函数
	 *
	 * @param {object} order
	 * @returns
	 * @memberof OrderListView
	 */
  orderRowRender(order) {
    const { info, totalAmount, deliveryAddress, time, id } = order
    const { retailPrice } = info
    const playCount = parseFloat(totalAmount) / parseFloat(retailPrice) // 购买数量
    const number = Math.max(1, playCount) // 最小为1

    const imgs = this.appStore.imgs
    let imgLen = imgs.length - 1
    const imgUrl = imgs[Math.ceil(Math.random() * imgLen)]

    return (
      <div className="order-row" key={id}>
        <div className="order-header">
          <p>订单编号：</p>
          <p>{id}</p>
          <p className="order-status">{order.status}</p>
        </div>
        <div className="order-content">
          <div className="base-header">
            <div className="img">
              <img src={getImg(imgUrl)} />
            </div>
            <div className="product-info-detail">
              <p className="product-title">{order.name}</p>
              <div className="product-price-box">
                <p className="price">{`￥ ${retailPrice}`}</p>
                <p className="number">{`x${number}`}</p>
              </div>
            </div>
          </div>
          <div className="order-consignee">{`收货人:${deliveryAddress || '无'}`}</div>
          <div className="order-more-info">
            <div className="order-time">下单时间 : <p>{time}</p></div>
            <p className="order-total-price">
              <p>共{number}件商品</p>
              <p>总价</p>
              <p>{`¥ ${totalAmount}`}</p>
            </p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { orderData } = this.store.state
    return (
      <div className={styles['order-list-box']}>
        {this.state.loading && <Loading></Loading>}
        {orderData.slice().map(order => this.orderRowRender(order))}
        <Navigation></Navigation>
      </div>
    )
  }
}

export default OrderListView
