/**
 * @(#)2019/7/1.
 * 商品列表-接口部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import request from 'utils/request';
// 站点配置
import config from 'config/Config'
const CDN_BASE = config.CDN_BASE || ''


/**
 * 从服务器获得商品列表数据
 *
 * @param {*} pageOption 列表请求参数
 * @returns
 */
const products = async function (pageOption) {
    let res = await request({
        url: `v1/item/list`,
        method: 'GET',
        params: pageOption
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
    products
}