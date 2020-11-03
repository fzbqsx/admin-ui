<template>
  <a-card>
    <div class="tableTitle">
      <h1>类目管理</h1>
      <a-button  type="primary" @click="consignment('','add')"><a-icon type="plus"/>新增</a-button>
    </div>
    <a-table :columns="columns" :data-source="data">
      <span class="masterImg" slot="masterImg" >
        <img src="../../assets/masterImg/图像 2.png" />
      </span>
      <span slot="action" slot-scope="text, record" class="actionbutton">
        <a-button type="primary" ghost @click="consignment(record,'update')">修改</a-button>
        <a-button type="primary" ghost  @click="consignment(record,'del')">删除</a-button>
      </span>
    </a-table>
    <a-modal v-model=modal.modalShow  :title=modal.title >
      <div v-show="modal.del" class="delectModal">
        <p>是否确定删除（<span >{{modal.text}}</span>）商品？</p>
      </div>
      <a-form v-show="modal.aform" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="标题" >
          <a-input v-model="input.title" placeholder="请输入标题"/>
        </a-form-item>
        <a-form-item label="类目名称" >
          <a-input v-model="input.commodityType" placeholder="请输入类目名称"/>
        </a-form-item>
        <a-form-item label="封面上传">
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
        <a-form-item label="详情页" >
          <a-input v-model="input.commodityDetails" placeholder="请输入详情页"/>
        </a-form-item>
        <a-form-item label="所需积分" >
          <a-input v-model="input.integralPrice" placeholder="请输入所需积分"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>

export default {
  name: "commodityList",
  
  data(){
    return {
      modal:{modalShow:false,title:"", aform:false,del:false,text:""},
      input:{masterImg:"",title:"",integralPrice:"",commodityType:"",commodityDetails:"",imageUrl:"",loading:false},
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
        this.input={masterImg:"",title:"",integralPrice:"",commodityType:"",commodityDetails:"",imageUrl:"",loading:false};
        this.modal={modalShow:true,title:"新建商品", aform:true,del:false,text:""}
      }
      if("update"===type){
        this.input={masterImg:record.masterImg,title:record.title,integralPrice:record.integralPrice,commodityType:record.commodityType,commodityDetails:record.commodityDetails,imageUrl:"",loading:false};
        this.modal={modalShow:true,title:"修改商品", aform:true,del:false,text:""}
      }
      if("del"===type){
        this.modal={modalShow:true,title:"删除", aform:false,del:true,text:record.title}
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