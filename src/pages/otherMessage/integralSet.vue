<template>
  <a-card>
    <div class="tableTitle">
      <h1>积分设置</h1>
    </div>
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
      <a-form-item label="打卡积分" >
        <a-col span="8">
          <a-input v-model="input.clockIn" placeholder="请输入"/>
        </a-col>
        <span>分/次</span>
      </a-form-item>
      <a-form-item label="活动积分" >
        <a-col span="8">
          <a-input v-model="input.action" placeholder="请输入"/>
        </a-col><span>分/次</span>
      </a-form-item>
      <a-form-item label="提交作业积分" >
        <a-col span="8">
          <a-input v-model="input.job" placeholder="请输入"/>
        </a-col><span>分/次</span>
      </a-form-item>
      <a-form-item label="积分明细" >
        <a-col span="20">
          <a-input style="color: #000000" v-model="input.detail" disabled='true' />
        </a-col>
      </a-form-item>
    </a-form>
    <a-button type="primary" ghost @click="updateData">修改</a-button>
  </a-card>
</template>

<script>

export default {
  name: "integralSet",

  data() {
    return {
      input:{clockIn:"5",action:"5",job:"5",detail:""}
    }
  },

  methods: {
    updateData(){
      this.input.detail="打卡积分"+this.input.clockIn+"分/次，活动积分"+this.input.action+"分/次，作业积分"+this.input.job+"分/次";
    }
  },

  mounted() {
    this.input.detail="打卡积分"+this.input.clockIn+"分/次，活动积分"+this.input.action+"分/次，作业积分"+this.input.job+"分/次";
  }
}
</script>

<style scoped lang="sass">

</style>