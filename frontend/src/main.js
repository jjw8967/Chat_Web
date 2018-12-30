import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import VueSession from 'vue-session'
Vue.use(VueSession)

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:8000',
}))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
