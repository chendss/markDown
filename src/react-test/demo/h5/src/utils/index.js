import { parse } from 'qs';
import { isArray, pick, map } from 'lodash';
import moment from 'moment';

class Utils {
  // 从url取值 name可以参数的key，或者多个key的数组
  static getQueryString(name) {
    let after = window.location.hash.split('?')[1] || '';
    if(!after || !name){
      return null;
    }

    if(isArray(name)){
      // 去空格
      let obj = parse(after.trim());
      // 每一项都解码
      map(obj, (v) => {
        return decodeURIComponent(v);
      })
      return pick(obj, name);
    }

    let reg = new RegExp('(^|&)' + name.trim() + '=([^&]*)(&|$)');
    let r = after.trim().match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;
    }
  }
  //多时区
  /*
  * dateString  只支持  2019-05-28 15:11:19 时间格式 或者  1559027246000  时间戳格式
  * */
  static timeZone(dateString){
    let timeObj = {
      timeStamp:"", //时间戳
      utcTime:"", //utc时间
      utcTimeStamp:"", // utc时间戳
      timeZone:"", //当前时区
      currentZoneTime:"" //当前时区的时间
    };
    if(!dateString) return timeObj;
    //转为时间戳
    timeObj.timeStamp = Date.parse(dateString);
    //判断时间戳转义是否成功，如果韦否，就把输入的时间设置为时间戳
    if(String(timeObj.timeStamp) == 'NaN') {
      timeObj.timeStamp = dateString
    };

    //转为时间格式
    timeObj.utcTime = moment.utc(timeObj.timeStamp).format('YYYY-MM-DD HH:mm:ss');
    timeObj.utcTimeStamp = Date.parse(timeObj.utcTime);
    timeObj.timeZone = new Date().getTimezoneOffset() / 60;
    timeObj.currentZoneTime = moment(timeObj.utcTime).subtract(timeObj.timeZone,'hour').format('YYYY-MM-DD HH:mm:ss');

    return timeObj;
  }
}
export default Utils;