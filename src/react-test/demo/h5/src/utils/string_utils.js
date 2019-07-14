/**
 * 字符串处理的工具类
 * 1. url地址栏解析
 * 2. 金额、千分位处理
 */
class StringUtils {

  // 从url取值参数值，传入参数名
  static getQueryString(name = '') {
    var after = window.location.hash.split("?")[1] || '';
    if (after && name) {
      var reg = new RegExp("(^|&)" + name.trim() + "=([^&]*)(&|$)");
      var r = after.trim().match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      }
      else {
        return null;
      }
    }
  }
}

export default StringUtils;