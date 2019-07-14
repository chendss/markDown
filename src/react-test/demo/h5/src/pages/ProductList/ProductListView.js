/**
 * @(#)2019/7/1.
 * 商品列表-视图部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import { DB } from 'utils/store'
import { getImg } from 'utils/check'
import { cloneDeep, get } from 'lodash'
import React, { Component } from 'react'
import { param } from 'utils/httpTools.js'
import Loading from 'widget/Loading/Loading'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Navigation from 'widget/Navigation/NavigationView'

// 站点配置
import config from 'config/Config'
// 引入当前页样式 - 模块化
import styles from './ProductListLess.less'


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
 * 商品列表-视图层
 *
 * @class ProductListView
 * @extends {Component}
 */
@inject('ProductListMod') // 在视图注入module层数据
@inject('AppStore') // 注入全局Store
@withRouter // 在组件中可通过this.props.history.push跳转路由
@observer // 将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
class ProductListView extends Component {
	constructor(props, context) {
		super(props, context)
		this.store = cloneDeep(this.props.ProductListMod)
		this.AppStore = this.props.AppStore
		this.route = this.props.history
		this.state = {
			loading: true,
		}
	}

	// 已插入真实DOM
	async componentDidMount() {
		this.setState({ loading: true })
		await this.store.getProducts() // 获得商品列表数据的行为
		this.setState({ loading: false })
	}

	/**
	 * 从商品列表去往商品详情
	 *
	 * @param {object} product 在列表中的商品数据
	 * @param {string} imgUrl 图片地址
	 * @memberof ProductListView
	 */
	jumpProductDetalPage(product, imgUrl) {
		DB.set('imgConfig', {
			id: product.id,
			url: imgUrl
		})
		this.route.push(`/product-detail?id=${product.id}`)
	}


	/**
	 * 商品列表每一行的渲染函数
	 *
	 * @param {object} product 代表第index行的商品数据
	 * @param {number} index 代表当前第几行
	 * @returns jsx
	 * @memberof ProductListView
	 */
	renderProductRow(product, index) {
		const imgs = this.AppStore.imgs
		const { id, img, price, name } = fieldMapping
		let imgLen = imgs.length - 1
		const imgUrl = imgs[Math.ceil(Math.random() * imgLen)]
		return (
			<li
				key={product[id]}
				className="product-box"
				onClick={() => this.jumpProductDetalPage(product, imgUrl)}
			>
				<img src={getImg(imgUrl)}></img>
				<div className="brand-info-box">
					<p className="price">{`￥ ${product[price]}`}</p>
					<p className="brand">{get(product, 'brand', '')}</p>
				</div>
				<p className="name">{get(product, name, '')}</p>
			</li>
		)
	}

	render() {
		const { products } = this.store.state // 将状态机里的商品列表数据解构出来
		return (
			<div>
				<ui className={styles['product-list-box']}>
					{this.state.loading && <Loading />}
					{products.map((product, index) => this.renderProductRow(product, index))}
				</ui>
				<Navigation></Navigation>
			</div>
		)
	}
}

export default ProductListView
