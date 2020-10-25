<template>
  <div class="bodyDiv1 bodyDiv2">
      <div class="ordersBodyDiv">
        <span class="span1">发货方式</span><br/>
        <span class="span1">当您同时为多人发货时，我们为您提供了如下四种提交 <span class="orders_info">收货信息</span> 的方式</span>
        <div class="order_box">
          <div class="card">
            <img src="@/assets/toOrders/页面-1.png"/>
            <span class="span2">
              自动发货【淘宝|拼多多|京东】
            </span><br/>
            <span class="span3">
              自动同步订单一键智能发货
            </span><br/>
            <span class="span4">
              独家智能发货系统，自动同步订单，
              一键智能发货，省时、省力、省心。
            </span>
            <div class="buttonsDiv">
              <button class="button _button"  @click="toUse">去使用</button>
            </div>
          </div>
          <div class="card">
            <img src="@/assets/toOrders/页面-1(1).png"/>
            <span class="span2">
              手动录入发货【全网】
            </span><br/>
            <span class="span3">
              手动录入收件信息实时获取单号
            </span><br/>
            <span class="span4">
              手动录入首发信息，实时回传单号，
              导出单号，商家后台导入即可发货。
            </span>
            <div class="buttonsDiv">
              <button class="button _button" @click="toOrderDetails2">去使用</button>
            </div>
          </div>
          <div class="card">
            <img src="@/assets/toOrders/页面-1(2).png"/>
            <span class="span2">
              原表导入发货【全网】
            </span><br/>
            <span class="span3">
              智能识别 安全省心
            </span><br/>
            <span class="span4">
              淘宝、京东、拼多多平台导出收件信
              息，无需修改原表，自动匹配单号。
            </span>
            <div class="buttonsDiv">
              <button class="button _button"  @click="toOrderDetails2">去使用</button>
            </div>
          </div>
          <div class="card">
            <img src="@/assets/toOrders/页面-1(3).png"/>
            <span class="span2">
              模板上传发货【全网】
            </span><br/>
            <span class="span3">
              批量上传 自动识别
            </span><br/>
            <span class="span4">
              根据平台模板要求，手动整理表格，
              模板上传，根据平台自动识别。
            </span>
            <div class="buttonsDiv">
              <button class="button _button"  @click="toOrderDetails2">去使用</button>
            </div>
          </div>
        </div>
      </div>

      <Modal title="选择平台" v-model='messageShow' class-name="vertical-center-modal" >
        <div class="buttonsDiv buttonModal">
          <button class="button _button" @click="toOrderDetails2">淘宝</button>
          <button class="button _button" @click="toOrderDetails2">拼多多</button>
          <button class="button _button" @click="toOrderDetails2">京东</button>
        </div>
        <div slot="footer" v-show="false"></div>
      </Modal>
  </div>
</template>

<script>
export default {
  name: "ToOrders",
  data(){
    return{
      messageShow:false,
    }
  },
  methods:{
    toUse(){
      if(this.messageShow){
        this.messageShow=false;
      }else{
        this.messageShow=true;
      };
    },
    toOrderDetails2(){
      this.$router.push({ name: "orderDetails2"  });
    }
  }
}
</script>

<style scoped lang="sass">
@import "../global/css/global"
@import "css/toOrders"
</style>