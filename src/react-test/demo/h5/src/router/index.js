import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { createBundle } from 'widget/Common'

// 页面找不到组件
import NotFound from 'bundle-loader?lazy&name=NotFoundView!widget/NotFound/NotFoundView'
import LoginView from 'bundle-loader?lazy&name=Login!pages/Login/LoginView'
import IndexView from 'bundle-loader?lazy&name=Index!pages/Index/IndexView' // 默认首页
import ProductListView from 'bundle-loader?lazy&name=ProductList!pages/ProductList/ProductListView'
import ProductDetailView from 'bundle-loader?lazy&name=ProductDetail!pages/ProductDetail/ProductDetailView'
import ConfirmOrderView from 'bundle-loader?lazy&name=ConfirmOrder!pages/ConfirmOrder/ConfirmOrderView'
import OrderListView from 'bundle-loader?lazy&name=OrderList!pages/OrderList/OrderListView'
//---ROUTER_IMPORT---
// 上面这个标记不能去掉

const routerList = function() {
  let baseArray = [
    // 关闭懒加载组件 lazy:false 即可
    { path: '/&&首页', component: IndexView },
    { path: '/index&&首页', component: IndexView },
    { path: '/login&&登陆', component: LoginView },
    { path: '/product-list&&商品列表', component: ProductListView },
    { path: '/product-detail&&商品详情', component: ProductDetailView },
    { path: '/confirmOrder&&下单', component: ConfirmOrderView },
    { path: '/order-list&&订单列表', component: OrderListView },
    //---ROUTER_APPEND---
	  // 上面这个标记不能去掉
  ]
  let result = baseArray.map(item => {
    let [path, title] = item.path.split('&&')
    let result = {
      path,
      title,
      component() {
        return createBundle(item.component)
      },
      render() {
        return <item.component />
      },
    }
    item.lazy === false ? delete result.component : delete result.render
    return result
  })
  return result
}

const getRouter = function() {
  return (
    <div>
      <Switch>
        {routerList().map((route, idx) => {
          if (location.hash == '#' + route.path) {
            document.title = route.title || ''
          }
          if (route.render) {
            return <Route key={'route_' + idx} path={route.path} exact component={route.render} />
          } else {
            return <Route key={'route_' + idx} path={route.path} exact component={route.component()} />
          }
        })}
        <Route component={createBundle(NotFound)} />
      </Switch>
    </div>
  )
}

export { getRouter }