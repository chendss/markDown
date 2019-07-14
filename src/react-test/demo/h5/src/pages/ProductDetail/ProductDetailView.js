/**
 * @(#)2019/7/1.
 * 商品详情-视图部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import { DB } from 'utils/store'
import { Button } from 'antd-mobile'
import { getImg } from 'utils/check'
import { cloneDeep, get } from 'lodash'
import React, { Component } from 'react'
import Loading from 'widget/Loading/Loading'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { queryParse, param } from 'utils/httpTools.js'

// 站点配置
import config from 'config/Config'
// 引入当前页样式 - 模块化
import styles from './ProductDetailLess.less'

// 静态资源CDN前缀，页面中的图片img的src属性必须加上它
const CDN_BASE = config.CDN_BASE || ''

// 前后端字段映射字典
const fieldMapping = {
	id: 'id',
	img: 'fileUrl',
	name: 'name',
	price: 'retailPrice',
	status: 'status'
}

/**
 * 商品详情-视图层
 *
 * @class ProductDetailView
 * @extends {Component}
 */
@inject('ProductDetailMod') // 在视图注入module层数据
@inject('AppStore') // 注入全局Store
@withRouter // 在组件中可通过this.props.history.push跳转路由
@observer // 将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
class ProductDetailView extends Component {
	constructor(props, context) {
		super(props, context)
		this.store = cloneDeep(this.props.ProductDetailMod) // 商品详情store赋值
		this.AppStore = this.props.AppStore
		this.route = this.props.history
		this.state = {
			loading: true,
		}
	}

	// 已插入真实DOM
	async componentDidMount() {
		const { search } = this.route.location
		let searchObj = queryParse(search) // 查询参数传对象

		this.setState({ loading: true })
		await this.store.getProductDetail(searchObj, searchObj.id) // 获得商品详情数据
		this.setState({ loading: false })
	}

	/**
	 * 跳转至确认订单页面
	 *
	 * @param {object} productDetail 商品详情数据
	 * @memberof ProductDetailView
	 */
	jumpConfirmOrderPage(productDetail) {
		DB.set('product', productDetail)
		this.route.push(`/confirmOrder?id=${productDetail.id}`)
	}

	render() {
		const { productDetail } = this.store.state // 从状态机解构出商品详情数据
		const { id, img, price, name } = fieldMapping
		return (
			<div className={styles['product-detail-box']}>
				{this.state.loading && <Loading />}
				<div className="product-detail-content">
					<img src={getImg(productDetail[img])} />
					<div className="price-box">
						{`¥${productDetail[price]}`}
						<span>物廉价美</span>
					</div>
					<div className="product-name-box">
						<p className="name">{productDetail[name]}</p>
						<p className="brand">{get(productDetail, 'brand', '')}</p>
					</div>
					<div className="module-adds">
						<span className="postage">快递 0.00</span>
						<span className="sales">{`月销量 ${productDetail.sales}件`}</span>
						<span className="delivery">广州</span>
					</div>
				</div>
				<Button
					className="btn"
					onClick={() => this.jumpConfirmOrderPage(productDetail, productDetail[id])}
					type="primary">
					立即下单
				</Button>
			</div>
		)
	}
}

export default ProductDetailView
