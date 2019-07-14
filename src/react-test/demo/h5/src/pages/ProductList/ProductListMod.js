/**
 * @(#)2019/7/1.
 * 商品列表-业务逻辑部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import serv from './ProductListSev' // 引入Serv
import { observable, action, useStrict, runInAction } from 'mobx' // 状态管理方法
// 站点配置
import config from 'config/Config'
const CDN_BASE = config.CDN_BASE || ''

useStrict(true)


/**
 * 商品列表-业务逻辑层
 *
 * @class ProductListMod
 */
class ProductListMod {
	constructor() {
	}


	/**
	 * 商品列表状态机
	 *
	 * @memberof ProductListMod
	 */
	@observable state = {
		products: [],
	}

	/**
	 * 商品列表请求参数
	 *
	 * @memberof ProductListMod
	 */
	@observable pageOption = {
		pageNum: 1,
		pageSize: 100
	}

	/**
	 * 获得列表数据
	 *
	 * @memberof ProductListMod
	 */
	@action.bound async getProducts() {
		const { pageOption } = this
		let products = await serv.products(pageOption)
		runInAction(() => {
			this.state.products = products
		})
	}
}

const productListMod = new ProductListMod()
export default productListMod
