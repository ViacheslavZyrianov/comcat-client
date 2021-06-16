import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const context = require.context('./')
const modules = {}

context.keys().forEach((file) => {
  const moduleName = file.replace(/(\.\/|\/index\.js$)/g, '')
  modules[moduleName] = context(file).default || context(file)
  modules[moduleName].namespaced = true
})

const store = new Vuex.Store({
  modules
})

export default store
