<template>
  <div class="bodyDiv1 bodyDiv2">
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
            <input class="input" type="text" placeholder="Text input">
            <input class="input" type="text" placeholder="Text input">
            <input class="input" type="text" placeholder="Text input">
            <input class="input" type="text" placeholder="Text input">
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data (){
    return{
      divWidth:innerWidth*0.7*0.5, //imgDiv默认宽度为loginDiv的50% （innerWidth*0.7为loginDiv的宽度，innerWidth为屏幕宽度）
    }
  },
  methods:{
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
@import "css/Login"
</style>