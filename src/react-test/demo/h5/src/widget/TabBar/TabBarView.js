import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'

import { TabBar } from 'antd-mobile';

import StringUtils from 'utils/string_utils';
import tabStyle from './TabBarLess.less';
import TabBarCfg from './TabBarCfg';

import config from 'config/Config';

const CDN_BASE = config.CDN_BASE || '';

class TabBarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'indexTab',
      hidden: false,
      fullScreen: true,
      type: StringUtils.getQueryString('tabBarType') || 0,
      style: [{
          normalColor: '#FD5C0E',
          activeColor: '#FD5C0E'
        },
        {
          normalColor: '#0F68B0',
          activeColor: '#0F68B0'
        }
      ],
      tabBardata: TabBarCfg
    };
  }

  hideTabBar() {
    // e.preventDefault();
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  componentDidMount() {
    // 当前选中的选项卡
    if (!!this.props.selectedTab) {
      this.setState({
        selectedTab: this.props.selectedTab
      })
    }
  }

  // 选项卡点击
  onTabBarClick(currKey, gotoUrl, urlName) {
    // // 统计热图切片
    // stm_clicki('send', 'event', '底部导航', '点击', urlName);
    let urls = gotoUrl

    // 如果是门店首页时，附加tabBarType参数 0 - 官方商城首页  1 - 门店首页，用于显示对应的图标
    if ('indexTab' != currKey) {
      let tabBarType = StringUtils.getQueryString('tabBarType');
      // 经销商ID
      let dealerId = StringUtils.getQueryString('dealerId');
      if (tabBarType) {
        urls = gotoUrl + '?tabBarType=' + tabBarType
        if (dealerId) {
          urls += '&dealerId=' + dealerId;
        }
      }
    }

    // 客服选项卡附加参数
    if ('kefuTab' === '' + currKey) {
      urls += `&from=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(document.title)}`
    }

    this.setState({
      selectedTab: currKey,
    });

    // 首页选中时不显示标题
    if ('indexTab' === '' + currKey) {
      this.title = '';
    }

    window.app.router.push(urls);
  }

  // 是否iPhoneX
  isIphoneX() {
    if (/iphone/ig.test(navigator.userAgent)) {
      // (window.innerWidth == 375*3) && (window.innerHeight == 724*3)
      return window.devicePixelRatio === 3 && (screen.height == 812 && screen.width == 375)
    }
    return false;
  }

  // 获取tabBar样式
  getTabBarStyle() {
    let style = { position: 'fixed', height: '1.5rem', width: '100%', bottom: '-0.52rem' }
    return style;
  }

  getIconStyle(item, index) {
    let imgBase = CDN_BASE  + '/assets/imgs/widget/TabBar';
    let bgImgStyle =  { backgroundImage: `url(${imgBase}/${item.icon[index]})` };

    // 如果传入了自定义样式
    if (item.style) {
      return Object.assign(bgImgStyle, item.style);
    } else {
      return bgImgStyle;
    }
  }

  render() {
    let { selectedTab, type, tabBardata, style } = this.state;
    return (
      <div className="tab-bar-page" style={this.state.fullScreen ? this.getTabBarStyle() : { height: '100%' }}>
        <TabBar 
          unselectedTintColor={style[type].normalColor} 
          tintColor={style[type].activeColor}
          barTintColor="white" 
          hidden={this.state.hidden}>
          {
            tabBardata[type].map(item =>
              <TabBar.Item
                title={item.name}
                key={item.activityTab}
                icon={<div className="tab_page_icon" style={this.getIconStyle(item, 0)}></div>}
                selectedIcon={<div className="tab_page_icon" style={this.getIconStyle(item, 1)}></div>}
                selected={selectedTab === item.activityTab}
                onPress={() => this.onTabBarClick(item.activityTab, item.target, item.diName)}
              />
            )
          }
      </TabBar>
      </div>
    );
  }
}

module.exports = TabBarView;