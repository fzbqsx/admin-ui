<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <div class="headBox">
      <h1 class="headBox-left">课外活动</h1>
      <div class="headBox-right">
        <a-button  type="primary" @click="clickButton('','add')"><a-icon type="plus"/>新建活动</a-button>
      </div>
    </div>

    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record" class="actionbutton">
        <a-button type="primary" ghost @click="clickButton(record,'update')">修改</a-button>
        <a-button type="primary" ghost  @click="clickButton(record,'del')">删除</a-button>
      </span>
    </a-table>
    <a-modal v-model=modal.modalShow  :title=modal.title width="60%" @ok="handleOk" @cancel="handleCancel">
      <div v-if="modal.del" class="delectModal">
        <p>是否确定删除（<span >{{modal.text}}</span>）活动？</p>
      </div>
      <a-form v-else v-model="form"  ref="ruleForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="标题">
          <a-input v-model="form.actionTitle" placeholder="请输入标题"/>
        </a-form-item>
        <a-form-item label="类型">
          <a-input v-model="form.actionType" placeholder="请输入类型"/>
        </a-form-item>
        <a-form-item label="详情页">
          <quill-editor v-model="form.details" ref="myQuillEditor" ></quill-editor>
<!--          <a-textarea v-model="form.details" placeholder="请输入详情信息" :auto-size="{ minRows: 3, maxRows: 15 }"/>-->
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
            <img v-if="form.imageUrl" :src="form.imageUrl" alt="avatar" />
            <div v-else class="ant-upload-text">
              <a-icon :type="form.loading ? 'loading' : 'plus'" />
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="报名条件">
          <a-select
              mode="tags"
              size="large"
              placeholder="Please select"
              :default-value="['a1', 'b2']"
              style="width: 200px"
              @change="selectCondition"
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
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import {mapState} from "vuex";

export default {
  name: "extracurricularActivities",
  components: {
    quillEditor
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  data() {
    return {
      modal:{modalShow:false,title:"", del:false,text:""},
      form:{actionTitle:"",actionType:"",details:"",applyTime:"",actionTime:"",condition:"",imageUrl:"",loading:false},
      columns : [
        {
          title:'标题',
          dataIndex: 'actionTitle',
          key: 'actionTitle',
        },
        {
          title: '类型',
          dataIndex: 'actionType',
          key: 'actionType',
        },
        {
          title: '报名条件',
          dataIndex: 'condition',
          key: 'condition',
        },
        {
          title: '活动时间',
          key: 'actionTime',
          dataIndex: 'actionTime',
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
          actionTitle:'“保护母亲河”环保行动"生态环境调查111',
          actionType: '社会实践',
          condition: '英语专业',
          actionTime: '2020-10-30 10:32:56'
        },
        {
          key: '222',
          actionTitle:'“保护母亲河”环保行动"生态环境调查22',
          actionType: '社会实践',
          condition: '数学专业',
          actionTime: '2020-10-31 14:25:39',
        },
        {
          key: '333',
          actionTitle:'“保护母亲河”环保行动"生态环境调333',
          actionType: '社会实践',
          condition: '英语专业',
          actionTime: '2020-11-01 09:16:22',
        },
        {
          key: '444',
          actionTitle:'“保护母亲河”环保行动"生态环境调444',
          actionType: '社会实践',
          condition: '物理专业',
          actionTime: '2020-11-01 16:41:05',
        },
        {
          key: '555',
          actionTitle:'“保护母亲河”环保行动"生态环境调查555',
          actionType: '社会实践',
          condition: '数学专业',
          actionTime: '2020-11-02 11:19:32',
        },
      ]
    }
  },

  methods: {
    handleOk() {
      if(this.modal.del===false){
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.$message.success("成功！")
            this.handleCancel();
          } else {
            return false;
          }
        });
      }else{
        this.$message.success("删除成功！")
        this.handleCancel();
      }
    },
    handleCancel(){
      console.log(this.modal.del===false)
      if(this.modal.del===false){
        // console.log("=======")
        // this.$refs.ruleForm.resetFields();
      }
      this.modal.modalShow=false
    },
    selectCondition(value){
      console.log(`Selected: ${value}`);
    },
    clickButton(record, type){
      if("add"===type){
        this.input={actionTitle:"",actionType:"",details:"",applyTime:"",actionTime:"",condition:"",imageUrl:"",loading:false};
        this.modal={modalShow:true,title:"新增活动", del:false,text:""}
      }
      if("update"===type){
        this.input={actionTitle:record.actionTitle,actionType:record.actionType,details:record.details,applyTime:"",actionTime:"",condition:"",imageUrl:"",loading:false};
        this.modal={modalShow:true,title:"修改活动", del:false,text:""}
      }
      if("del"===type){
        this.modal={modalShow:true,title:"删除", del:true,text:record.actionTitle}
      }
    },

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
  },


  mounted() {

  }
}
</script>
<style>
.ql-editor {
  min-height: 300px;
  max-height: 600px;
}
</style>
<style scoped lang="sass">
@import "src/pages/commonality/css"

.ant-upload-text
  color: #FFFFFF
  font-size: 35px


</style>