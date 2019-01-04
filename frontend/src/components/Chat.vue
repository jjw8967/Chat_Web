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
    mounted(){
      this.socket.onopen = () =>{
        this.socket.send(JSON.stringify({
          direct : 'CONNECT',
          user:this.userName
        }));
      }
      
      window.onbeforeunload=()=>{
        this.socket.onopen = () =>{
          this.socket.send(JSON.stringify({
            direct : 'DISCONNECT',
            user:this.userName
          }))
        }
      }

      //scroll handle
      this.container = document.getElementById ( "scroll-target" )
      this.$options.sockets.onmessage = (data) =>{
        data = JSON.parse(data.data)
        switch(data.direct){
          case 'USERS':
            for(let i in data){
              this.messages[data[i].user]=[];
            }
            break;
          case 'MESSAGE':
            setTimeout(() => { this.container.scrollTop+=100
            },1);
            break;
          case 'RECEIVE_MESSAGE':
            this.messages[data.fromUser] = [...this.messages[data.fromUser],data];
            this.temp=this.messages;
            this.messages=null;
            this.messages=this.temp;
            break;
          case 'SENDED_MESSAGE' :
            this.messages[data.toUser] = [...this.messages[data.toUser],data];
            this.temp=this.messages;
            this.messages=null;
            this.messages=this.temp;
            break;

          case 'ALL_MESSAGE':
            this.messages['ALL'] = [...this.messages['ALL'],data];
            console.log(data)
            this.temp=this.messages;
            this.messages=null;
            this.messages=this.temp;
            break;

          case 'NOT_FOUND_USER':
            data['disconnect'] = true;
            this.messages[data.toUser] = [...this.messages[data.toUser],data];
            this.temp=this.messages;
            this.messages=null;
            this.messages=this.temp;
            break;
        }
      }
     
      
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