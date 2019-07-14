/**
 * @(#)2019/7/1.
 * 登陆页-接口部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import request from 'utils/request'

/**
* 向服务器发起登录请求
*
* @param {string} user 用户名
* @param {string} pwd 密码
* @returns
*/
const login = async function (user, pwd) {
  return new Promise((resolve, err) => {
    setTimeout(() => {
      resolve(true)
    }, 300)
  })
}

export default {
  login
}