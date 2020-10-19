<template>
  <div class="bodyDiv2 bodyDiv1">
      <div class="giftShopDiv">
        <div class="BoxTitle">
          <span>礼品商城</span><span>Mall</span>
        </div>
        <hr class="hr"/>
        <grid-layout v-if="this.giftshopDiv.presentList.length" :max="giftshopDiv.num" class="_shop_list">
          <div class="alone_shop " v-for="(item,index) in this.giftshopDiv.presentList" :key="index">
            <div class="shop_img">
              <img :src="$imgurl(item.cover)" alt>
            </div>
            <div class="shop_info">
              <span class="shop_price">￥{{ item.price }}</span><br/>
              <div class="_title">
                {{ item.name }}
              </div>
              <span class="_describe">重量{{ item.weight }}克/件</span>
              <span class="_toOrders" @click="toOrder">去下单 > </span>
            </div>
          </div>
        </grid-layout>
        <hr class="hr" style="margin: 10px 0"/>
        <Page class="pages" :total=this.pages.total :page-size=this.pages.size @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
import {queryAllPresent} from "@/views/giftShop/js/giftShop";
import GridLayout from "@/views/layOut/GridLayout";
export default {
  name: "GiftShop",
  data(){
    return{
      giftshopDiv:{num:4, presentList:{}},
      pages:[],

    }
  },
  components: {
    GridLayout
  },
  methods:{
    changePage(index){
      this.getPresent(index)
    },
    getPresent(index) {//获取礼品列表
      queryAllPresent({
        current: index,
        size: 8,
      }).then(res => {
        if ("ok" === res.err) {
          this.giftshopDiv.presentList = res.data;
          this.pages = res.page;
        } else {
          this.$Message.error(res.message)
        }
      })
    },
    toOrder(){
      this.$router.push({name: "toOrders" });
    },
    changeMargin() {
      if(innerWidth<=800){
        this.giftshopDiv.num = 1
      }else if(800<innerWidth && innerWidth<=1100){
        this.giftshopDiv.num=2
      }else if(1100<innerWidth && innerWidth<=1600){
        this.giftshopDiv.num=3
      }else if(1600<innerWidth){
        this.giftshopDiv.num=4
      }
      addEventListener('resize', () => {
        if(innerWidth<=800){
          this.giftshopDiv.num = 1
        }else if(800<innerWidth && innerWidth<=1100){
          this.giftshopDiv.num=2
        }else if(1100<innerWidth && innerWidth<=1600){
          this.giftshopDiv.num=3
        }else if(1600<innerWidth){
          this.giftshopDiv.num=4
        }
      })
    },
  },
  mounted() {
    this.getPresent(1)
    this.changeMargin()
  }
}
</script>

<style scoped lang="sass">
@import "css/giftShop"
@import "../common/css/Home"
</style>