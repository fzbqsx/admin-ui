<template>
  <div class="bodyDiv1 bodyDiv2 bodyDiv3">
    <div class="loginDiv ">
      <div  :style="{width: divWidth + 'px' }" class="imgDiv ">
        <router-link to="/Home" class="routerLink">
          <img src="../../assets/login/组 5610.png"/>
          返回首页
        </router-link>
        <img src="../../assets/login/蒙版组 6.png" width="100%"/>
      </div>
      <div :style="{width: divWidth + 'px' }" class="loginFromDiv ">
        <div class="loginInfoDiv">
          <p>欢迎来到发货宝</p>
          <p>我们提供礼品采购、真实发货一站式快递服务。</p>
          <div class="loginInfo">
            <!-- 用户名登录 -->
            <div v-show="loginDivShow.userLoginDivShow">
              <p class="control has-icons-left">
                <input v-model="loginInfo.loginUserName" class="input userLoginInput" type="text" placeholder="用户名">
                <img class="icon is-left" style="height: 24px; width: 24px;margin: 8px" src="../../assets/login/路径 4304.png"/>
              </p>
                <form class="control has-icons-left">
                  <input v-model="loginInfo.loginPassword" class="input userLoginInput" type="password" placeholder="密码">
                  <img class="icon is-left" style="height: 24px; width: 24px;margin: 8px" src="../../assets/login/组 5609.png"/>
                </form>
            </div>

            <!-- 验证码登录 -->
            <div v-show="loginDivShow.phoneCodeDivShow" style="margin-top: 14px">
              <p class="control has-icons-left">
                <input v-model="loginInfo.loginPhone" class="input userLoginInput" type="text" placeholder="手机号码">
                <img class="icon is-left" style="height: 24px; width: 24px;margin: 8px" src="../../assets/login/组 5607.png"/>
              </p>
              <p class="control has-icons-left">
                <input v-model="loginInfo.code" class="input userLoginInput codeInput" type="text" placeholder="验证码">
                <img class="icon is-left" style="height: 24px; width: 24px;margin: 8px" src="../../assets/login/路径 4301.png"/>
                <button @click="getCaptcha" class="button getCodeButton" :disabled="captchaButton.flag" ref="buttonbBackground" >{{captchaButton.content}}</button>
              </p>
            </div>

            <p v-show="loginDivShow.loginTypeOrUpdatePassword" class="loginTypeOrUpdatePassword">
              <span @click="cutLoginType">{{loginInfo.cutLoginTypeInfo}}</span>
              <span @click="updatePassword">忘记密码？</span>
            </p>
            <div v-show="loginDivShow.longinBottonShow" class="buttonDiv">
              <button @click="toLogin" class="button loginInfoButton">登录</button>
              <button  class="button loginInfoButton">注册</button>
            </div>
            <div v-show="loginDivShow.updatePasswordBottonShow" class="buttonDiv">
              <button @click="toLoginButton" class="button loginInfoButton">登录</button>
              <button class="button loginInfoButton">确认重置</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { login } from './js/LoginOrRegister'
