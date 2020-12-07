<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <div class="headBox">
      <h1 class="headBox-left">订单管理</h1>
    </div>
    <a-table :columns="columns" :data-source="data">
      <span slot="status" slot-scope="text, record">
        <p v-if="record.status==='1'">未兑换</p>
        <p v-if="record.status==='2'">未发货</p>
        <p v-if="record.status==='3'">已发货</p>
      </span>
      <a-tooltip placement="top" slot="orderTitle" slot-scope="text, record" class="tooltip">
        <template #title>
          {{record.orderTitle}}
        </template>
        <p>{{record.orderTitle}}</p>
      </a-tooltip>
      <Child slot="address" slot-scope="text, record" :address="record.address">

      </Child>
<!--      <a-tooltip placement="top" slot="address"  slot-scope="text, record"  :mouseLeaveDelay="0.5" class="tooltip">-->
<!--        <template #title>-->
<!--          {{record.address}}-->
<!--        </template>-->
<!--        <p>{{record.address}}</p>-->
<!--      </a-tooltip>-->

      <span slot="action" slot-scope="text, record">
        <a-button v-if="record.status==='2'" type="primary" ghost @click="consignment(record)">发货</a-button>
        <a-button v-if="record.status==='3'" type="primary" ghost @click="consignment(record)">查看详情</a-button>
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
      </a-form>
      <a-form v-show="modal.physical" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="运单编号" >
          <p>123456789</p>
        </a-form-item>
        <a-form-item label="快递公司">
          <p>韵达快递</p>
        </a-form-item>
        <a-form-item label="客服电话">
          <p>123456</p>
        </a-form-item>
        <a-form-item label="发货地址">
          <p>浙江省温州市鹿城区世贸中心</p>
        </a-form-item>
        <a-form-item label="收货地址">
          <p>浙江省温州市鹿城区世贸中心</p>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Child from "@/pages/orderMessge/Child";
export default {
  name: "orderList",
  components: {Child},
  computed: {
    ...mapState( 'setting', ['pageMinHeight']),
  },
  data() {
    return {
      modal:{modalShow:false,physical:false,title:"", aform:false,operationText:true},
      address:"",
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
          ellipsis: true,
          scopedSlots: { customRender: 'orderTitle' },
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
          title: '收件人地址',
          dataIndex: 'address',
          key: 'address',
          scopedSlots: { customRender: 'address' },
        },
        {
          title: '收件人姓名',
          dataIndex: 'recipientsName',
          key: 'recipientsName',
        },
        {
          title: '收件人手机号',
          dataIndex: 'recipientsPhone',
          key: 'recipientsPhone',
        },
        {
          title: '状态',
          key: 'status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          filters: [
            {
              text: '未兑换',
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
          key: 'EFG21354GS4634',
          orderTitle: '简约电脑背包男士双肩包商务旅行包时尚潮流',
          userName: '张东升',
          address:'浙江省温州市鹿城区世贸中心2203',
          recipientsName:'李康生',
          recipientsPhone:'17779111788',
          createTime: '2020-10-30 10:32:56',
          status: '1'
        },
        {
          key: 'SGSV4546526346',
          orderTitle: '黑人牙膏超白小苏打竹炭亮白3支家庭套装防蛀清新口气',
          userName: '张东升',
          address:'浙江省温州市鹿城区世贸中心2203',
          recipientsName:'李康生',
          recipientsPhone:'17779111788',
          createTime: '2020-10-31 14:25:39',
          status: '2'
        },
        {
          key: 'RV354546526346',
          orderTitle: '黑人牙膏超白小苏打竹炭亮白3支家庭套装防蛀清新口气',
          userName: '张东升',
          address:'浙江省温州市鹿城区世贸中心2203',
          recipientsName:'李康生',
          recipientsPhone:'17779111788',
          createTime: '2020-11-01 09:16:22',
          status: '3'
        },
        {
          key: 'RV354546526347',
          orderTitle: '黑人牙膏超白小苏打竹炭亮白3支家庭套装',
          userName: '王金科',
          address:'浙江省温州市鹿城区世贸中心2203',
          recipientsName:'刘女士',
          recipientsPhone:'17948783535',
          createTime: '2020-11-01 16:41:05',
          status: '2'
        },
        {
          key: 'RV354546526348',
          orderTitle: '简约电脑背包男士双肩包商务旅行包',
          userName: '王金科',
          address:'浙江省温州市鹿城区世贸中心2203',
          recipientsName:'黄先生',
          recipientsPhone:'13366707868',
          createTime: '2020-11-02 11:19:32',
          status: '3'
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
        this.modal.physical=false
      }else{
        this.modal.title="查看物流信息"
        this.modal.aform=false
        this.modal.physical=true
      }
    },
    operation(event){
      if(true===this.modal.operationText){
        event.currentTarget.parentElement.className=''
        this.modal.operationText=false
      }else{
        event.currentTarget.parentElement.className='tableSpan'
        this.modal.operationText=true
      }
    },
    toLogistics(){
      // this.$router.replace( '/logistics')
    }
  },
  mounted() {

  }
}
</script>
<style scoped lang="sass">
@import "src/pages/commonality/css"
@import "css/orderMessage"

</style>