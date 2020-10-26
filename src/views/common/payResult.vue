<template>
    <div class="payResultDiv">
      <div class="payResultBody">
        <h1>支付成功</h1>
        <div class="payResultButtonDiv">
          <button class="button payResultButton" @click="toHome">返回首页</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
name: "payResult",
  data(){
    return{

    }
  },
  methods:{
    toHome(){
      this.$router.push({name : 'home'})
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.payResultDiv{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.payResultBody{
  width: 100px;
  font-family: 'Source Han Sans CN';
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.payResultButton{
  border-radius:0;
  margin: 15px;
  font-family: 'Source Han Sans CN';
  font-size: 16px;
  color: #0033FF;
  border: 1px solid  #0033FF;
}

.payResultButtonDiv :hover{
  background-color:#0033FF;
  color: #FFFFFF;
}
</style>