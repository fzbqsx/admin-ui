<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {AUTH_TOKEN,AUTH_SESSION} from "@/store/mutation-type";
import {mapActions,mapMutations} from "vuex";
// import {TOKEN_KEY} from "@/global";

// import router from "./router";

export default {
  methods:{
    ...mapActions({
      userInfo: AUTH_SESSION
    }),
    ...mapMutations({
      extractToken: AUTH_TOKEN
    })
  },

  mounted() {
    const token = localStorage.getItem('AUTH-TOKEN');
    if(token){
      this.extractToken(token);
      this.userInfo()
    }else{
      this.$router.push({ name: "login" })
    }
  }


}



</script>
<style>

</style>
