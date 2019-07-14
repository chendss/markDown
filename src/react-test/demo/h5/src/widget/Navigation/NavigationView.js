import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { cloneDeep } from 'lodash'
// 站点配置
import config from 'config/Config'
// 引入当前页样式 - 模块化
import styles from './NavigationLess.less'

// 静态资源CDN前缀，页面中的图片img的src属性必须加上它
const CDN_BASE = config.CDN_BASE || ''

@withRouter // 在组件中可通过this.props.history.push跳转路由
class NavigationView extends Component {
  constructor(props, context) {
    super(props, context)
    this.route = this.props.history
    this.state = {
      navList: [
        {
          icon: `${CDN_BASE}/assets/imgs/widget/TabBar/tabbar_activity.png`,
          hoverIcon: `${CDN_BASE}/assets/imgs/widget/TabBar/tabbar_activity.png`,
          name: '商品列表',
          path: '/product-list',
        },
        {
          icon: `${CDN_BASE}/assets/imgs/widget/TabBar/tabbar_mine.png`,
          hoverIcon: `${CDN_BASE}/assets/imgs/widget/TabBar/selected_mine.png`,
          name: '订单列表',
          path: '/order-list',
        },
      ],
      currentNav: ''
    }
  }

  componentDidMount() {
    const { location } = this.route
    const { pathname } = location
    this.setState({ currentNav: pathname })
  }

  navClick(nav) {
    const { path } = nav
    this.route.push(path)
  }

  navRender(nav) {
    const currentNav = this.state.currentNav
    const src = currentNav === nav.path ? nav.hoverIcon : nav.icon
    return (
      <div className="nav-item-box" onClick={() => this.navClick(nav)}>
        <img src={src} className="nav-img"></img>
        <p className="nav-label">{nav.name}</p>
      </div>
    )
  }

  render() {
    return (
      <div className={styles['navigation-box']}>
        {this.state.navList.map(nav => this.navRender(nav))}
      </div>
    )
  }
}

export default NavigationView