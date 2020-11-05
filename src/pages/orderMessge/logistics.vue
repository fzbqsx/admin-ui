<template>
    <a-card>
      <h1>查看物流</h1>
      <div>
        <p style="display: flex;justify-content: space-between;width: 60% ">
          <span>
            <span>运单编号：</span><span>33443596900</span>
          </span>
          <span>
            <span>快递公司：</span><span>申通快递</span>
          </span>
          <span>
            <span>客服电话：</span><span>15050980098</span>
          </span>
        </p>
        <p>
          <span>发货地址：</span>
          <span>天津天津市宝坻区人民路480号</span>
        </p>
        <p>
          <span>收货地址：</span>
          <span>香港特别行政区九龙油尖旺区太平大道310号  王大春011 15021174599</span>
        </p>
      </div>
      <a-divider />
      <div>
        <a-steps progress-dot :current="3" direction="vertical">
          <a-step class="step">
            <span class="step_title" slot="title">已签收</span>
            <span class="step_subTitle" slot="subTitle">2020-09-17 </span>
            <span class="step_subTitle" slot="subTitle">04:13:30 </span>
            <span class="step_description" slot="description">您已在温州锦华城南门店完成取件，期待再次为您服务。</span>
          </a-step>
          <a-step class="step">
            <span class="step_title" slot="title">派送中</span>
            <span class="step_subTitle" slot="subTitle">2020-09-17 </span>
            <span class="step_subTitle" slot="subTitle">19:20:30 </span>
            <span class="step_description" slot="description">瓯海泰恒一部的姚献楠[15158680163]正在派件（95720为中通快递员外呼专属号码，请放心接听）</span>
          </a-step>
          <a-step class="step">
            <span class="step_title" slot="title">运输中</span>
            <span class="step_subTitle" slot="subTitle">2020-09-17  </span>
            <span class="step_subTitle" slot="subTitle">20:00:30 </span>
            <span class="step_description" slot="description">快件已到达瓯海泰恒一部</span>
          </a-step>
          <a-step class="step">
            <span class="step_title" slot="title">已揽件</span>
            <span class="step_subTitle" slot="subTitle">2020-09-17  </span>
            <span class="step_subTitle" slot="subTitle">20:00:30 </span>
            <span class="step_description" slot="description">宝山淞南的淞南零零二[13818736248]已揽收</span>
          </a-step>
          <a-step class="step">
            <span class="step_title" slot="title">已发货</span>
            <span class="step_subTitle" slot="subTitle">2020-09-17  </span>
            <span class="step_subTitle" slot="subTitle">20:00:30 </span>
            <span class="step_description" slot="description">包裹正在等待揽收</span>
          </a-step>
          <a-step class="step">
            <span class="step_title" slot="title">已下单</span>
            <span class="step_subTitle" slot="subTitle">2020-09-17  </span>
            <span class="step_subTitle" slot="subTitle">20:00:30 </span>
            <span class="step_description" slot="description"></span>
          </a-step>

        </a-steps>
      </div>
    </a-card>
</template>

<script>

export default {
  name: "logistics",

  data(){
    return {
        
    }
  },
  
  methods:{
    
  },
  
  mounted() {
    
  }
}
</script>

<style>
.ant-steps-dot .ant-steps-item-content, .ant-steps-dot.ant-steps-small .ant-steps-item-content{
  width: 80%;
}
</style>
<style scoped lang="sass">
@import "css/logistics"
</style>