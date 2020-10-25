<template>
  <div class="bodyDiv1 bodyDiv2 bodyDiv3">
    <div class="loginDiv">
      <div  :style="{width: divWidth + 'px' }" class="imgDiv ">
        <router-link to="/Home" class="routerLink">
          <img src="@/assets/login/组 5610.png"/>
          返回首页
        </router-link>
        <img src="@/assets/login/蒙版组 6.png" width="100%"/>
      </div>
      <div :style="{width: divWidth + 'px' }" class="loginFromDiv ">
        <div class="loginInfoDiv">
          <p class="loginTitle1">欢迎来到发货宝</p>
          <p class="loginTitle2">我们提供礼品采购、真实发货一站式快递服务。</p>
          <div class="loginInfo">
            <div>
              <p class="control has-icons-left">
                <input v-model="registerInfo.account" class="input userLoginInput" type="text" placeholder="账号">
                <img class="icon is-left" style="height: 24px; width: 24px; margin: 8px" src="@/assets/login/路径 4304.png"/>
              </p>
              <p class="control has-icons-left">
                <input v-model="registerInfo.unserName" class="input userLoginInput" type="text" placeholder="姓名">
                <img class="icon is-left" style="height: 24px; width: 24px; margin: 8px" src="@/assets/login/姓名.png"/>
              </p>
              <p class="control has-icons-left">
                <input v-model="registerInfo.password" class="input userLoginInput" type="password" placeholder="密码">
                <img class="icon is-left" style="height: 24px; width: 24px;margin: 8px" src="@/assets/login/组 5609.png"/>
              </p>
              <p class="control has-icons-left">
                <input v-model="registerInfo.phone" class="input userLoginInput" @blur="verifyPhone" type="tel" placeholder="手机号码">
                <img class="icon is-left" style="height: 24px; width: 24px;margin: 8px" src="@/assets/login/组 5607.png"/>
              </p>
              <p class="control has-icons-left">
                <input v-model="registerInfo.email" class="input userLoginInput" @blur="verifyEmail" type="text" placeholder="电子邮箱">
                <img class="icon is-left" style="height: 24px; width: 24px; margin: 8px" src="@/assets/login/邮箱.png"/>
              </p>
              <div class="radioDiv">
                <img class="icon is-left" style="height: 24px; width: 24px; margin: 8px " src="@/assets/login/性别.png"/>
                <RadioGroup v-model="registerInfo.sex" class="radio" size="large">
                  <Radio label="1" ><span>男</span></Radio>
                  <Radio label="0"><span>女</span></Radio>
                </RadioGroup>
              </div>
              <p class="control has-icons-left">
                <input v-model="registerInfo.referralCode" class="input userLoginInput" type="text" placeholder="邀请码">
                <img class="icon is-left" style="height: 24px; width: 24px;margin: 8px" src="@/assets/login/邀请码.png"/>
              </p>
            </div>
            <div class="buttonsDiv">
              <button @click="toLogin" class="button _button">登录</button>
              <button @click="OkRegister" class="button _button">确认注册</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userRegister} from './js/register'
export default {
  name: "Register",
  data (){
    return{
      divWidth:innerWidth*0.7*0.49, //imgDiv默认宽度为loginDiv的50%(乘以0.5会超出范围而导致换行，因此乘以0.49) （innerWidth*0.7为loginDiv的宽度，innerWidth为屏幕宽度）
      registerInfo:{headPortrait:"@/assets/login/头像.png",account:"",unserName:"",password:"",email:"",sex:"",phone:"",referralCode:this.$route.query.spreadCode },

    }
  },
  methods:{
    toLogin(){
      this.registerInfo={headPortrait:"@/assets/login/头像.png",account:"",unserName:"",password:"",email:"",sex:"",phone:"",code:"",referralCode:this.$route.query.spreadCode };
      this.$router.push({name: "login" });
    },

    verifyPhone(){//手机号码验证
      if(!this.registerInfo.phone){
        this.$Message.error("手机号码不能为空")
        return false;
      }else{
        var phoneRegular = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(!phoneRegular.test(this.registerInfo.phone)){
          this.$Message.error("请正确填写手机号码")
          return false;
        }else{
          return true;
        }
      }
    },
    verifyEmail(){//邮箱验证
      if(!this.registerInfo.email){
        this.$Message.error("电子邮箱不能为空")
        return false;
      }else{
        var emailRegular =/^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if(!emailRegular.test(this.registerInfo.email)){
          this.$Message.error("请正确格式填写电子邮箱")
          return false;
        }else{
          return true;
        }
      }
    },
    OkRegister(){//确认注册
      if(!this.registerInfo.account){
        this.$Message.error("请填写账号")
        return;
      }
      if(!this.registerInfo.unserName){
        this.$Message.error("请填写姓名")
        return;
      }
      if(!this.registerInfo.password){
        this.$Message.error("请填写密码")
        return;
      }
      if(this.verifyPhone() !== true){
        return;
      }
      if(this.verifyEmail() !== true){
        return;
      }
      if(!this.registerInfo.sex){
        this.$Message.error("请选择性别")
        return;
      }

      userRegister(
        {phone:this.registerInfo.phone,
        gender:this.registerInfo.sex,
        password:this.registerInfo.password,
        email:this.registerInfo.email,
        avatar:this.registerInfo.headPortrait,
        name:this.registerInfo.unserName,
        referralCode:this.registerInfo.referralCode,
        //code:this.registerInfo.code,
        account:this.registerInfo.account}).then(res => {
        if("ok"===res.err){
          this.$Message.success("注册成功！")
          this.$router.push({name: "login" });
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
@import "css/login"
</style>