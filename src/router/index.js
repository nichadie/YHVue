import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import VueRouter from 'vue-router'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */


const routes = [
  // 默认地址
  {
    path: '/',
    redirect: '/login',
    meta: {
      hidden: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/Index'),
    meta: {
      hidden: true
    }
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/index',
    name: 'Index',
    redirect: '/index/home',
    component: Layout,
    hidden: false,
    meta: {
      title: '工作台',
      icon: 'fa fa-home'
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/Index.vue'),
        hidden: false,
        meta: {
          title: "后台首页",
          affix: true
        },
        children: [] //不存在children属性，此时会作为一级目录展示
      }

    ]
  }
  ,

 
]

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
