<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <div class="headBox">
      <h1 class="headBox-left">商品管理</h1>
      <div class="headBox-right">
        <a-input-search class="headBox-right-item" v-model="searchInput.name" placeholder="请输入" @search="onSearch" />
        <a-button  type="primary" @click="clickButton('','add')"><a-icon type="plus"/>新增</a-button>
      </div>
    </div>

    <a-table :columns="columns" :data-source="data">
      <span class="masterImg" slot="masterImg" >
        <img src='../../assets/masterImg/图像 2.png' />
      </span>
      <span slot="action" slot-scope="text, record" class="actionbutton">
        <a-button type="primary" ghost @click="clickButton(record,'update')">修改</a-button>
        <a-button type="primary" ghost  @click="clickButton(record,'del')">删除</a-button>
      </span>
    </a-table>
    <a-modal v-model=modal.modalShow  :title=modal.title @ok="handleOk" @cancel="handleCancel" width="60%">
      <div v-if="modal.del" class="delectModal">
        <p>是否确定删除（<span >{{modal.text}}</span>）商品？</p>
      </div>
      <a-form-model v-else :model="form" :rules="rules" ref="ruleForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
        <a-form-model-item label="标题" ref="title" prop="title">
          <a-input v-model="form.title" placeholder="请输入标题" @blur="() => { $refs.title.onFieldBlur(); }"/>
        </a-form-model-item>
        <a-form-model-item label="类目名称" prop="categoryName">
          <a-select v-model="form.categoryName" placeholder="请选择类目">
            <a-select-option v-for="item in categoryNameList" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="封面上传">
          <a-upload
              name="avatar"
              list-type="picture-card"
              action="D:/VueWork/vue-antd-admin/src/assets/img"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              @change="handleChange"
          >
            <img v-if="form.imageUrl" :src="form.imageUrl" alt="avatar" />
            <div v-else class="ant-upload-text">
              <a-icon :type="form.loading ? 'loading' : 'plus'" />
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item label="详情页" ref="commodityDetails" prop="commodityDetails" >
          <quill-editor v-model="form.commodityDetails" ref="myQuillEditor" @blur="() => { $refs.commodityDetails.onFieldBlur(); }"></quill-editor>
        </a-form-model-item>
        <a-form-model-item label="所需积分" ref="integralPrice" prop="integralPrice">
          <a-input-number style="width: 295px" v-model="form.integralPrice" :min="0" :max="999999" placeholder="请输入所需积分" @blur="() => { $refs.integralPrice.onFieldBlur(); }"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import {mapState} from "vuex";

export default {
  name: "commodityList",
  components: {
    quillEditor
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  data(){

    return {
      searchInput:{name:""},
      categoryNameList:[{id:'1',name:'生活用品'},{id:'2',name:'学习用品'},{id:'3',name:'果蔬类'},{id:'4',name:'生鲜类'}],
      modal:{modalShow:false,title:"", del:false,text:""},
      form:{title:"",categoryName:"", commodityDetails:"",integralPrice:"0",imageUrl:"",loading:false},
      rules:{
        title: { required: true, message: '请输入标题', trigger: 'blur'},
        categoryName: { required: true, message: '请选择类目名称', trigger: 'change'},
        commodityDetails:{required: true, message: '请输商品详情信息', trigger: 'blur'},
        integralPrice:{required: true, message: '请输入所需积分', trigger: 'blur'}
      },

      columns : [
        {
          title:'主图',
          dataIndex: 'masterImg',
          key: 'masterImg',
          scopedSlots: { customRender: 'masterImg' },
        },
        {
          title: '标题',
          key: 'title',
          dataIndex: 'title',
        },
        {
          title: '积分价格',
          key: 'integralPrice',
          dataIndex: 'integralPrice',
        },
        {
          title: '销量',
          key: 'salesVolume',
          dataIndex: 'salesVolume',
        },
        {
          title: '创建时间',
          key: 'createTime',
          dataIndex: 'createTime',
        },
        {
          title: '操作',
          key: 'action',
          align:'center',
          width:300,
          scopedSlots: { customRender: 'action' },
        },
      ],

      data : [
        {
          key: '1111',
          title:'学习用品',
          integralPrice:'2000',
          salesVolume:'45',
          createTime: '2020-10-30 10:32:56'
        },
        {
          key: '222',
          title:'娱乐用品',
          integralPrice:'2000',
          salesVolume:'45',
          createTime: '2020-10-31 14:25:39',
        },
        {
          key: '333',
          title:'娱乐用品',
          integralPrice:'2000',
          salesVolume:'45',
          createTime: '2020-11-01 09:16:22',
        },
      ]
    }
  },
  
  methods:{
    handleOk() {
      if(this.modal.del===false){
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.$message.success("成功！")
            console.log(this.form.title)
            console.log(this.form.categoryName)
            console.log(this.form.commodityDetails)
            console.log(this.form.integralPrice)
            console.log(this.form.imageUrl)
            this.handleCancel();
          } else {
            return false;
          }
        });
      }else {
        this.$message.success("删除成功！")
        this.handleCancel()
      }
    },
    onSearch(){
      console.log(this.searchInput.name)
    },
    handleCancel(){
      if(this.modal.del===false){
        this.$refs.ruleForm.resetFields();
      }
      this.modal.modalShow=false
    },

    //打开modal框并初始化数据
    clickButton(record, type){
      if("add"===type){
        this.form={title:"",commodityDetails:"",integralPrice:"0",imageUrl:"",loading:false};
        this.modal={modalShow:true,title:"新建商品", del:false,text:""}
      }
      if("update"===type){
        this.form={title:record.title,categoryName:record.categoryName,commodityDetails:record.commodityDetails,integralPrice:record.integralPrice,imageUrl:record.masterImg,loading:false};
        this.modal={modalShow:true,title:"修改商品", del:false,text:""}
      }
      if("del"===type){
        this.modal={modalShow:true,title:"删除", del:true,text:record.title}
      }
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
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    },
  },
  
  mounted() {
    
  }
}
</script>
<style>
.ant-form-item-required::before{
  display: none;
}
.ql-editor {
  min-height: 300px;
  max-height: 600px;
}
</style>
<style scoped lang="sass">
@import "src/pages/commonality/css"
@import "css"

</style>