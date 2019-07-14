// 站点配置
import config from 'config/Config'
// 静态资源CDN前缀，页面中的图片img的src属性必须加上它
const CDN_BASE = config.CDN_BASE || ''


/**
* 判断是否是一个正确的图片url，如果不正确返回占位符图片
*
* @param {string} url
* @returns
*/
export const getImg = function (url) {
  const imgUrlReg = /\.(png|jpe?g|gif|svg)(\?.*)?$/
  let isImg = typeof (url) === 'string' && imgUrlReg.test(url)
  const imgUrl = isImg ? url : `${CDN_BASE}/assets/imgs/no-img.png`
  return imgUrl
}