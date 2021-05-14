import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueHead)
Vue.use(VueRouter)

import PageEditor from './pages/PageEditor'
import Index from './pages/Index'

const routes = [
  { path: '/:slug', component: PageEditor, props: true },
  { path: '/new', component: PageEditor, props: { new: true } },
  { path: '/', component: Index },
]

const router = new VueRouter({ routes })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
