/**
 * @(#)2019/7/1.
 * 登陆页-视图部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import { cloneDeep } from 'lodash'
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Toast, Button, InputItem, WhiteSpace } from 'antd-mobile'

// 站点配置
import config from 'config/Config'
// 静态资源CDN前缀，页面中的图片img的src属性必须加上它
const CDN_BASE = config.CDN_BASE || ''

// 引入当前页样式 - 模块化
import styles from './LoginLess.less'
// 多类名样式管理工具

// 在视图注入module层数据
@inject('LoginMod')
// 注入全局Store
@inject('AppStore')
// 在组件中可通过this.props.history.push跳转路由
@withRouter
// 将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class LoginView extends Component {
  // 构造函数，组件的实例创建时，最先执行
  constructor(props, context) {
    super(props, context)
    // 注入的LoginMod
    this.appStore = this.props.AppStore
    this.store = this.props.LoginMod
    this.state = {
      loading: false,
    }
  }

  // 已插入真实DOM
  componentDidMount() { }

	/**
	 * 当用户名或者密码值变化的时候回调
	 *
	 * @param {string} value 值
	 * @param {string} key （user、pwd）
	 */
  onChange(value, key) {
    const { setForm } = this.store // 从store提取表单设置action
    setForm({ [key]: value })
  }

	/**
	 * 表单模型构建方法
	 *
	 * @returns
	 * @memberof LoginView
	 */
  createForm() {
    let formConfig = [
      'user-text-用户名-请输入用户名',
      'pwd-password-密码-请输入密码'
    ]
    let result = formConfig.map(info => {
      let infoArray = info.split('-')
      let [key, type, name, placeholder] = infoArray // 取出所需的值
      return { key, type, name, placeholder }
    })
    return result
  }

  /**
   * 表单校验方法
   *
   * @returns Boolean
   * @memberof LoginView
   */
  validation() {
    let rules = [
      { key: 'user', message: '用户名不能为空' },
      { key: 'pwd', message: '密码不能为空' },
    ]
    // 遍历规则，有一项不通过则抛出提示
    for (let rule of rules) {
      const { key, message } = rule
      if (!this.store.state[key]) {
        Toast.fail(message, 1)
        this.setState({ loading: false })
        return false
      }
    }
    return true
  }

	/**
	 * 登陆行为调用
	 *
	 * @memberof LoginView
	 */
  loginAction() {
    this.setState({ loading: true })
    if (this.validation()) { // 校验表单合法性
      this.setState({ loading: false })
      this.appStore.saveUserInfo(this.store.state)
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div className={styles['login-box']}>
        <div className="logo">
          <img src={`${CDN_BASE}/assets/imgs/login/logo.png`} />
        </div>
        {this.createForm().map(formItem => {
          return (
            <InputItem
              disabled={this.state.loading}
              key={formItem.key}
              className={formItem.key}
              type={formItem.type}
              placeholder={formItem.placeholder}
              onChange={value => this.onChange(value, formItem.key)}
              value={this.store.state[formItem.key]}
            >
              {formItem.name}
            </InputItem>
          )
        })}
        <Button
          disabled={this.state.loading}
          className="login-btn"
          onClick={() => this.loginAction()}
          type="primary"
        >
          登陆
				</Button>
        <WhiteSpace />
      </div>
    )
  }
}

// 使用AntDesign的Form.create()包裹，以便可以在组件中使用this.props.form获得form对象
export default LoginView
