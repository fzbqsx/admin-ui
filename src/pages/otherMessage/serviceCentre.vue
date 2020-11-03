<template>
  <a-card>
    <a-tabs default-active-key="1" >
      <a-tab-pane key="1" tab="服务条款内容">
        <a-textarea v-model="input.termsOfService" placeholder="请输入内容" :auto-size="{ minRows: 5, maxRows: 25 }"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="隐私条款内容" force-render>
        <a-textarea v-model="input.privacyPolicy" placeholder="请输入内容" :auto-size="{ minRows: 5, maxRows: 25 }"/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="关于我们">
        <a-textarea v-model="input.aboutUs" placeholder="请输入内容" :auto-size="{ minRows: 5, maxRows: 25 }"/>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>

export default {
  name: "serviceCentre",

  data() {
    return {
      input:{termsOfService:"",privacyPolicy:"",aboutUs:""}
    }
  },

  methods: {},

  mounted() {

  }
}
</script>

<style scoped lang="sass">

</style>