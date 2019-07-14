/**
 * @(#)2019/7/1.
 * 订单列表-业务逻辑部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import sev from './OrderListSev' // 引入订单列表接口调用对象
import { observable, action, useStrict, runInAction } from 'mobx' // 状态管理方法
import { cloneDeep, merge, assignIn } from 'lodash' // 工具方法
import moment from 'moment'


// 严格模式
useStrict(true)

/**
 * 订单列表-业务逻辑层
 *
 * @class OrderListMod
 */
class OrderListMod {
	constructor() { }

	orderStatusEnum = {
		'1': '待支付'
	}

	@observable state = {
		orderData: [],
	}

	/**
	 * 列表参数
	 *
	 * @memberof OrderListMod
	 */
	@observable pageOption = {
		pageNum: 1,
		pageSize: 100
	}

	/**
	 * 设置列表参数
	 *
	 * @param {object} option
	 * @memberof OrderListMod
	 */
	@action.bound setOption(option) {
		runInAction(() => {
			this.pageOption = assignIn(this.pageOption, option)
		})
	}

	/**
	 * 获得订单列表数据
	 *
	 * @param {*} userName 用户名
	 * @memberof OrderListMod
	 */
	@action.bound async getOrderList(userName) {
		let res = await sev.orderList(this.pageOption, userName)
		res = res.filter(item => typeof JSON.parse(item.itemSnapshot) === 'object')
		res.forEach(item => {
			let time = item.orderTime || ''
			item.info = JSON.parse(item.itemSnapshot)
			item.img = item.fileUrl
			item.time = time ? moment(time).format("YYYY-MM-DD HH:mm:ss") : ''
			item.info.retailPrice = item.info.retailPrice.toFixed(2)
			item.status = this.orderStatusEnum[item.orderStatus || '1']
			item.totalAmount = item.totalAmount.toFixed(2)
		})
		runInAction(() => {
			this.state.orderData = res
		})
	}
}

const orderListMod = new OrderListMod()
export default orderListMod
