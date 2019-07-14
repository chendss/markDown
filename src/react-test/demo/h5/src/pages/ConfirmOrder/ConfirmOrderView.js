/**
 * @(#)2019/7/1.
 * 确认订单-视图部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import { cloneDeep } from 'lodash'
import React, { Component } from 'react'
import Loading from 'widget/Loading/Loading'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Toast, Button, InputItem } from 'antd-mobile'
import { queryParse, param } from 'utils/httpTools.js'


import config from 'config/Config' // 站点配置

import styles from './ConfirmOrderLess.less' // 引入当前页样式 - 模块化
import { getImg } from 'utils/check'

// 静态资源CDN前缀，页面中的图片img的src属性必须加上它
const CDN_BASE = config.CDN_BASE || ''

// 前后端字段映射字典
const fieldMapping = {
  id: 'id',
  img: 'fileUrl',
  name: 'name',
  price: 'retailPrice',
  status: 'status',
  number: 'number'
}

/**
 * 下单详情页-视图层
 *
 * @class ConfirmOrderView
 * @extends {Component}
 */
@inject('ConfirmOrderMod') // 在视图注入module层数据
@inject('AppStore') // 注入全局Store
@withRouter // 在组件中可通过this.props.history.push跳转路由
@observer // 将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
class ConfirmOrderView extends Component {
  constructor(props, context) {
    super(props, context)
    super(props, context)
    this.store = cloneDeep(this.props.ConfirmOrderMod)
    this.AppStore = this.props.AppStore
    this.route = this.props.history
    this.state = {
      loading: false,
    }
  }
	/**
	 * 已插入真实DOM
	 *
	 * @memberof ConfirmOrderView
	 */
  componentDidMount () {
    const { search } = this.route.location
    let searchObj = queryParse(search) // 解析查询参数
    this.store.setData(searchObj.id)
  }

	/**
	 * 校验表单
	 *
	 * @returns
	 * @memberof ConfirmOrderView
	 */
  validation () {
    const { consignee } = this.store.state
    if (!consignee) {
      Toast.fail('请填写收货人姓名', 1)
      this.setState({ loading: false })
      return false
    }
    return true
  }

	/**
	 * 确认订单
	 *
	 * @param {string} id 商品id
	 * @memberof ConfirmOrderView
	 */
  async confirmOrder (id) {
    this.setState({ loading: true })
    if (!this.validation()) return

    const userName = this.AppStore.state.user
    const idNumber = parseInt(id + '') || 0
    await this.store.confirmOrder(idNumber, userName).finally(() => {
      this.setState({ loading: false })
    })
    this.route.push('/order-list')
  }

  render () {
    const { setName, numberChange } = this.store
    const { data, consignee } = this.store.state
    const { id, img, price, name, number } = fieldMapping
    return (
      <div className={styles['confirmOrder-box']}>
        {this.state.loading && <Loading />}
        <InputItem
          className="confirmOrder-name"
          disabled={this.state.loading}
          type="text"
          placeholder="请输入收货人姓名"
          onChange={(value) => setName(value)}
          value={consignee}
        >
          收货人姓名
				</InputItem>
        <div className="confirmOrder-base-box">
          <div className="base-header">
            <div className="img">
              <img src={getImg(data[img])} />
            </div>
            <div className="product-info-detail">
              <p className="product-title">{data[name]}</p>
              <div className="product-price-box">
                <p className="price">{`￥ ${data[price]}`}</p>
                <p className="number">{`x${data[number] || 1}`}</p>
              </div>
            </div>
          </div>
          <div className="product-action">
            <div className="confirmOrder-number">
              <p className="label">购买数量</p>
              <div className="number-action">
                <img src={`${CDN_BASE}/assets/imgs/confirmOrder/sub.png`}
                  onClick={() => numberChange(-1)} />
                <input
                  className="number-input"
                  type="number"
                  value={data.number}
                  onChange={event => numberChange(event.target.value, 'cover')}
                />
                <img src={`${CDN_BASE}/assets/imgs/confirmOrder/add.png`}
                  onClick={() => numberChange(1)} />
              </div>
            </div>
            <div className="confirmOrder-distribution">
              <p className="label">配送方式</p>
              <p className="distribution-content">普通配送</p>
            </div>
          </div>
        </div>
        <Button
          disabled={this.state.loading}
          className="btn"
          onClick={() => this.confirmOrder(data[id])}
          type="primary">
          确认订单
				</Button>
      </div>
    )
  }
}

export default ConfirmOrderView
