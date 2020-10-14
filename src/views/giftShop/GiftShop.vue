<template>
  <div>
    <h1>礼品商城</h1>
    <router-link to="/ToOrders">去下单</router-link>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "GiftShop"
}
</script>

<style scoped>

</style>