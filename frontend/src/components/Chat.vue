<template>
  <div class="mt-3" >
      <v-layout row wrap justify-center>
          <v-card id="chatBox" height="500" width="800">
              <h2>Room</h2>
              <v-list>
              <div
                
                v-for="m in messages"
                :key ="m.date"
              >
              <v-list-tile>
                <v-list-tile-action>  
                  <span v-if="m.other===false">me</span>
                  <span v-if="m.other===true">{{m.user}}</span>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{m.message}}</v-list-tile-title>
                  
                </v-list-tile-content>
                
                <v-list-tile-content>
                  <p v-if="m.connect==true" 
                  style="text-align:center;">{{m.user}} connected</p>
                  <p v-if="m.disconnect==true" 
                  style="text-align:center;">{{m.user}} disconnected</p>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider inset></v-divider>
              </div>
             </v-list>
          </v-card>
      </v-layout>
      <Message></Message>
      
      
      
  </div>
</template>

<script>
import Message from './Message.vue'
  
  export default {
    data:function(){
      return{
        messages: [],
        socket : this.$socket,
        userName: this.$session.get('userName'),
      }
    },
    components:{
        Message,
    },
    sockets:{
      CONNECTED(data){
        this.messages = [...this.messages,data];
      },

      RECEIVE_MESSAGE(data){
        if(data.user==this.userName) data['other'] =false
        else data['other'] =true
        this.messages = [...this.messages,data];
      },
      DISCONNECT(data){
        data['disconnect'] = true;
        this.messages = [...this.messages,data];
      }

    },
    mounted(){
      this.socket.emit('CONNECT',{
        user:this.userName
      });
      window.onbeforeunload=()=>{
        this.socket.emit('DISCONNECT',{
          user:this.userName
        })
      }
    }
  }
</script>
<style>
input{
  border-color: gray;
  border-style: solid;
}
form{
  text-align:center;
}
</style>