/**
 * @(#)2019/7/1.
 * 商品详情-接口部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import request from 'utils/request'
import config from 'config/Config' // 站点配置
import { assignIn, cloneDeep, merge } from 'lodash'

/**
 * 从服务器获得商品详情数据
 *
 * @param {object} search 从列表过来的查询参数对象
 * @param {string|number} id 商品id
 * @returns Promise
 */
const productDetail = async function (search, id) {
	let searchCopy = cloneDeep(search) // 深度克隆一份查询对象数据
	let res = await request({
		url: `/v1/item/${id}`,
		method: 'GET',
	})
	let result = []
	if (res.resultCode + '' === '0') {
		let data = res.data || {}
		result = merge(searchCopy, data)
	}
	return result
}

export default {
	productDetail
}