import {AUTH_TOKEN,AUTH_SESSION} from "@/store/mutation-type";
import {mapActions, } from "vuex";
export default {
  name: "Login",
  data (){
    return{
      divWidth:innerWidth*0.7*0.49, //imgDiv默认宽度为loginDiv的50%(乘以0.5会超出范围而导致换行，因此乘以0.49) （innerWidth*0.7为loginDiv的宽度，innerWidth为屏幕宽度）
      loginInfo:{loginUserName:"", loginPassword:"", loginPhone:"", code:"", cutLoginTypeInfo:"验证码登录"},
      captchaButton: {flag: false, content: "获取验证码", totalTime: 60},
      loginDivShow:{userLoginDivShow:true,phoneCodeDivShow:false,loginTypeOrUpdatePassword:true, longinBottonShow:true, updatePasswordBottonShow:false},


    }
  },
  methods:{
    ...mapActions({
      login: AUTH_TOKEN,
      userInfo: AUTH_SESSION
    }),

    resetData(){//重置数据
      this.loginInfo.loginUserName="";
      this.loginInfo.loginPassword="";
      this.loginInfo.loginPhone="";
      this.loginInfo.code="";
    },

    cutLoginType(){//切换登录方式
      // this.resetData();
      if(this.loginDivShow.userLoginDivShow){
        this.loginDivShow.userLoginDivShow=false;
        this.loginDivShow.phoneCodeDivShow=true;
        this.loginInfo.cutLoginTypeInfo="用户名登录";
      }else{
        this.loginDivShow.userLoginDivShow=true;
        this.loginDivShow.phoneCodeDivShow=false;
        this.loginInfo.cutLoginTypeInfo="验证码登录";
      }
    },

    updatePassword(){
      // this.resetData();
      this.captchaButton.flag = false;
      this.loginDivShow.userLoginDivShow=true;
      this.loginDivShow.phoneCodeDivShow=true;
      if(this.loginDivShow.loginTypeOrUpdatePassword){
        this.loginDivShow.loginTypeOrUpdatePassword=false;
      }else {
        this.loginDivShow.loginTypeOrUpdatePassword=true;
      }
      if(this.loginDivShow.longinBottonShow){
        this.loginDivShow.updatePasswordBottonShow=true
        this.loginDivShow.longinBottonShow=false;
      }else{
        this.loginDivShow.updatePasswordBottonShow=false
        this.loginDivShow.longinBottonShow=true;
      }
    },

    toLoginButton(){
      this.resetData();
      this.loginDivShow.userLoginDivShow=true;
      this.loginDivShow.phoneCodeDivShow=false;
      this.loginInfo.cutLoginTypeInfo="验证码登录";
      this.loginDivShow.loginTypeOrUpdatePassword=true;
      this.loginDivShow.longinBottonShow=true;
      this.loginDivShow.updatePasswordBottonShow=false
    },


    //获取验证码按钮
    getCaptcha() {
      // if(this.verifyPhone() === false){
      //   return
      // }

      this.captchaButton.flag = true; //点击之后设置按钮不可取
      this.$refs.buttonbBackground.style.background = "#BBBBBB"; //点击按钮后该改变背景色
      this.captchaButton.content = this.captchaButton.totalTime + "s后重新发送"; //按钮内文本
      // getCaptchas({phone: this.loginInfo.phone}).then(res=>{//获取接口数据
      //   if("ok"==res.err){
      //     this.$Message.success("验证码发送成功")
      //   }
      // })
      let clock = window.setInterval(() => {
        this.captchaButton.totalTime--;
        this.captchaButton.content = this.captchaButton.totalTime + "s后重新发送";
        if (this.captchaButton.totalTime < 1) {
          window.clearInterval(clock);
          this.captchaButton.content = "重新发送验证码";
          this.captchaButton.totalTime = 60;
          this.captchaButton.flag = false; //这里重新开启
          this.$refs.buttonbBackground.style.background = "#0033FF";
        }
      }, 1000);
    },

    verifyPhone(){
      if(!this.loginInfo.loginPhone){
        this.$Message.error("手机号码不能为空")
        return false;
      }else{
        var phoneRegular = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(!phoneRegular.test(this.loginInfo.loginPhone)){
          this.$Message.error("请正确填写手机号码")
          return false;
        }else{
          return true;
        }
      }
    },

    verifyData(){//输入框数据校验
      if(this.loginDivShow.userLoginDivShow){
        if(!this.loginInfo.loginUserName){
          this.$Message.error("用户名不能为空！")
          return false;
        }
        if(!this.loginInfo.loginPassword){
          this.$Message.error("密码不能为空！")
          return false;
        }
        return true;
      }
      if(this.loginDivShow.phoneCodeDivShow){
        if(this.verifyPhone() === false){
          return false;
        }
        if(!this.loginInfo.code){
          this.$Message.error("验证码不能为空！")
          return false;
        }
        return true;
      }
    },

    toLogin(){
      if(this.verifyData() === false){
        return;
      }
      const params = {account: "", password: "", phone: "", code: ""};
      if(this.loginDivShow.userLoginDivShow){
        params.account=this.loginInfo.loginUserName;
        params.password=this.loginInfo.loginPassword;
      }
      if(this.loginDivShow.phoneCodeDivShow){
        params.phone=this.loginInfo.loginPhone;
        params.code=this.loginInfo.code;
      }

      this.login(params).then( res => {
        if(200 === res.status && "ok" === res.data.err){
          const redirect = this.$route.query.redirect;
          if(redirect){
            this.$router.push({ path: redirect })
          }else{
            this.$router.push({ name: "home" })
          }
          this.$Message.success("登录成功")
          this.userInfo()
        }else{
          this.$Message.error(res.data.message)
        }
      })
    },

    changeMargin() {
      //刷新页面是获取屏幕宽度
      if(innerWidth<=800){//当屏幕宽度小于800时，imgDiv宽度为loginDiv的80%
        this.divWidth=innerWidth*0.7*0.8
      }else{
        this.divWidth=innerWidth*0.7*0.49
      }
      //屏幕宽度改变时监听事件
      addEventListener('resize', () => {
        if(innerWidth<=800){
          this.divWidth=innerWidth*0.7*0.8
        }else {
          this.divWidth=innerWidth*0.7*0.49
        }
      })
    }
  },
  mounted() {
    this.changeMargin()

  }
}
</script>

<style scoped lang="sass">
@import "../global/css/global"
@import "./css/Login"
</style>