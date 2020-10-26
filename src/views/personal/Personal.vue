<template>
  <div class="bodyDiv1 bodyDiv2">
    <div class="personalBox columns">
      <div class="routerLinkDiv column">
        <router-link to="/PersonalHome">个人主页</router-link>
        <hr/>
        <router-link class="toOrders" to="/ToOrders"><img src="@/assets/personal/路径 416.png"/>礼品发货<span> > </span></router-link>
        <hr/>
        <router-link to="/FinancialDetails">资金明细</router-link>
        <router-link to="/PriceList">价格列表</router-link>
        <router-link to="/OrderManage">订单管理</router-link>
        <router-link to="/Popularize">推广中心</router-link>
        <router-link to="/Deposit">申请提现</router-link>
        <router-link style="display:none" to="/OrderDetails"></router-link>
      </div>
      <div class="contentBox column">
        <router-view style="height: auto" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Personal"
}
</script>

<style scoped lang="sass">
@import "../global/css/global"
@import './css/personal.sass'
</style>