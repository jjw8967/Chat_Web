<template>
  <div>
    <v-container >
        <v-layout row justify-center class="text-xs-center">
          <v-card flat height="400" width="400" class="pa-3" color="">
            <v-card-title primary-title>
              <h2>Login</h2>
            </v-card-title>
            <v-form @submit="login()">
              <v-text-field 
              maxlength="15"
              prepend-icon="person" autofocus v-model="userName" label="Username"></v-text-field>
           
              <v-card-actions>
                <v-btn primary large block @click="login()" >Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
export default{
    data(){
        return{
            userName : "",
        }
    },
    methods:{
        login(){
            this.$session.start()
            this.$session.set('userName',this.userName);
            window.location.reload()   
        }
    },
    directives: {
      focus: {
        // 디렉티브 정의
        inserted: function (el) {
          el.focus()
        }
      }
    }
}
</script>