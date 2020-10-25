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
      <div id="navbarBasicExample" class="navbar-menu navbar-menu-div" >

        <router-link class="navbar-item" to="/Home">首页</router-link>

        <router-link class="navbar-item" to="/GiftShop">礼品商城</router-link>

        <router-link class="navbar-item" to="/Article">行业资讯</router-link>

        <router-link class="navbar-item" to="/Personal">个人中心</router-link>

        <div v-if="!navShowDiv.tokenstr" class="headPortraitBox" @mouseenter="enter" @mouseleave="leave">
          <img src="../../assets/login/头像.png"/>
        </div>
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
      <router-link v-show="navShowDiv.menuitem" class="navbar-item" to="/Home">首页</router-link>

      <router-link v-show="navShowDiv.menuitem" class="navbar-item" to="/GiftShop">礼品商城</router-link>

      <router-link v-show="navShowDiv.menuitem" class="navbar-item" to="/Article">行业资讯</router-link>

      <router-link v-show="navShowDiv.menuitem" class="navbar-item" to="/Personal">个人中心</router-link>

      <div v-if="!navShowDiv.tokenstr"  v-show="navShowDiv.menuitem" class="outLoginDiv">
        <span @click="outLoginButton" class="navbar-item">退出登录</span>
      </div>
      <div v-else v-show="navShowDiv.menuitem" >
        <router-link to="/Login" class="navbar-item">登录</router-link>
        <router-link to="/Register" class="navbar-item">注册</router-link>
      </div>
    </div>
    <router-view class="contentDiv" />
    <footer class="footerBox">
      <div class="footer_box columns">
        <div class="aloneItem column">
          <p>友情链接</p>
          <img v-for="item in footerDataL.blogrollimg" v-bind:key="item.id" :src="$imgurl(item.option)"/>
          <p class="qsp" v-for="item in footerDataL.blogrollp " v-bind:key="item.id">{{item.option}}</p>
        </div>
        <div class="aloneItem column" >
          <p>常见问题</p>
          <p class="qsp" v-for="item in footerDataL.faq " v-bind:key="item.id">{{item.option}}</p>
        </div>
        <div class="aloneItem column">
          <p>技术支持</p>
          <p class="qsp" v-for="item in footerDataL.technicalsupport " v-bind:key="item.id">{{item.option}}</p>
        </div>
        <div class="imgItem column">
          <img :src="$imgurl(footerDataL.qrcodeUrl)" />
        </div>
      </div>
      <hr class="hr"/>
      <p class="qsp">{{footerDataL.copyright}}</p>
    </footer>

  </div>
</template>

<script>
import { logout } from '../loginOrRegister/js/login'
import {querySysConfig} from "./js/navigation";
import state from '@/store/index'
export default {
  name: "Navigation",
  data(){
    return {
      navShowDiv:{menu:true,tokenstr:false,outLogin:false,menuitem:false},
      footerDataL:{blogrollp:{},blogrollimg:{},faq:{},technicalsupport:{},qrcodeUrl:"",copyright:""}
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
      if(this.navShowDiv.menuitem){
        this.navShowDiv.menuitem=false;
      }else {
        this.navShowDiv.menuitem=true
      }
    },
    outLoginButton(){
      logout({}).then(res=>{
        if("ok"===res.data.err){
          localStorage.removeItem('AUTH-TOKEN')
          state.state.token="";
          state.state.session={};
          // sessionStorage.removeItem('AUTH-SESSION')
          this.$Message.success(res.data.message);
          this.$router.push({ name: "login" });
        }else{
          this.$Message.success(res.data.message);
        }
      })
    },

    getSysConfig(){//获取底部系统参数
      querySysConfig(
      {sysName:'qrcode',
        query: {
          createTime: {
            sort: 'asc'
          }
        }
      }).then(res=>{
        if("ok"===res.err){
          this.footerDataL.qrcodeUrl=res.data[0].option;
        }
      });
      querySysConfig(
      {sysName:'copyright',
        query: {
          createTime: {
            sort: 'asc'
          }
        }
      }).then(res=>{
        if("ok"===res.err){
          this.footerDataL.copyright=res.data[0].option;
        }
      });
      querySysConfig(
      {sysName:'blogroll',
        query: {
          createTime: {
            sort: 'asc'
          }
        }
      }).then(res=>{
        if("ok"===res.err){
          const blogroll=res.data;
          var blogrolla = [];
          var blogrollb = [];
          blogroll.forEach(function (item) {
            if(0===item.type){
              blogrolla.push(item);
            }else{
              blogrollb.push(item);
            }
          })
          this.footerDataL.blogrollp=blogrolla;
          this.footerDataL.blogrollimg=blogrollb;

        }
      });
      querySysConfig(
      {sysName:'faq',
        query: {
          createTime: {
            sort: 'asc'
          }
        }
      }).then(res=>{
        if("ok"===res.err){
          this.footerDataL.faq=res.data;
        }
      });
      querySysConfig(
      {sysName:'technicalsupport',
        query: {
          createTime: {
            sort: 'asc'
          }
        }
      }).then(res=>{
        if("ok"===res.err){
          this.footerDataL.technicalsupport=res.data;
        }
      });
    },
  },
  mounted() {
    this.loginstatus();
    this.getSysConfig();
  }
}
</script>

<style scoped lang="sass">
@import "../global/css/global"
@import "css/navigation"
</style>