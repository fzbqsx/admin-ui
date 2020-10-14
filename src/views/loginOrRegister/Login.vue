<template>
  <div class="loginDiv">
    <h1>登录</h1>
    <router-link to="/Home">首页</router-link>
    <router-link to="/Register">注册</router-link>
    <router-view></router-view>


  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped lang="sass">
@import "../global/css/global"
@import "css/Login"
</style>