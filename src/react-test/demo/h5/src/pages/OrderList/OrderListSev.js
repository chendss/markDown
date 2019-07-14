/**
 * @(#)2019/7/1.
 * 订单列表-接口部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import request from 'utils/request'
import { queryParse, param } from 'utils/httpTools.js'
// 站点配置
import config from 'config/Config'

const CDN_BASE = config.CDN_BASE || ''

/**
 * 调用接口获得订单列表数据
 *
 * @param {object} pageOption
 * @param {string} userName
 * @returns Promise
 */
const orderList = async function (pageOption, userName) {
    let res = await request({
        url: `v1/order/list`,
        method: 'GET',
        params: Object.assign(pageOption, { userName })
    })
    let result = []
    if (res.resultCode + '' === '0') {
        let data = res.data || {}
        let list = data.list || []
        result = list
    }
    return result
}

export default {
    orderList
}