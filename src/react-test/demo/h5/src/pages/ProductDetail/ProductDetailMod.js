/**
 * @(#)2019/7/1.
 * 商品详情-业务逻辑部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import { DB } from 'utils/store'
import { merge } from 'lodash' // 解构出合并函数
import sev from './ProductDetailSev' // 引入商品详情Serv
import { observable, action, useStrict, runInAction } from 'mobx' // 状态管理方法

// 严格模式
useStrict(true)

/**
 * 商品详情-业务逻辑层
 *
 * @class ProductDetailMod
 */
class ProductDetailMod {
	constructor() { }

	// 商品详情状态机
	@observable state = {
		productDetail: { // 商品详情数据 
			img: '', // 商品主图
			name: '', // 商品名称
			price: 0, // 商品价格,
			sales: 100, // 月销量
		},
	}

	/**
	 * 获得商品详情数据
	 *
	 * @param {object} searchObj 查询参数对象
	 * @param {string|number} id 商品id
	 * @memberof ProductDetailMod
	 */
	@action async getProductDetail(searchObj, id) {
		// 调用接口获得商品详情数据
		let productDetail = await sev.productDetail(searchObj, id)
		let fileUrl = DB.get('imgConfig').url
		productDetail.fileUrl = fileUrl
		runInAction(() => {
			// 通过合并的方式防止null进入
			this.state.productDetail = merge(this.state.productDetail, productDetail)
		})
	}
}

const productDetailMod = new ProductDetailMod()
export default productDetailMod
