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
            <v-badge
            color="green">
              <v-icon v-if="person.user!=toUser">person</v-icon>
              <v-icon v-if="person.user==toUser">done</v-icon>
            <span slot="badge">{{badges[person.user]}}</span>
            </v-badge>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ person.user }}</v-list-tile-title>
          </v-list-tile-content>
          
          
       
        </v-list-tile>

        <!-- send Message to All -->
        <v-list-tile @click="selectUser('ALL')" v-if="$session.exists()">
          <v-list-tile-action>
            <v-badge
            color="green">
              <v-icon v-if="'ALL'!=toUser">cloud</v-icon>
              <v-icon v-if="'ALL'==toUser">done</v-icon>
              <span slot="badge">{{badges['ALL']}}</span>
            </v-badge>
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

        <v-list-tile @click="drawer=!drawer">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>CLOSE</v-list-tile-title>
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
        drawer: false,
        userName: this.$session.get('userName'),
        toUser : this.$store.getters.getToUser,
        badges: [],
        persons: [],
        temp: null,
      }
    },
    sockets:{
      // Initialize User
      USERS(data){
        this.persons=data
        for(let i in data)  this.badges[data[i].user]= 0;
        this.badges['ALL'] = 0;

        
      },
      // Count unreaded messages
      COUNT_MESSAGE(fromUser){
        if(this.toUser==fromUser) return;
        this.badges[fromUser] += 1;
        this.temp = this.badges;
        this.badges = null;
        this.badges = this.temp;

      },
      
    },
    methods:{
      selectUser(user){
        this.$store.commit('modifyUser',user)
        this.toUser=this.$store.getters.getToUser;
        this.badges[this.toUser]=0;
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