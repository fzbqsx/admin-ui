<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <div class="headBox">
      <h1 class="headBox-left">教师管理</h1>
      <div class="headBox-right">
        <a-input-search class="headBox-right-item" v-model="searchInput.name" placeholder="请输入" @search="onSearch" />
        <a-button  type="primary" @click="consignment('','add')"><a-icon type="plus"/>新增</a-button>
      </div>
    </div>

    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record" class="actionbutton">
        <a-button type="primary" ghost @click="consignment(record,'update')">修改</a-button>
        <a-button type="primary" ghost  @click="consignment(record,'del')">删除</a-button>
      </span>
    </a-table>
    <a-modal v-model=modal.modalShow  :title=modal.title >
      <div v-show="modal.del" class="delectModal">
        <p>是否确定删除（<span >{{modal.text}}</span>）账号？</p>
      </div>
      <a-form v-show="modal.aform" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="姓名" >
          <a-input v-model="input.name" placeholder="请输入姓名"/>
        </a-form-item>
        <a-form-item label="年龄">
          <a-input v-model="input.age" placeholder="请输入年龄"/>
        </a-form-item>
        <a-form-item label="班级">
          <a-input v-model="input.class" placeholder="请输入班级"/>
        </a-form-item>
        <a-form-item label="账号">
          <a-input v-model="input.account" placeholder="请输入账号"/>
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-model="input.password1" placeholder="请输入密码"/>
        </a-form-item>
        <a-form-item label="确认密码">
          <a-input v-model="input.password2" placeholder="请输入密码"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {mapState} from "vuex";


export default {
  name: "teacherMessage",
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  data() {
    return {
      searchInput:{name:""},
      modal:{modalShow:false,title:"", aform:false,del:false,text:""},
      input:{name:"",age:"",class:"",account:"",password1:"",password2:""},
      columns : [
        {
          title:'姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '账号',
          dataIndex: 'account',
          key: 'account',
        },
        {
          title: '教师专业',
          dataIndex: 'major',
          key: 'major',
        },
        {
          title: '班级',
          key: 'class',
          dataIndex: 'class',
        },
        {
          title: '注册时间',
          key: 'registerTime',
          dataIndex: 'registerTime',
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
          name:'小明',
          account: '11111111',
          major: '英语专业',
          class: 'C111',
          registerTime: '2020-10-30 10:32:56'
        },
        {
          key: '222',
          name:'老利',
          account: '22222',
          major: '数学专业',
          class: 'C112',
          registerTime: '2020-10-31 14:25:39',
        },
        {
          key: '333',
          name:'阿亮',
          account: '333333',
          major: '英语专业',
          class: 'C112',
          registerTime: '2020-11-01 09:16:22',
        },
        {
          key: '444',
          name:'扣点',
          account: '4444444',
          major: '物理专业',
          class: 'C111',
          registerTime: '2020-11-01 16:41:05',
        },
        {
          key: '555',
          name:'李四',
          account: '5555555',
          major: '数学专业',
          class: 'C111',
          registerTime: '2020-11-02 11:19:32',
        },
      ]
    }
  },

  methods: {
    consignment(record, type){
      if("add"===type){
        this.input={name:"",age:"",class:"",account:"",password1:"",password2:""}
        this.modal={modalShow:true,title:"新建账号", aform:true,del:false,text:""}
      }
      if("update"===type){
        this.input={name:record.name,age:record.age,class:record.class,account:record.account,password1:"",password2:""}
        this.modal={modalShow:true,title:"修改账号", aform:true,del:false,text:""}
      }
      if("del"===type){
        this.modal={modalShow:true,title:"删除", aform:false,del:true,text:record.account}
      }

    },
    onSearch(){
      console.log("点击搜索")
    }
  },

  mounted() {

  }
}
</script>
<style scoped lang="sass">
@import "src/pages/commonality/css"
@import "css/teacherMessage"
</style>