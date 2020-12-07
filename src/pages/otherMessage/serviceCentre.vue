<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <div class="headBox">
      <a-button class="headBox-left" type="primary" @click="clickButton">保存</a-button>
    </div>
    <a-tabs :default-active-key=input.key @change="callback">
      <a-tab-pane key="1" tab="服务条款内容">
        <quill-editor v-model="input.termsOfService" ref="myQuillEditor" ></quill-editor>
      </a-tab-pane>
      <a-tab-pane key="2" tab="隐私条款内容" force-render>
        <quill-editor v-model="input.privacyPolicy" ref="myQuillEditor" ></quill-editor>
      </a-tab-pane>
      <a-tab-pane key="3" tab="关于我们">
        <quill-editor v-model="input.aboutUs" ref="myQuillEditor" ></quill-editor>
      </a-tab-pane>
    </a-tabs>

  </div>
</template>

<script>
import {mapState} from "vuex";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  name: "serviceCentre",
  components: {
    quillEditor
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  data() {
    return {
      input:{key:"1",termsOfService:"",privacyPolicy:"",aboutUs:""}
    }
  },

  methods: {
    callback(key){
      this.input.key=key
    },
    clickButton(){
      console.log(this.input.key)
      this.$message.success("点击保存")
    }
  },

  mounted() {

  }
}
</script>
<style>
.ql-editor {
  height: 535px;
}
</style>
<style scoped lang="sass">
@import "src/pages/commonality/css"
</style>