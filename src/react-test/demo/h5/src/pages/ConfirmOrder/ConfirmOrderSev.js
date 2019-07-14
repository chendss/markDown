/**
 * @(#)2019/7/1.
 * 确认订单-接口部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import request from 'utils/request'

/**
 * 调用接口下单
 *
 * @param {*} form
 * @returns
 */
export const playOrder = async function (form) {
	let res = await request({
		url: 'v1/order/add',
		method: 'POST',
		data: form,
		params: form,
		headers: {
			'Content-type': 'application/json;charset=UTF-8'
		}
	})
	let result = []
	if (res.resultCode + '' === '0') {
		let data = res.data || {}
		let list = data.list || []
		result = list
	}
	return result
}
