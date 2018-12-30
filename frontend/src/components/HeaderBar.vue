<template>
    <v-layout row wrap>
        <v-toolbar color="teal lighten-3">
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Chat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>favorite</v-icon>
          </v-btn>
          <Menu></Menu>
        </v-toolbar>
        <Menu></Menu>
  </v-layout>
</template>

<script>
  import Menu from './Menu.vue'
  export default {
    components:{
        Menu,
    }
  }
</script>