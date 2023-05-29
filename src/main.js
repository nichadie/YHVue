import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// ElementUI导入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//全局css
import '@/styles/index.scss' // global css
import '@/styles/vuestyle.css'
//font-awesome样式导入
import 'font-awesome/css/font-awesome.min.css'

import App from './App'
import store from './store'
import router from './router'


import '@/icons' // icon
import '@/permission' // permission control


import request from "@/utils/request"

import { baseApiUrl, cosImageUrl, cosVideoUrl, webUrl } from '@/utils/variate'
Vue.prototype.$baseApiUrl = baseApiUrl;
Vue.prototype.$cosImageUrl = cosImageUrl;
Vue.prototype.$cosVideoUrl = cosVideoUrl;
Vue.prototype.$webUrl = webUrl;

// 全局变量
import global from '@/global/global.js'
Vue.prototype.$global = global
import { hasPermission} from '@/utils/auth/permission.js'
Vue.prototype.hasPermission = hasPermission;
// 配置文件，本地存储
import config from '@/config/config.js'
Vue.prototype.$config = config;

// 导入过滤器，全局注册过滤器
import * as filters from './utils/filter.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})

Vue.use(ElementUI)
Vue.prototype.request = request
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
