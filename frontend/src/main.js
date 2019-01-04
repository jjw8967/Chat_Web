import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import VueSession from 'vue-session'
import Vuex from 'vuex'
import vuescroll from 'vue-scroll'

import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, 'ws://localhost:40510',{
  reconnection: true,
})

Vue.use(vuescroll)
Vue.use(VueSession)
Vue.use(Vuex);



const store = new Vuex.Store({
  state: {
    toUser: "ALL",
    
  },
  getters:{
    getToUser: state => {
      return state.toUser
    }
  },
  mutations: {
    modifyUser (state, user) {
      state.toUser = user
    },

  }
});


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
