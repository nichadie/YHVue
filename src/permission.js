import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { initMenus } from '@/utils/menu'
import config from '@/config/config'


NProgress.configure({ showSpinner: false }) // NProgress配置
const whiteList = ['/login'] // 可以直接进入的路由白名单

// 全局前置守卫钩子函数
router.beforeEach(async (to, from, next) => {
  //console.log("当前要跳转的路由", to.path);
  // 启动加载进度条
  NProgress.start()
  // 获取页面标题
  document.title = getPageTitle(to.meta.title)
  // 获取token
  const hasToken = config.getToken()
  //如果有token
  if (hasToken) {
    if (to.path != "/login") {
      initMenus(router, store);
    }
    next();
    NProgress.done()  //进度条关闭
  } else {
    // 免费路由白名单中直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // next();
      Message.warning("非法操作，请先登录用户再进入系统！");
      // // 没有访问权限的其他页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

//全局后置钩子函数
router.afterEach(() => {
  NProgress.done()
})
