<template>
  <div>
    <div class="cardBox columns">
      <card class="CarouselBox column">
        <p class="notifyTitle">基本信息</p>
        <p>用户名：{{$session.account}} <span class="notifyTitlespan" style="color: #0033FF">修改密码</span></p>
        <p>手机号：{{$session.phone}}</p>
        <p>余&nbsp;&nbsp;额：{{$session.balance}}元 <span class="notifyTitlespan"  style="color: #FF2121">立即充值</span></p>
      </card>
      <card class="CarouselBox column">
        <p class="notifyTitle">数据统计</p>
        <span style="margin-right: 30px">今日消费：{{cardInfo.statisticData.purchase}}</span><span>邀请人数：{{cardInfo.statisticData.invites}}</span><p></p>
        <span style="margin-right: 30px">今日礼品：{{cardInfo.statisticData.todayShipped}}</span><span>累计礼品：{{cardInfo.statisticData.shipped}}</span>
      </card>
      <card class="CarouselBox column">
        <Carousel v-if="cardInfo.sysNotify.length>1" loop autoplay  easing  :autoplay-speed="5000" :radius-dot="true">
          <CarouselItem v-for="(item,index) in cardInfo.sysNotify" :key="index">
            <p class="notifyTitle" >{{item.title}}</p>
            <p >{{item.content}}</p>
          </CarouselItem>
        </Carousel>
      </card>
    </div>


    <div class="linkBox">
      <p>快速通道</p>
      <div class="link_Box columns">
        <router-link to="/ToOrders" class="aloneLink column">
          <img src="@/assets/personal/路径 421.png" />
          <p>礼品发放</p>
        </router-link>
        <router-link to="/PriceList" class="aloneLink column" >
          <img src="@/assets/personal/组 5597.png" />
          <p>价格列表</p>
        </router-link>
        <router-link class="aloneLink column" to="/Popularize">
          <img src="@/assets/personal/路径 424.png" />
          <p to="/Popularize">推广赚钱</p>
        </router-link>
      </div>
    </div>
    <div class="linkBox">
      <p>常见问题</p>
      <div>
        <div class="qs_Box" >
          <p class="question"><span>. </span></p>
          <p class="solution"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {querySysNotify,queryStatisticData } from "./js/personalHome";
export default {
  name: "PersonalHome",
  data(){
    return{
      cardInfo:{statisticData:[],sysNotify:[]}
    }
  },
  methods:{
    getStatisticData(){//获取统计数据
      queryStatisticData({}).then(res=>{
        if("ok"===res.err){
          this.cardInfo.statisticData=res.data;
        }else {
          this.$Message.error("获取数据统计异常！"+res.message)
        }
      })
    },
    getSysNotify(){//获取系统公告
      querySysNotify({
        current:1,
        size:100,
      }).then(res=>{
        console.log(res)
        if("ok"===res.err){
          this.cardInfo.sysNotify=res.data
        }else {
          var sysNotifya={title:"",content:""}
          //sysNotifya.title="暂无公告";
          sysNotifya.content=res.message;
          this.cardInfo.sysNotify.push(sysNotifya)
        }
      })
    },
  },
  mounted() {
    this.getStatisticData();
    this.getSysNotify();
  },

}
</script>

<style scoped lang="sass">
@import "css/personalHome.sass"
</style>