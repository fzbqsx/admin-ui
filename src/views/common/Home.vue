<template>
  <div>
    <div class="recommendPage" @mouseenter="enter" @mouseleave="leave">
      <swiper :options="swiperDiv.swiperOption" ref="mySwiper" v-if="swiperDiv.slideList.length>1">
        <swiper-slide class="swiperSlideDiv" v-for="item in swiperDiv.slideList" v-bind:key="item.id">
          <img :src="$imgurl(item.option)" alt/>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div v-show="swiperDiv.swiperButton" class="swiper-button-prev" slot="button-prev"></div>
        <div v-show="swiperDiv.swiperButton" class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <div class="homeBodyDiv">
      <div class="sloganDiv columns">
        <div class="aloneSlogan column">
          <img src="@/assets/home/a966.png" />
          <div class="describe">
            <p>正品保障</p>
            <p>正品保障，选购放心</p>
          </div>
        </div>
        <div class="aloneSlogan column">
          <div class="img"><img src="@/assets/home/a967.png" /></div>
          <div class="describe">
            <p>天天低价</p>
            <p>天天低价，畅选无忧</p>
          </div>
        </div>
        <div class="aloneSlogan column">
          <div class="img"><img src="@/assets/home/a968.png" /></div>
          <div class="describe">
            <p>多仓直发</p>
            <p>多仓直发，极速配送</p>
          </div>
        </div>
        <div class="aloneSlogan column">
          <div class="img"><img src="@/assets/home/a969.png" /></div>
          <div class="describe">
            <p>品类齐全</p>
            <p>品类齐全，轻松选礼</p>
          </div>
        </div>
      </div>
      <div class="giftShopDiv">
        <div class="BoxTitle">
          <span class="Box_title1">礼品商城</span><span class="Box_title2">Mall</span><span @click="toGiftshop">MORE+</span>
        </div>
        <hr class="hr"/>
        <grid-layout v-if="this.giftshopDiv.presentList.length" :max="giftshopDiv.num">
          <div class="alone_shop" v-for="(item,index) in this.giftshopDiv.presentList" :key="index">
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
      </div>

      <div class="home_activeDiv">
        <div class="BoxTitle">
          <span class="Box_title1">热门资讯</span><span class="Box_title2">Hot info</span><span @click="toArticle">MORE+</span>
        </div>
        <hr class="hr"/>
        <div class="article-Body " v-if="this.activeDiv.articleData.length">
          <div class="columns" v-for="(item,index) in this.activeDiv.articleData" :key="index" >
            <div class="alone-img column is-one-fifth">
              <img :src= "$imgurl(item.cover)" alt>
            </div>
            <div class="column">
              <div class="alone-title">{{ item.title }}</div>
              <div class="alone-desc" type="date">{{$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
              <div class="alone-desc">{{ item.desc }}</div>
              <div class="button article_button" type="button" @click="toDetails(item,index)">了解更多
                <div class="triangle_icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="labelBox columns">
        <div class="aloneLabel column">
          <div class="aloneLabelImg">
            <img src="../../assets/home/组 5611.png" alt/>
            <span>降成本</span>
          </div>
          <span class="spana">帮你降低50%发货成本，省去你能想到的所有发货成本</span>
        </div>
        <div class="aloneLabel column">
          <div class="aloneLabelImg">
            <img src="../../assets/home/组 5612.png" alt/>
            <span>去库存</span>
          </div>
          <span class="spana">回收库存/去礼品库存/去自有产品库存</span>
        </div>
        <div class="aloneLabel column">
          <div class="aloneLabelImg">
            <img src="../../assets/home/组 5613.png" alt/>
            <span>保品质</span>
          </div>
          <span class="spana">同样价格，给你更好的品质；同样品质，给你最低的价格</span>
        </div>
        <div class="aloneLabel column">
          <div class="aloneLabelImg">
            <img src="../../assets/home/组 5613.png" alt/>
            <span>多选择</span>
          </div>
          <span class="spana">非配重礼品/可配重礼品/高端礼品等</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GridLayout from "@/views/layOut/GridLayout";
import {querySysConfig} from "./js/navigation";
import {queryAllPresent} from "@/views/giftShop/js/giftShop";
import {queryArticle} from "@/views/article/js/article";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  components: {
    GridLayout,
    swiper,
    swiperSlide
  },


  name: 'Home',
  data(){
    return {
      swiperDiv:{swiperButton:false, slideList:{}, swiperOption: {
          loop: true,
          speed:800,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          // 显示分页
          pagination: {
            el: ".swiper-pagination",
            clickable: true //允许分页点击跳转
          },
          // 设置点击箭头
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        }
      },
      giftshopDiv:{num:4, presentList:{}},
      activeDiv:{articleData:{}}
    }

  },
  methods:{

    getSysConfig(){//获取轮播图
      querySysConfig(
          {sysName:'slide',
            query: {
              createTime: {
                sort: 'asc'
              }
            }
          }).then(res=>{
        if("ok"===res.err){
          this.swiperDiv.slideList=res.data;
        }
      })
    },

    getPresent() {//获取礼品列表
      queryAllPresent({
        current: 1,
        size: 8,
      }).then(res => {
        if ("ok" === res.err) {
          this.giftshopDiv.presentList = res.data;
          // this.pages = res.page;
        } else {
          this.$Message.error(res.message)
        }
      })
    },

    //查询所有文章列表
    getArticle(){
      queryArticle({
        current:1,
        size:3,
        query: {
          createTime: {
            sort: 'desc'
          }
        }
      }).then(res => {
        if("ok"==res.err){
          this.activeDiv.articleData = res.data;
          this.pages=res.page;
        }else {
          this.$Message.error(res.msg)
        }
      })
    },

    enter(){
      this.swiperDiv.swiperButton=true;
    },
    leave(){
      this.swiperDiv.swiperButton=false;
    },
    toGiftshop(){
      this.$router.push({ name: "giftShop" });
    },
    toOrder(){
      this.$router.push({name: "toOrders", });
    },
    toArticle(){
      this.$router.push({ name: "article" });
    },
    toDetails(){
      this.$router.push({name:"articleDetails",
        query: {
          index:index,
        },
      })
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
    this.getSysConfig()
    this.getPresent();
    this.changeMargin();
    this.getArticle()
  }
}
</script>
<style scoped lang="sass">
@import "../global/css/global"
@import "css/home"
@import "../giftShop/css/giftShop"
@import "../article/css/article"
</style>
