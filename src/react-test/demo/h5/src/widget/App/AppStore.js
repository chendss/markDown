// lodash遍历对象的key键
import { keys } from 'lodash';
// mobx的公共方法
import { observable, action, useStrict, runInAction, autorun } from 'mobx';
// 请求路由配置项
import { getRouterTable } from './AppServ';
import { DB } from 'utils/store'
// 严格模式
useStrict(true);

class AppStore {

  // 构造函数
  constructor() {
    // 从缓存提出用户配置信息
    this.userConfig = DB.get('userConfig') || {
      user: '',
      pwd: ''
    }
  };

  // 监视状态
  @observable state = {
    isLoaded: false,
    routerCfg: {},
    hookCbf: null,
    user: this.userConfig.user,
    pwd: this.userConfig.pwd
  };

  // 图片
  @observable imgs = [
    "http://img1.imgtn.bdimg.com/it/u=584196861,3932531798&fm=26&gp=0.jpg",
    "http://img2.imgtn.bdimg.com/it/u=623024987,4234267555&fm=26&gp=0.jpg",
    "http://img0.imgtn.bdimg.com/it/u=2265325745,3584196461&fm=26&gp=0.jpg",
    "http://img1.imgtn.bdimg.com/it/u=2141357569,1512480108&fm=26&gp=0.jpg",
    "http://img1.imgtn.bdimg.com/it/u=584196861,3932531798&fm=26&gp=0.jpg",
    "http://img2.imgtn.bdimg.com/it/u=623024987,4234267555&fm=26&gp=0.jpg",
    "http://img0.imgtn.bdimg.com/it/u=2265325745,3584196461&fm=26&gp=0.jpg",
    "http://img1.imgtn.bdimg.com/it/u=2141357569,1512480108&fm=26&gp=0.jpg",
    "http://img0.imgtn.bdimg.com/it/u=2265325745,3584196461&fm=26&gp=0.jpg",
    "http://img1.imgtn.bdimg.com/it/u=2141357569,1512480108&fm=26&gp=0.jpg",
  ]


  // 设置路由配置
  @action setRouterCfg = async () => {
    // 请求路由表
    // let res = await getRouterTable();
    // 设置到状态机 - 如果是异步，必须在runInAction
    runInAction(() => {
      this.state.isLoaded = true;
      // this.state.routerCfg = res.data.list;
    });
    // 监控数据变化的回调,读取什么参数，即代表将要监控什么数据
    autorun(() => {
      // console.info("router table is isLoaded: ", this.state.isLoaded);
    })
  }

  @action hideLoading = async () => {
    runInAction(() => {
      this.state.isLoaded = true;
    });
  }

  // 设置页签标题等内容
  @action setTabsInfo = (titleObj) => {
    let k = keys(titleObj)[0];
    runInAction(() => {
      this.state.routerCfg[k] = titleObj[k];
    });
  }

  /**
	 * 全局保持用户名和密码
	 *
	   @param {object} { user, pwd } 用户名，密码
	 * @memberof HomeMod
	 */
  @action.bound saveUserInfo({ user, pwd }) {
    DB.set('userConfig', {
      user, pwd
    })
    runInAction(() => {
      this.state.user = user || this.state.user
      this.state.pwd = pwd || this.state.pwd
    })
  }

  /**
   * 判断用户是否登陆
   *
   * @memberof AppStore
   */
  isLogin() {
    const { user, pwd } = this.state
    return user && pwd
  }
}

const appStore = new AppStore();
export default appStore;
export { AppStore };