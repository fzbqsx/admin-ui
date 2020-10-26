<template>
  <div>
    <div class="search_Box">
      <Row class="search_Row">
        <Col span="7">
          <span >订单号</span>
          <Input class="condition" size="large" placeholder="请输入订单号"/>
        </Col>
        <Col span="7">
          <span >订单状态</span>
          <Select class="condition"  size="large">
            <Option  v-for="item in orderStatus" :value="item.value" :key="item.key">{{item.value}}</Option>
          </Select>
        </Col>
        <Col span="7">
          <span >业务类型</span>
          <Select class="condition"  size="large">
            <Option  v-for="item in orderType" :value="item.value" :key="item.key">{{item.value}}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="search_Row buttonsDiv">
        <button  class="button _button">搜索</button>
        <button  class="button _button">刷新</button>
        <button  class="button _button">导出淘宝京东发货格式</button>
        <button  class="button _button">导出拼多多发货格式</button>
      </Row>
    </div>
    <Table size="large" style="border: none" :columns="orderTitle" :data="orderList"></Table>
    <Page class="page" :total=page.total :page-size=page.size @on-change="changePage"></Page>
  </div>
</template>

<script>
import {queryOrder} from './js/orderManage'
export default {
  name: "OrderManage",
  data(){
    return{
      orderList:[],
      page:[],
      orderStatus:[
        {key:0,value:'下单成功'},
        {key:1,value:'已完成'},
        {key:2,value:'超时'},
        {key:3,value:'订单被关闭'},
        {key:4,value:'订单被取消(来自用户)'}],
      orderType:[{key:'recharge',value:'充值'},{key:'purchase',value:'购买'}],
      orderTitle:[
        {
          title: '序号',
          width: '80px',
          align: 'center',
          render: (h, params) => {
            //因为下标从零开始，所以index加1，(当前页-1)*当前页的条数
            return h('span',params.index+1+(this.page.current-1)*this.page.size)
          }
        },
        {
          title: '订单号',
          key: 'tradeNo'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            if(0 === params.row.status){
              return h('span', '下单成功');
            }else if(1 === params.row.status){
              return h('span', '已完成');
            }else if(2 === params.row.status){
              return h('span', '超时');
            }else if(3 === params.row.status){
              return h('span', '订单被关闭');
            }else if(4 === params.row.status){
              return h('span', '订单被取消(来自用户)');
            }
          }
        },
        {
          title: '业务类型',
          key: 'type',
          render: (h, params) => {
            if("recharge" === params.row.business.type){
              return h('span', '充值');
            }else if("purchase" === params.row.business.type){
              return h('span', '购买');
            }
          }
        },
        {
          title: "操作",
          key: "operation",
          align: 'center',
          width:150,
          render: (h, params) => {
            return h(
                "div",
                {
                  style: {
                    textAlign: "center"
                  }
                },
                [
                  h(
                      "Button",
                      {
                        props: {
                          type: "primary",
                          size: "small"
                        },
                        style: {
                          fontFamily: "Source Han Sans CN",
                          fontSize: "18px",
                          backgroundColor: "#0033FF",
                          color: "#FFFFFF"
                        },
                        on: {
                          click: () => {
                            this.viewDetails(params.row.tradeNo);
                          }
                        }
                      },
                      "查看详情"
                  )
                ]
            );
          }
        }
      ],
    }
  },
  methods:{
    changePage(index){
      this.getOrderList(index)
    },
    getOrderList(index){
      queryOrder({
        current: index,
      }).then(res=>{
        if("ok" === res.err){
          this.orderList=res.data
          this.page=res.page
        }else {
          this.$Message.error("获取列表信息异常！"+res.message)
        }
      })
    },
    viewDetails(tradeNo){
      this.$router.push({name:'orderDetails',query:{tradeNo}})
    }
  },
  mounted() {
    this.getOrderList(1);
  }
}
</script>

<style scoped lang="sass">
@import "../global/css/global"
@import "css/orderManage"
</style>