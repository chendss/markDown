// import LoginMod from 'pages/login/loginMod'
import AppStore from 'widget/App/AppStore'
// 示例状态机
import LoginMod from 'pages/Login/LoginMod'
import IndexMod from 'pages/Index/IndexMod'
import ProductListMod from 'pages/ProductList/ProductListMod'
import ProductDetailMod from 'pages/ProductDetail/ProductDetailMod'
import ConfirmOrderMod from 'pages/ConfirmOrder/ConfirmOrderMod'
import OrderListMod from 'pages/OrderList/OrderListMod'
//---STORE_IMPORT---
// 上面这个标记不能去掉，这行也不能去掉

// 1. 下面的内容，一定要竖着写，因为内容很多
// 2. 每一行元内容，末尾要加英文逗号
export {
  AppStore,
  LoginMod,
  IndexMod,
  ProductListMod,
  ProductDetailMod,
  ConfirmOrderMod,
  OrderListMod,
  //---STORE_EXPORT---
  // 上面这个标记不能去掉
}