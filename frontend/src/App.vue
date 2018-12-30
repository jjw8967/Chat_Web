<template>
  <div id="app">
    <header-bar></header-bar>
    <Login v-if="!$session.exists()"></Login>
    <Chat v-if="$session.exists()"></Chat>
    <Footer></Footer>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import HeaderBar from './components/HeaderBar.vue'
import Footer from './components/Footer.vue'
import Chat from './components/Chat.vue'

export default {
  name: 'app',
  data(){
    return{    
      //
    }
  },
  components: {
    Login,
    HeaderBar,
    Footer,
    Chat,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
  background-color: #F5F5F5
}
</style>
