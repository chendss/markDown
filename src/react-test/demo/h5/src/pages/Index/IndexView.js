/**
 * @(#)2019/7/1.
 * 首页-视图部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import { cloneDeep } from 'lodash'
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Navigation from 'widget/Navigation/NavigationView'

// 站点配置
import config from 'config/Config'
// 静态资源CDN前缀，页面中的图片img的src属性必须加上它
const CDN_BASE = config.CDN_BASE || ''

// 引入当前页样式 - 模块化
import styles from './IndexLess.less'

@inject('IndexMod') // 在视图注入module层数据
@inject('AppStore') // 注入全局Store
@withRouter // 在组件中可通过this.props.history.push跳转路由
@observer // 将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
class Index extends Component {
  constructor(props, context) {
    super(props, context)
    // 注入的OrderListMod
    this.appStore = this.props.AppStore
    this.store = cloneDeep(this.props.IndexMod)
    this.state = {
      loading: false,
    }
  }

  /**
   * render之前
   *
   * @memberof Index
   */
  componentWillMount() {
    if (!this.appStore.isLogin()) {
      this.props.history.push('/login')
    }
  }

  // 已插入真实DOM
  componentDidMount() { }

  render() {
    return (
      <div className={styles['index-box']}>
        欢迎访问xxx商城
        <Navigation></Navigation>
      </div>
    )
  }
}

export default Index