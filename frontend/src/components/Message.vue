<template>
    <v-layout row wrap justify-center>
        <v-card width="800">
            <v-text-field
                height='70'
                v-model="message"
                :append-icon="'send'"
                box
                clear-icon="clear"
                clearable
                type="text"
                @click:append="sendMessage"
                @keyup.enter="sendMessage()"
                @click:clear="message=''"
            ></v-text-field>
        </v-card>
    </v-layout>
  
</template>

<script>
  export default {
    data(){
      return{
        userName : this.$session.get('userName'),
        message: '',
      }
    },
    methods: {
      sendMessage() {
        this.$socket.emit('SEND_MESSAGE', {
            fromUser: this.userName,
            message: this.message,
            toUser: this.$store.getters.getToUser,
            date : new Date
        });
        this.message=''
      },
    },
  }
</script>