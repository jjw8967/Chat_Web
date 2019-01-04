<template>
<div>
  <v-btn @click="add">click</v-btn>
</div>
</template>
  

<script>

export default {
  methods:{
    add(){
      console.log("Add emit")
      this.$socket.send(JSON.stringify({'a':1,'b':2}));
      
    }
  },
  mounted(){
    this.$options.sockets.onmessage = (data) =>{
      console.log(data)
    }
  }
}
</script>


