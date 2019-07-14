/**
 * @(#)2019/7/1.
 * 登陆页-业务逻辑部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */


import { observable, action, useStrict, runInAction } from 'mobx' // 状态管理方法
import sev from './LoginSev' // 引入Serv

// 严格模式
useStrict(true)

/**
 * 登录页-业务逻辑层
 *
 * @class LoginMod
 */
class LoginMod {
	// 监视状态
	@observable state = {
		user: '',
		pwd: '',
	}

	// 构造函数
	constructor() { }

	/**
	 * 设置登陆表单
	 *
	 * @param {object} { user, pwd } 用户名，密码
	 * @memberof LoginMod
	 */
	@action.bound setForm({ user, pwd }) {
		runInAction(() => {
			this.state.user = user || this.state.user
			this.state.pwd = pwd || this.state.pwd
		})
	}
}

// 将组件实例化，这意味着组件将不能从别处实例化
const loginMod = new LoginMod()
export default loginMod
