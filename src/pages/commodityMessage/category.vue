<template>
  <a-card>
    <div class="tableTitle">
      <h1>类目管理</h1>
      <a-button  type="primary" @click="consignment('','add')"><a-icon type="plus"/>新增</a-button>
    </div>
    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record" class="actionbutton">
        <a-button type="primary" ghost @click="consignment(record,'update')">修改</a-button>
        <a-button type="primary" ghost  @click="consignment(record,'del')">删除</a-button>
      </span>
    </a-table>
    <a-modal v-model=modal.modalShow  :title=modal.title >
      <div v-show="modal.del" class="delectModal">
        <p>是否确定删除（<span >{{modal.text}}</span>）类目？</p>
      </div>
      <a-form v-show="modal.aform" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="类目名称" >
          <a-input v-model="input.categoryTitle" placeholder="请输入类目名称"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>

export default {
  name: "category",

  data() {
    return {
      modal:{modalShow:false,title:"", aform:false,del:false,text:""},
      input:{categoryTitle:"",time:""},
      columns : [
        {
          title:'标题',
          dataIndex: 'categoryTitle',
          key: 'categoryTitle',
        },
        {
          title: '活动时间',
          key: 'time',
          dataIndex: 'time',
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
          categoryTitle:'学习用品',
          time: '2020-10-30 10:32:56'
        },
        {
          key: '222',
          categoryTitle:'生活用品',
          time: '2020-10-31 14:25:39',
        },
        {
          key: '333',
          categoryTitle:'娱乐用品',
          time: '2020-11-01 09:16:22',
        },
      ]
    }
  },

  methods: {

    consignment(record, type){
      if("add"===type){
        this.input={categoryTitle:"",time:""};
        this.modal={modalShow:true,title:"新增类目", aform:true,del:false,text:""}
      }
      if("update"===type){
        this.input={categoryTitle:record.categoryTitle,time:record.time};
        this.modal={modalShow:true,title:"修改类目", aform:true,del:false,text:""}
      }
      if("del"===type){
        this.modal={modalShow:true,title:"删除", aform:false,del:true,text:record.categoryTitle}
      }

    },

  },

  mounted() {

  }
}
</script>

<style scoped lang="sass">
@import "css/category"
</style>