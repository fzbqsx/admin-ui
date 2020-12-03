<template>
  <a-card>
    <a-row class="tableTitle" type="flex">
      <a-col :span="15">
        <h1>学生管理</h1>
      </a-col>
      <a-col :span="7">
        <a-input-search placeholder="请输入" @search="onSearch" style="width: 80%"/>
        <a-button  type="primary" @click="onSearch">搜索</a-button>
      </a-col>
      <a-col :span="2" ><a-button  type="primary" @click="consignment('','add')"><a-icon type="plus"/>新增</a-button></a-col>
    </a-row>

    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record" class="actionbutton">
        <a-button type="primary" ghost @click="consignment(record,'update')">修改</a-button>
        <a-button type="primary" ghost  @click="consignment(record,'del')">删除</a-button>
        <a-button type="primary" ghost  @click="consignment(record,'addIntegral')">增加积分</a-button>
        <a-button type="primary" ghost  @click="consignment(record,'cutIntegral')">减少积分</a-button>
        <a-button type="primary" ghost  @click="consignment(record,'recordIntegral')">积分记录</a-button>
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
        <a-form-item label="积分">
          <a-input v-model="input.integral" placeholder="请输入积分"/>
        </a-form-item>
        <a-form-item label="所属战队">
          <a-select v-model="input.team" placeholder="请输入密码">
            <a-select-option v-for="item in teamList" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <div v-show="modal.updateIntegral">
        <a-input-number v-if="modal.inputnumber===true" id="inputNumber" v-model="modal.input" :min="0" :max="9999" placeholder="请输入积分" style="width: 80%"/>
        <a-table v-else :columns="columns1" :data-source="data1"></a-table>
      </div>
    </a-modal>
  </a-card>
</template>

<script>

export default {
  name: "studentMessage",

  data() {
    return {
      modal:{modalShow:false,title:"", aform:false,del:false,updateIntegral:false,text:"",value:1,input:'',inputnumber:true},
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
          title: '注册时间',
          key: 'registerTime',
          dataIndex: 'registerTime',
        },
        {
          title: '操作',
          key: 'action',
          align:'center',
          width:480,
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
      ],
      columns1:[
        {
          title:'增/减',
          dataIndex: 'add',
          key: 'add',
        },
        {
          title:'积分',
          dataIndex: 'integral',
          key: 'integral',
        },
        {
          title:'修改时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
        },
      ],
      data1:[
        {
          key: '1111',
          add:'增加',
          integral: '15',
          updateTime: '2020-10-30 10:32:56',
        },
        {
          key: '222',
          add:'减少',
          integral: '20',
          updateTime: '2020-10-30 13:32:56',
        },
        {
          key: '333',
          add:'增加',
          integral: '19',
          updateTime: '2020-10-30 12:32:56',
        }
      ]
    }
  },

  methods: {
    consignment(record, type){
      if("add"===type){
        this.input={name:"",age:"",class:"",account:"",password1:"",password2:"",integral:"",team:""}
        this.modal={modalShow:true,title:"新建账号", aform:true,del:false,updateIntegral:false,text:"",value:1,input:'',inputnumber:true}
      }
      if("update"===type){
        this.input={name:record.name,age:record.age,class:record.class,account:record.account,password1:"",password2:"",integral:"",team:"",value:1,input:'',inputnumber:true}
        this.modal={modalShow:true,title:"修改账号", aform:true,del:false,updateIntegral:false,text:""}
      }
      if("del"===type){
        this.modal={modalShow:true,title:"删除", aform:false,del:true,updateIntegral:false,text:record.account,value:1,input:'',inputnumber:true}
      }
      if('addIntegral'===type){
        this.modal={modalShow:true,title:"增加积分", aform:false,del:false,updateIntegral:true,text:record.account,value:1,input:'',inputnumber:true}
      }
      if('cutIntegral'===type){
        this.modal={modalShow:true,title:"减少积分", aform:false,del:false,updateIntegral:true,text:record.account,value:1,input:'',inputnumber:true}
      }
      if('recordIntegral'===type){
        this.modal={modalShow:true,title:"积分记录", aform:false,del:false,updateIntegral:true,text:record.account,value:1,input:'',inputnumber:false}
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
@import "css/teacherMessage"
</style>