<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <div class="headBox">
      <h1 class="headBox-left">战队管理</h1>
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
        <p>是否确定删除（<span >{{modal.text}}</span>）战队？</p>
      </div>
      <a-form v-show="modal.aform" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="战队名称" >
          <a-input v-model="input.name" placeholder="请输入战队名称"/>
        </a-form-item>
        <a-form-item label="创建人">
          <a-input v-model="input.account" placeholder="请输入创建人"/>
        </a-form-item>
        <a-form-item label="班级">
          <a-input v-model="input.class" placeholder="请输入班级"/>
        </a-form-item>
        <a-form-item label="专业">
          <a-input v-model="input.major" placeholder="请输入专业"/>
        </a-form-item>
        <a-form-item label="战队头像">
          <a-upload
              name="avatar"
              list-type="picture-card"
              action="D:/VueWork/vue-antd-admin/src/assets/img"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              @change="handleChange"
          >
            <img v-if="input.imageUrl" :src="input.imageUrl" alt="avatar" />
            <div v-else class="ant-upload-text">
              <a-icon :type="input.loading ? 'loading' : 'plus'" />
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "teamList",
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  data(){
    return {
      searchInput:{name:""},
      modal:{modalShow:false,title:"", aform:false,del:false,text:""},
      input:{name:"",major:"",class:"",account:"",team:"",imageUrl:"",loading:false},
      columns : [
        {
          title:'战队名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '创建人',
          dataIndex: 'account',
          key: 'account',
        },
        {
          title: '专业',
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
          name:'战队1',
          account: '11111111',
          major: '英语专业',
          class: 'C111',
          registerTime: '2020-10-30 10:32:56'
        },
        {
          key: '222',
          name:'战队2',
          account: '22222',
          major: '数学专业',
          class: 'C112',
          registerTime: '2020-10-31 14:25:39',
        },
        {
          key: '333',
          name:'战队3',
          account: '333333',
          major: '英语专业',
          class: 'C112',
          registerTime: '2020-11-01 09:16:22',
        },
        {
          key: '444',
          name:'战队4',
          account: '4444444',
          major: '物理专业',
          class: 'C111',
          registerTime: '2020-11-01 16:41:05',
        },
        {
          key: '555',
          name:'战队5',
          account: '5555555',
          major: '数学专业',
          class: 'C111',
          registerTime: '2020-11-02 11:19:32',
        },
      ]
    }
  },
  
  methods:{
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        this.getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('不支持该图片类型!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('图片大小不能超过2M!');
      }
      return isJpgOrPng && isLt2M;
    },
    consignment(record, type){
      if("add"===type){
        this.input={name:"",major:"",class:"",account:"",team:""}
        this.modal={modalShow:true,title:"新增战队", aform:true,del:false,text:""}
      }
      if("update"===type){
        this.input={name:record.name,major:record.major,class:record.class,account:record.account}
        this.modal={modalShow:true,title:"修改战队", aform:true,del:false,text:""}
      }
      if("del"===type){
        this.modal={modalShow:true,title:"删除", aform:false,del:true,text:record.name}
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
@import "css/teamMessage"
</style>