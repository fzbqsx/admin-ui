<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <div class="headBox">
      <h1 class="headBox-left">群发记录</h1>
      <div class="headBox-right">
        <a-button type="primary" @click="consignment('','add')"><a-icon type="plus"/>添加群发</a-button>
      </div>
    </div>
    <a-table :columns="columns" :data-source="data">
      <a slot="entryForm" slot-scope="text, record" @click="consignment(record,'look')">查看</a>
      <span slot="action" slot-scope="text, record" class="actionbutton">
        <a-button type="primary" ghost @click="consignment(record,'update')">修改</a-button>
        <a-button type="primary" ghost  @click="consignment(record,'del')">删除</a-button>
      </span>
    </a-table>
    <a-modal v-model=modal.modalShow  :title=modal.title >
      <div v-show="modal.del" class="delectModal">
        <p>是否确定删除（<span >{{modal.text}}</span>）记录？</p>
      </div>
      <a-form v-show="modal.aform" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="编辑标题" >
          <a-textarea v-model="input.title" placeholder="请输入标题" :auto-size="{ minRows: 3, maxRows: 15 }"/>
        </a-form-item>
        <a-form-item label="发布对象">
          <a-select
              mode="tags"
              size="large"
              placeholder="请选择班级"
              v-model="input.releaseObject"
              style="width: 300px"
          >
            <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
              {{ (i + 9).toString(36) + i }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "newsRecord",
  computed: {
    ...mapState( 'setting', ['pageMinHeight']),
  },
  data() {
    return {
      modal:{modalShow:false,title:"", aform:false,del:false,text:""},
      input:{title:"",releaseObject:[]},
      columns : [
        {
          title:'标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '发起人',
          dataIndex: 'initiator',
          key: 'initiator',
        },
        {
          title: '发布对象',
          dataIndex: 'releaseObject',
          key: 'releaseObject',
        },
        {
          title: '发布时间',
          key: 'releaseTime',
          dataIndex: 'releaseTime',
        },
        {
          title: '查看报名',
          key: 'entryForm',
          align:'center',
          scopedSlots: { customRender: 'entryForm' },
        },
        {
          title: '操作',
          key: 'action',
          align:'center',
          // width:180,
          scopedSlots: { customRender: 'action' },
        },
      ],

      data : [
        {
          key: '1111',
          title:'“保护母亲河”环保行动"生态环境调查',
          initiator: '管理员11',
          releaseObject: 'C112班级',
          releaseTime: '2020-10-30 10:32:56'
        },
        {
          key: '222',
          title:'“保护母亲河”环保行动"生态环境调查111',
          initiator: '管理员22',
          releaseObject: '全体学生',
          releaseTime: '2020-10-30 10:32:56'
        },
        {
          key: '333',
          title:'“保护母亲河”环保行动"生态环境调查111',
          initiator: '管理员33',
          releaseObject: '全体学生',
          releaseTime: '2020-10-30 10:32:56'
        },
        {
          key: '444',
          title:'“保护母亲河”环保行动"生态环境调查111',
          initiator: '管理员11',
          releaseObject: '全体学生',
          releaseTime: '2020-10-30 10:32:56'
        }
      ]
    }
  },

  methods: {

    consignment(record, type){
      if("add"===type){
        this.input={title:"",releaseObject:[]};
        this.modal={modalShow:true,title:"添加群发", aform:true,del:false,text:""}
      }
      if("update"===type){
        this.input={title:record.title,releaseObject:record.releaseObject};
        this.modal={modalShow:true,title:"修改群发信息", aform:true,del:false,text:""}
      }
      if("del"===type){
        this.modal={modalShow:true,title:"删除", aform:false,del:true,text:record.title}
      }
      if('look'===type){
        this.$router.push('entryForm')
      }

    },
  },

  mounted() {

  }
}
</script>

<style scoped lang="sass">
@import "src/pages/commonality/css"
</style>