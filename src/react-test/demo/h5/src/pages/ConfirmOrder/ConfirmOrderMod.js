/**
 * @(#)2019/7/1.
 * 确认订单-业务逻辑部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */



import { DB } from 'utils/store'
import { playOrder } from './ConfirmOrderSev'
import { observable, action, useStrict, runInAction } from 'mobx' // 状态管理方法
import { isEmpty, isArray, cloneDeep,  merge, get, isNull } from 'lodash' // 工具方法
// 严格模式
useStrict(true)

/**
 * 下单详情页-业务逻辑层
 *
 * @class ConfirmOrderMod
 */
class ConfirmOrderMod {
	constructor() { }

	@observable state = {
		data: {
			img: '',
			name: '',
			price: 0,
			number: 1,
		},
		consignee: '', // 收货人姓名
	}

	/**
	 * 设置收货人姓名
	 *
	 * @param {string} consignee
	 * @memberof ConfirmOrderMod
	 */
	@action.bound setName(consignee) {
		runInAction(() => {
			this.state.consignee = consignee
		})
	}

	/**
	 * 设置商品详情数据
	 *
	 * @param {string} id 商品id
	 * @memberof ConfirmOrderMod
	 */
	@action.bound setData(id) {
		const product = DB.get('product')
		product.fileUrl = DB.get('imgConfig').url
		runInAction(() => {
			this.state.data = merge(this.state.data, product)
		})
	}

	/**
	 * 改变商品的购买数量
	 *
	 * @param {string} val 商品数量变化量
	 * @param {string} [type='step'] step 步进模式， cover 覆盖模式
	 * @memberof ConfirmOrderMod
	 */
	@action.bound numberChange(val, type = 'step') {
		val = val || '1'
		let result = this.state.data.number
		let value = parseInt(val) || result
		if (type === 'step') {
			result = Math.max(result + value, 1)
		} else {
			result = Math.max(value, 1)
		}
		runInAction(() => {
			this.state.data.number = result
		})
	}

	/**
	 * 下单行为触发
	 *
	 * @param {number} id 商品id
	 * @param {string} userName 用户名
	 * @memberof ConfirmOrderMod
	 */
	@action.bound async confirmOrder(id, userName) {
		const { number, name, retailPrice } = this.state.data
		let form = {
			userName: userName,
			totalAmount: number,
			deliveryAddress: this.state.consignee,
			itemName: name,
			itemId: id,
			itemPrice: parseInt(retailPrice + '') || 0
		}
		await playOrder(form)
	}
}

const confirmOrderMod = new ConfirmOrderMod()
export default confirmOrderMod
