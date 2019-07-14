import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { HashRouter as Router, withRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { getRouter } from 'router';

import { hot } from 'react-hot-loader';

// 公共样式
import 'assets/css/common.less';
// 懒加载插件
import { createBundle } from 'widget/Common';

// 主页面
import Layout from 'widget/Layout/LayoutView';

// 页面样式
import styles from './AppLess.less'

// 注入在config/Stores.js中注入的AppStore，以便获取store中的状态state或调用方法
@inject('AppStore')
// 将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
// 在组件中可通过this.props.history.push跳转路由，根组件不能加@withRouter，这里只是做示例
// @withRouter
class AppView extends Component {
  constructor(props, context) {
    super(props, context);
    this.store = this.props.AppStore;
  }

  //完成：插入真实 DOM前
  componentWillMount() {
    // 设置全局路由表配置
    this.store.setRouterCfg()
  }

  render() {
    return (
      <div className="app">
        <Router>
          {
            this.store.state.isLoaded && (
              <Switch>
                <Route path="/" component={Layout} />
              </Switch>
            )
          }
        </Router>
      </div>
    )
  }
}

export default AppView;