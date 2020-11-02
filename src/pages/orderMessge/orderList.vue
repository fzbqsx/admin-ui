<template>
  <a-card class="orderCard">
    <h1>订单管理</h1>
    <a-table :columns="columns" :data-source="data">
      <span slot="status" slot-scope="text, record">
        <p v-if="record.status==='1'">
          未付款
        </p>
        <p v-if="record.status==='2'">
          未发货
        </p>
        <p v-if="record.status==='3'">
          已发货
        </p>
        <p v-if="record.status==='4'">
          已完成
        </p>
        <p v-if="record.status==='5'" style="color: #3295FA">
          已评价
        </p>
      </span>
      <span slot="action" slot-scope="text, record">
<!--        <a-button v-if="record.status==='1'" type="primary" ghost>查看详情</a-button>-->
        <a-button v-if="record.status==='2'" type="primary" ghost @click="consignment(record)">发货</a-button>
        <a-button v-if="record.status==='3'" type="primary" ghost>查看物流</a-button>
        <a-button v-if="record.status==='4'" type="primary" ghost>查看详情</a-button>
        <a-button v-if="record.status==='5'" type="primary" ghost>查看详情</a-button>
      </span>
    </a-table>
    <a-modal v-model=modal.modalShow  :title=modal.title >
      <a-form v-show="modal.aform" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="运单编号" >
          <a-input placeholder="请输入运单编号"/>
        </a-form-item>
        <a-form-item label="快递公司">
          <a-input placeholder="请输入快递公司"/>
        </a-form-item>
        <a-form-item label="客服电话">
          <a-input placeholder="请输入客服电话"/>
        </a-form-item>
        <a-form-item label="发货地址">
          <a-input placeholder="请输入发货地址"/>
        </a-form-item>
        <a-form-item label="收货地址">
          <a-input placeholder="请输入收货地址"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
export default {
  name: "orderList",
  data() {
    return {
      modal:{modalShow:false,title:"", aform:false},
      columns : [
        {
          title:'订单编号',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: '标题',
          dataIndex: 'orderTitle',
          key: 'orderTitle',
        },
        {
          title: '所属用户',
          dataIndex: 'userName',
          key: 'userName',
        },
        {
          title: '时间',
          key: 'createTime',
          dataIndex: 'createTime',
          scopedSlots: { customRender: 'createTime' },
        },
        {
          title: '状态',
          key: 'status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          filters: [
            {
              text: '未付款',
              value: '1',
            },
            {
              text: '未发货',
              value: '2',
            },
            {
              text: '已发货',
              value: '3',
            },
          ],
          filterMultiple: false,

        },
        {
          title: '操作',
          key: 'action',
          align:'center',
          scopedSlots: { customRender: 'action' },
        },
      ],

      data : [
        {
          key: '1111',
          orderTitle: '订单111',
          userName: 'aa11',
          createTime: '2020-10-30 10:32:56',
          status: '1'
        },
        {
          key: '222',
          orderTitle: '订单222',
          userName: 'aa22',
          createTime: '2020-10-31 14:25:39',
          status: '2'
        },
        {
          key: '333',
          orderTitle: '订单333',
          userName: 'aa33',
          createTime: '2020-11-01 09:16:22',
          status: '3'
        },
        {
          key: '444',
          orderTitle: '订单444',
          userName: 'aa44',
          createTime: '2020-11-01 16:41:05',
          status: '4'
        },
        {
          key: '555',
          orderTitle: '订单555',
          userName: 'aa55',
          createTime: '2020-11-02 11:19:32',
          status: '5'
        },
      ]
    };
  },
  methods:{
    consignment(record){
      this.modal.modalShow=true
      if("2"===record.status){
        this.modal.title="完善物流信息"
        this.modal.aform=true
      }
    }
  },
  mounted() {

  }
}
</script>
<style scoped lang="sass">
@import "css/orderMessage"
</style>