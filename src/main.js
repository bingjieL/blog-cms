// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import App from './App'
import router from './router'
import store from './store'
import CommonMixins from '@/mixins/common.js'

import './permission'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import '@/assets/style/common.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'medium' })
Vue.use(VueQuillEditor)
Vue.mixin(CommonMixins)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
