<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <div class="headBox">
      <h1 class="headBox-left">战队晋级设置</h1>
    </div>
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
      <a-form-item label="青铜等级" >
          <a-input-number  v-model="input.bronze1" :min="0" :max="999" /> ~
          <a-input-number  v-model="input.bronze2" :min="1" :max="99999" />
        <span>分</span>
      </a-form-item>
      <a-form-item label="白银等级" >
          <a-input-number  v-model="input.silver1" :min="0" :max="999"  /> ~
          <a-input-number  v-model="input.silver2" :min="1" :max="99999" />
        <span>分</span>
      </a-form-item>
      <a-form-item label="黄金等级" >
          <a-input-number  v-model="input.gold1" :min="0" :max="999"  /> ~
          <a-input-number  v-model="input.gold2" :min="1" :max="99999" />
        <span>分</span>
      </a-form-item>
      <a-form-item label="白金等级" >
          <a-input-number  v-model="input.platinum1" :min="0" :max="999"  /> ~
          <a-input-number  v-model="input.platinum2" :min="1" :max="99999" />
        <span>分</span>
      </a-form-item>
    </a-form>
    <a-button type="primary" ghost @click="updateData">修改</a-button>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "teamBePromoted",
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  data() {
    return {
      input:{bronze1:"0",bronze2:"200",silver1:"0",silver2:"300",gold1:"0",gold2:"500",platinum1:"0",platinum2:"800"}
    }
  },

  methods: {
    updateData(){
      this.input.detail="打卡积分"+this.input.clockIn+"分/次，活动积分"+this.input.action+"分/次，作业积分"+this.input.job+"分/次";
    }
  },

  mounted() {

  }
}
</script>

<style scoped lang="sass">
@import "src/pages/commonality/css"
</style>