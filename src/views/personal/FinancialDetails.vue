<template>
  <div>
    <div class="search_Box columns">
      <span >按时间查询</span>
      <DatePicker class="DatePicker" placeholder="请选择开始时间" size="large" type="datetime"></DatePicker>
      <DatePicker class="DatePicker" placeholder="请选择结束时间" size="large" type="datetime"></DatePicker>
      <span >交易类型</span>
      <Select class="Select"  size="large">
        <Option  v-for="item in payTypeList" :value="item.value" :key="item.key">{{item.value}}</Option>
      </Select>
      <div class="buttonsDiv">
        <button  class="button _button">搜索</button>
      </div>
    </div>
    <Table size="large" style="border: none" :columns="finacialDatails" :data="finacialDatailsList"></Table>
    <Page :total=page.total :page-size=page.size  style="text-align: center;margin-top: 10px"></Page>
  </div>
</template>

<script>
export default {
  name: "FinancialDetails",
  data(){
    return{
      finacialDatailsList:[],
      page:[],
      payTypeList:[
        {
          key: 0,
          value: '收入'
        },
        {
          key: 1,
          value: '支出'
        },
        {
          key: 2,
          value: '充值'
        },
      ],
      finacialDatails:[
        {
          type: 'index',
          title: '序号',
          key: 'sequence',
          width:'90px'
        },
        {
          title: '摘要',
          key: 'abstract',
          render: (h, params) => {
            if(0 === params.row.type){
              return h('span', '收入'+params.row.amount+'元');
            }else if(1 === params.row.type){
              return h('span', '消费'+params.row.amount+'元');
            }else if(2 === params.row.type){
              return h('span', '充值'+params.row.amount+'元');
            }
          }
        },
        {
          title: '涉及金额(元)',
          key: 'amount'
        },
        {
          title: '交易类型',
          key: 'type',
          render: (h, params) => {
            if(0 === params.row.type){
              return h('span', '收入');
            }else if(1 === params.row.type){
              return h('span', '支出');
            }else if(2 === params.row.type){
              return h('span', '充值');
            }
          }
        },
        {
          title: '交易时间',
          key: 'createTime',
          // render: function (h, params) {
          //   return h('div',
          //       new Date(this.row.transactionTime).Format('yyyy-MM-dd HH:MM:ss'));
          // }
        }
      ],
    }
  },
  methods:{
    getFinancial(index){
      queryFinancial({
        current:index
      }).then(res=>{
        if("ok" === res.err){
          if(res.data.length>0){
            for(let i=0; i<res.data.length; i++ ){
              res.data[i].createTime=this.$moment(res.data[i].createTime).format('YYYY-MM-DD HH:mm:ss')
            }
            this.finacialDatailsList=res.data;
            this.page=res.page;
          }
        }else {
          this.$Message.error("获取列表信息异常！"+res.message)
        }
      })
    },
    onSearch(){
      this.$Message.success("搜索完成！")
    },
    changePage(index){
      this.getFinancial(index)
    }
  },
  mounted() {
    this.getFinancial(1)
  }
}
</script>

<style scoped lang="sass">
@import "../global/css/global"
@import "css/financialDetails"

</style>