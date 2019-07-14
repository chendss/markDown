const TabBarCfg =
[
  // 官方商城
  [
    {
      name: '商品列表',
      icon: ['tabbar_car.png', 'selected_car.png'],
      target: '/address_picker',
      activityTab: 'carTab',
      diName: '商品列表'
    },
    {
      name: '订单列表',
      icon: ['tabbar_mine.png', 'selected_mine.png'],
      target: '/personalCenter',
      activityTab: 'mineTab',
      diName: '订单列表'
    },
  ],
]

export default TabBarCfg;