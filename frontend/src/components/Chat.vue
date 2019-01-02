<template>
  <div class="mt-3" >
    
   
      <v-layout row wrap justify-center>
          <v-card id="chatBox" height="500" width="800">
              <h2>{{$store.getters.getToUser}}</h2>
              

              <!-- Scroll handling -->
              <v-container
                id="scroll-target"
                style="max-height: 400px"
                class="scroll-y"
                overflow: auto
              >
              <v-layout
              v-scroll
              column
              align-center
              justify-center
              ></v-layout>
              <v-list>

              <div v-for="message in messages[$store.getters.getToUser]" 
              v-bind:key="message.date">
                <v-list-tile>
                  
                  <v-list-tile-action>  
                    <span v-if="userName===message.fromUser && !message.disconnect">me</span>
                    <span v-if="userName!==message.fromUser">{{message.fromUser}}</span>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <span v-if="!message.disconnect">{{message.message}}</span>
                    <span v-if="message.disconnect">{{message.toUser}}님이 방을 나가셨습니다. </span>
                  </v-list-tile-content>
                  
                  
                </v-list-tile>
                <v-divider inset></v-divider>
        
              </div>
              </v-list>
              </v-container>
             
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
        messages: {
          ALL:[]
        },
        temp:null,
        socket : this.$socket,
        userName: this.$session.get('userName'),
        container: null,
      }
    },
    components:{
        Message,
  
    },
    sockets:{
      USERS(data){
        
        for(let i in data){
          this.messages[data[i].user]=[];
        }
      },
      //All Message event handle
      MESSAGE(){
        setTimeout(() => { this.container.scrollTop+=100
        },1);
        
      },
      RECEIVE_MESSAGE(data){
        
        this.messages[data.fromUser] = [...this.messages[data.fromUser],data];
        this.temp=this.messages;
        this.messages=null;
        this.messages=this.temp;
        
      },
      SENDED_MESSAGE(data){
      
        this.messages[data.toUser] = [...this.messages[data.toUser],data];
        this.temp=this.messages;
        this.messages=null;
        this.messages=this.temp;
      },
      ALL_MESSAGE(data){
        this.messages['ALL'] = [...this.messages['ALL'],data];
        this.temp=this.messages;
        this.messages=null;
        this.messages=this.temp;
      },
      NOT_FOUND_USER(data){
        data['disconnect'] = true;
        this.messages[data.toUser] = [...this.messages[data.toUser],data];
        this.temp=this.messages;
        this.messages=null;
        this.messages=this.temp;
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

      //scroll handle
      this.container = document.getElementById ( "scroll-target" )
      
     
      
    },
    
    
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