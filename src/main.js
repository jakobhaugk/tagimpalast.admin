import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import VueSocketIO from 'vue-socket.io'
import App from './App.vue'

const io = require('socket.io-client')

Vue.config.productionTip = false

const host = process.env.VUE_APP_API_ENDPOINT

const ioConnection = io(host, {
  withCredentials: false
})

Vue.use(VueHead)
Vue.use(VueRouter)
Vue.use(new VueSocketIO({
  debug: !Vue.config.productionTip,
  connection: ioConnection,
}))

Vue.prototype.$host = host

import PageEditor from './pages/PageEditor'
import Index from './pages/Index'
import Chat from './pages/Chat'

const routes = [
  { path: '/chat', component: Chat },
  { path: '/:slug', component: PageEditor, props: true },
  { path: '/new', component: PageEditor, props: { new: true } },
  { path: '/', component: Index },
]

const router = new VueRouter({ routes })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
