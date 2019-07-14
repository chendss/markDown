/**
 * @(#)2019/7/1.
 * 首页-业务逻辑部分
 * @author 飞光
 *
 * Copyright (c) 2019, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */


import { observable, action, useStrict, runInAction } from 'mobx' // 状态管理方法
import sev from './IndexSev' // 引入Serv

// 严格模式
useStrict(true)

/**
 * 首页-业务逻辑部分
 *
 * @class IndexMod
 */
class IndexMod {
  // 构造函数
  constructor() { }


  // 监视状态
  @observable state = {
  }

}

const indexMod = new IndexMod()
export default indexMod