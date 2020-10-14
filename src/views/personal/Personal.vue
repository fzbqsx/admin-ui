<template>
  <div>
    <h1>个人中心</h1>
    <div>
      <router-link class="routerLink" style="font-size: 18px" to="/PersonalHome" >个人主页</router-link>
      <router-link class="routerLink" style="font-size: 20px;" to="/ToOrders">礼品发货  <span style="color: #0033FF"> > </span></router-link>
      <router-link class="routerLink" to="/FinancialDetails" >资金明细</router-link>
      <router-link class="routerLink" to="/PriceList" >价格列表</router-link>
      <router-link class="routerLink" to="/OrderManage" >订单管理</router-link>
      <router-link class="routerLink" to="/Popularize" >推广中心</router-link>
      <router-link class="routerLink" to="/Deposit" >申请提现</router-link>
    </div>
    <div>
      <router-view style="height: auto" />
    </div>
  </div>
</template>

<script>
export default {
name: "Personal"
}
</script>

<style scoped>

</style>