<!-- 顶部导航页面 -->
<template>
  <div>
    <div>
      <router-link v-show="menu" class="navbar-item" to="/Home">首页</router-link>

      <router-link v-show="menu" class="navbar-item" to="/GiftShop">礼品商城</router-link>

      <router-link  v-show="menu" class="navbar-item" to="/Article">行业资讯</router-link>

      <router-link v-show="menu" class="navbar-item" to="/Personal">个人中心</router-link>
      <router-link v-show="menu" class="navbar-item" to="/Login">登录</router-link>
      <router-link v-show="menu" class="navbar-item" to="/Register">注册</router-link>
    </div>
    <div>
      <router-view style="height: auto" />
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data(){
    return {
      menu:true,
    }
  }
}
</script>

<style scoped>

</style>