<template>
  <a-card>
    <a-row class="tableTitle" type="flex">
      <a-col :span="15">
        <h1>查看报名</h1>
      </a-col>
      <a-col :span="7"><a-input-search placeholder="请输入" @search="onSearch" /></a-col>
      <a-col :span="2" ><a-button  type="primary" @click="consignment('','add')">搜索</a-button></a-col>
    </a-row>

    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record" class="actionbutton">
        <a-button type="primary" ghost @click="consignment(record,'update')">修改</a-button>
        <a-button type="primary" ghost  @click="consignment(record,'del')">删除</a-button>
      </span>
    </a-table>

  </a-card>
</template>

<script>

export default {
  name: "entryForm",

  data() {
    return {
      modal:{modalShow:false,title:"", aform:false,del:false,text:""},
      input:{name:"",age:"",class:"",account:"",password1:"",password2:"",integral:"",team:""},
      teamList:[{id:'1',name:'战队1'},{id:'2',name:'战队2'},{id:'3',name:'战队3'},{id:'4',name:'战队4'}],
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
        // {
        //   title: '教师专业',
        //   dataIndex: 'major',
        //   key: 'major',
        // },
        {
          title: '班级',
          key: 'class',
          dataIndex: 'class',
        },
        {
          title: '报名时间',
          key: 'registerTime',
          dataIndex: 'registerTime',
        },
        // {
        //   title: '操作',
        //   key: 'action',
        //   align:'center',
        //   scopedSlots: { customRender: 'action' },
        // },
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
        this.input={name:"",age:"",class:"",account:"",password1:"",password2:"",integral:"",team:""}
        this.modal={modalShow:true,title:"新建账号", aform:true,del:false,text:""}
      }
      if("update"===type){
        this.input={name:record.name,age:record.age,class:record.class,account:record.account,password1:"",password2:"",integral:"",team:""}
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
@import "css/newsRecord"
</style>