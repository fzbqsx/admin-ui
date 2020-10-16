<!-- 顶部导航页面 -->
<template>
  <div class="bodyDiv1 bodyDiv2">


      <nav class="navbar navDiv" role="navigation" aria-label="main navigation" >
        <div class="navbar-brand">
          <a class="navbar-item" href="" >
            <img src="../../assets/logo_b.png" >
          </a>
          <a role="button"  class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="openMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu" style="justify-content: space-between">

          <router-link class="navbar-item" to="/Home">首页</router-link>

          <router-link class="navbar-item" to="/GiftShop">礼品商城</router-link>

          <router-link class="navbar-item" to="/Article">行业资讯</router-link>

          <router-link class="navbar-item" to="/Personal">个人中心</router-link>

          <!--        <div v-if="!tokenstr" v-show="menu" class="loginUserInfoBox" >-->
          <div v-if="!navShowDiv.tokenstr" class="headPortraitBox" @mouseenter="enter" @mouseleave="leave">
            <img src="../../assets/login/头像.png"/>
          </div>
          <!--        </div>-->
          <div v-else style="display: flex;align-items: center">
            <router-link to="/Login" class="navbar-item">登录</router-link>/
            <router-link to="/Register" class="navbar-item">注册</router-link>
          </div>
          <div class="operationBox" v-show="navShowDiv.outLogin">
            <span @click="outLoginButton">退出登录</span>
          </div>
        </div>

      </nav>

      <div  v-show="navShowDiv.menuitem" class="navbar-dropdown">
        <router-link v-show="navShowDiv.menuitem" class="menu-item" to="/Home">首页</router-link>

        <router-link v-show="navShowDiv.menuitem" class="menu-item" to="/GiftShop">礼品商城</router-link>

        <router-link v-show="navShowDiv.menuitem" class="menu-item" to="/Article">行业资讯</router-link>

        <router-link v-show="navShowDiv.menuitem" class="menu-item" to="/Personal">个人中心</router-link>

        <div v-if="!navShowDiv.tokenstr" class="menu-item menuOutLogin" v-show="navShowDiv.menuitem" >
          <span @click="outLoginButton">退出登录</span>
        </div>
        <div v-else v-show="navShowDiv.menuitem" class="menu-item">
          <router-link to="/Login" class="menu-item">登录</router-link>/
          <router-link to="/Register" class="menu-item">注册</router-link>
        </div>
      </div>




    <div class="contentDiv">
      <router-view style="height: auto" />
    </div>
  </div>
</template>

<script>
import { logout } from '../loginOrRegister/js/LoginOrRegister'
export default {
  name: "Navigation",
  data(){
    return {
      navShowDiv:{menu:true,tokenstr:false,outLogin:false,menuitem:true}
    }
  },
  methods:{
    loginstatus(){
      const token=localStorage.getItem('AUTH-TOKEN');
      if(token === undefined || token === null || token === "" ){
        this.navShowDiv.tokenstr=true;
      }else{
        this.navShowDiv.tokenstr=false;
      }
    },

    enter(){
      this.navShowDiv.outLogin=true;
    },
    leave(){
      setTimeout(() =>{
        this.navShowDiv.outLogin=false;
      },1500)
    },
    openMenu(){

    },
    outLoginButton(){
      logout({}).then(res=>{
        if("ok"===res.data.err){
          localStorage.removeItem('AUTH-TOKEN')
          sessionStorage.removeItem('AUTH-SESSION')
          this.$Message.success(res.data.message);
          this.$router.push({ name: "login" });
        }else{
          this.$Message.success(res.data.message);
        }
      })
    },
  },
  mounted() {
    this.loginstatus();
  }
}
</script>

<style scoped lang="sass">
@import "../global/css/global"
@import "css/Navigation"
</style>