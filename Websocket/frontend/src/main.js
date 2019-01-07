import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, 'ws://localhost:40510',{
  reconnection: true,
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
