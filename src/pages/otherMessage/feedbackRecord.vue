<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <div class="headBox">
      <h1 class="headBox-left">反馈记录</h1>
    </div>
    <a-table :columns="columns" :data-source="data">
      <span class="masterImg" slot="studentInfo">
        <div>
          <img src="../../assets/masterImg/图像 3.png" />
          <p>陈晓</p>
        </div>
      </span>
      <span slot="action" slot-scope="text, record" class="actionbutton">
        <a-button v-if="record.status==='1'" type="primary" ghost @click="consignment(record,'update')">回执</a-button>
        <a-button v-else type="primary" ghost disabled >已回复</a-button>
      </span>
    </a-table>
    <a-modal v-model=modal.modalShow  :title=modal.title >
      <a-form v-show="modal.aform" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
        <span class="masterImg" >
          <div>
            <img src="../../assets/masterImg/图像 3.png" />
            <p>陈晓</p>
          </div>
        </span>
        <a-form-item label="反馈内容" >
          <p>{{input.feedbackDetail}}</p>
        </a-form-item>
        <a-form-item label="提交时间" >
          <p>{{input.createTime}}</p>
        </a-form-item>
        <a-form-item label="回执" >
          <a-textarea v-model="input.details" placeholder="请输入内容" :auto-size="{ minRows: 3, maxRows: 15 }"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "feedbackRecord",
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  data() {
    return {
      modal:{modalShow:false,title:"", aform:false,text:""},
      input:{studentInfo:"",feedbackSynopsis:"",feedbackDetail:"",createTime:""},
      columns : [
        {
          title:'学生信息',
          dataIndex: 'studentInfo',
          key: 'studentInfo',
          width:'120px',
          scopedSlots: { customRender: 'studentInfo' },
        },
        {
          title: '反馈简介',
          dataIndex: 'feedbackSynopsis',
          key: 'feedbackSynopsis',
          ellipsis: true,
        },
        {
          title: '反馈详情',
          dataIndex: 'feedbackDetail',
          key: 'feedbackDetail',
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
          feedbackSynopsis:'但无论是哪种类型用户，都一定会有同种共性——',
          feedbackDetail: '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度。',
          status:'1',
          createTime: '2020-10-30 10:32:56'
        },
        {
          key: '222',
          feedbackSynopsis:'但无论是哪种类型用户，都一定会有同种共性——',
          feedbackDetail: '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度。',
          status:'2',
          createTime: '2020-10-30 10:32:56'
        },
        {
          key: '333',
          feedbackSynopsis:'但无论是哪种类型用户，都一定会有同种共性——',
          feedbackDetail: '但无论是哪种类型用户，都一定会有同种共性——好奇心。好奇心足以牵引着一个人对所产生事物的关注程度和好感度。',
          status:'1',
          createTime: '2020-10-30 10:32:56'
        }
      ]
    }
  },

  methods: {
    consignment(record, type){
      if("update"===type){
        this.input={studentInfo:'',feedbackSynopsis:record.feedbackSynopsis,feedbackDetail:record.feedbackDetail,createTime:record.createTime};
        this.modal={modalShow:true,title:"修改群发信息", aform:true,del:false,text:""}
      }

    },
  },

  mounted() {

  }
}
</script>

<style scoped lang="sass">
@import "src/pages/commonality/css"
@import "css/feedbackRecord"

</style>