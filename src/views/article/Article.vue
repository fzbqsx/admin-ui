<template>
  <div class="bodyDiv2">
    <div class="activeBody">
      <div class="BoxTitle">
        <span>热门资讯</span><span>Hot info</span>
      </div>
      <hr class="hr"/>
      <div class="article-Body " v-if="this.activeDiv.articleData.length">
        <div class="alone-Body columns" v-for="(item,index) in this.activeDiv.articleData" :key="index" >
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
      <Page class="pages" :total=this.pages.total :page-size=this.pages.size @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
import {queryArticle} from "@/views/article/js/article";
export default {
  name: "Article",
  data(){
    return{
      activeDiv:{articleData:{}},
      pages:[],
    }
  },
  methods:{
    //查询所有文章列表
    getArticle(index){
      queryArticle({
        current:index,
        size:5,
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
    toDetails(index){
      this.$router.push({name:"articleDetails",
        query: {
          index:index,
        },
      })
    },
    changePage(index){
      this.getArticle(index)
    }
  },
  mounted() {
    this.getArticle(1);
  }
}
</script>

<style scoped lang="sass">
@import "./css/article"
</style>