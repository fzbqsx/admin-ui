<template>
  <div>
    <div class="imgDiv">
      <img src="@/assets/personal/蒙版组 2.png" />
    </div>
    <div class="explain">
      <p>1、一单一用、真实物流、不降权，可自定义重量，可提供申诉底单、内网截图。</p>
      <p>2、其他快递陆续上线，礼品和配重礼品持续上新，礼品刷手真实签收。</p>
      <p>3、全网比价，性价比更高，更安全稳定，不出物流假一赔十。</p>
    </div>
    <div>
      <Table size="large" style="border: none;" :columns="priceListTitle" :data="priceList">
      </Table>
      <Page :total=page.total :page-size=page.size @on-change="changePage" style="text-align: center;margin: 10px 0"></Page>
    </div>
  </div>
</template>

<script>
import {queryPriceList} from './js/priceList'
export default {
  name: "PriceList",
  data(){
    return{
      priceList:[],
      page:[],
      priceListTitle:[
        {
          type: 'index',
          title: '序号',
          key: 'sequence',
          width: 90
        },
        {
          title: '快递类型',
          key: 'expressType',
          render: (h)=>{
            return h("p", "礼品包");
          }
        },
        {
          title: '仓库名称',
          key: 'depotName',
          render: (h,params)=>{
            return h("p",  params.row.depot.name);
          }
        },
        {
          title: '快递名称',
          key: 'expressName',
          render: (h,params)=>{
            return h("p",  params.row.express.name);
          }
        },
        {
          title: '售价(元)',
          key: 'price',
          render: (h,params)=>{
            return h("p",  params.row.price);
          }
        },
      ],
    }
  },
  methods:{
    getPriceList(index){
      queryPriceList({
        current:index
      }).then(res=>{
        if("ok" === res.err){
          this.priceList=res.data;
          this.psge=res.page;
        }else {
         this.$Message.error("获取列表数据异常！"+res.message)
        }
      })
    },
    changePage(index){
      this.getPriceList(index)
    }
  },
  mounted() {
    this.getPriceList(1)
  }
}
</script>

<style scoped lang="sass">
@import "css/priceList"
</style>