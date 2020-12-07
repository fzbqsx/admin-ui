<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <div class="headBox">
      <h1 class="headBox-left">查看报名</h1>
      <div class="headBox-right">
        <a-input-search class="headBox-right-item" v-model="searchInput.name" placeholder="请输入" @search="onSearch" />
        <a-button class="headBox-right-item" type="primary" icon="search" @click="onSearch">搜索</a-button>
      </div>
    </div>
    <a-table :columns="columns" :data-source="data"></a-table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "entryForm",
  computed: {
    ...mapState( 'setting', ['pageMinHeight']),
  },
  data() {
    return {
      searchInput:{name:""},
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
          title: '班级',
          key: 'class',
          dataIndex: 'class',
        },
        {
          title: '报名时间',
          key: 'registerTime',
          dataIndex: 'registerTime',
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
    onSearch(){
      console.log(this.searchInput.name)
    }
  },

  mounted() {

  }
}
</script>

<style scoped lang="sass">
@import "src/pages/commonality/css"
@import "./css"
</style>