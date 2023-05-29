import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    routes: [],
  },
  // 改变state里面对应值的方法，同步执行
  mutations: {
    initRoutes(state, data) {
      state.routes = data;
    },
    clearRoutes(state) {
      if (state.routes.length > 0)
        state.routes = [];
    },
  },
  // 改变state里面对应值的方法，异步执行
  actions: {

  },
  modules: {
    app,
    settings,
    user,
    tagsView
  },
  getters
})

export default store

// // https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.js$/)

// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})

// const store = new Vuex.Store({
//   modules,
//   getters
// })

// export default store
