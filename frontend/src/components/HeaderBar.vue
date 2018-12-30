<template>
    <div>
      <v-toolbar color="teal lighten-3">
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        >
        
        </v-toolbar-side-icon>

        <v-toolbar-title>Chat</v-toolbar-title>
        <v-spacer></v-spacer>
        
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

        <!-- send Message to All -->
        <v-list-tile @click="selectUser('ALL')" v-if="$session.exists()">
          <v-list-tile-action>
            <v-icon v-if="'ALL'!=toUser">cloud</v-icon>
            <v-icon v-if="'ALL'==toUser">done</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>ALL</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


        <!-- logout -->
        <v-list-tile @click="logout()" v-if="$session.exists()">
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>LOGOUT</v-list-tile-title>
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
      },
      logout(){
        this.$session.destroy()
        this.$socket.emit('DISCONNECT',{
          user:this.userName,
        })
        window.location.reload()
      }
    },
  }
</script>