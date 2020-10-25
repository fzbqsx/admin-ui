<template>
  <div class="bodyDiv1 bodyDiv2">
    <div class="activeDetailsBody">
      <div class="details_title">
        <h1>{{ articleDetails.title}}</h1>
        <p>{{$moment(articleDetails.createTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
      </div>
      <hr/>
      <div class="details_body">
        <div v-html="articleDetails.html"></div>
      </div>
      <hr/>
      <div class="previousAndNext">
        <p>上一篇：</p>
        <p>下一篇：</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {queryArticleDetails} from "@/views/article/js/article";
export default {
  name: "ArticleDetails",
  data(){
    return{
      articleDetails:{title:"",createTime:"",html:""}
    }
  },
  methods:{
    getHtml () {
      this.articleDetails.title=this.$route.params.item.title
      this.articleDetails.createTime=this.$route.params.item.createTime
      const resource = this.$route.params.item.resource
      queryArticleDetails({resource}).then(res=>{
        this.articleDetails.html=res;
      })
    },
  },
  mounted() {
    this.getHtml();
  }

}
</script>

<style scoped lang="sass">
@import "../global/css/global"
@import "css/articleDetails"
</style>