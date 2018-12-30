<template>
    <div>
      <v-toolbar color="teal lighten-3">
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        >
        
        </v-toolbar-side-icon>

        <v-toolbar-title>Chat</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>favorite</v-icon>
        </v-btn>
      </v-toolbar>

    <!-- Navigation-Drawer part -->
      <v-navigation-drawer
      v-model="drawer"
      absolute
      
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon>person</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{userName}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        
        <v-divider></v-divider>

        <v-list-tile
          v-for="person in persons"
          :key="person.user"
          @click="selectUser(person.user)"
        >

          <v-list-tile-action>
            <v-icon v-if="person.user!=toUser">person</v-icon>
            <v-icon v-if="person.user==toUser">done</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ person.user }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    </div>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        userName: this.$session.get('userName'),
        toUser : "",
        persons: []
      }
    },
    sockets:{
      USERS(data){
        this.persons=data
        
      }
    },
    methods:{
      selectUser(user){
        this.$store.commit('modifyUser',user)
        this.toUser=this.$store.getters.getToUser;
      }
    },
  }
</script>