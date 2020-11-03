<template>
  <a-card>
    <div class="tableTitle">
      <h1>打卡数据</h1>
    </div>
    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record" class="actionbutton">
        <a-button type="primary" ghost @click="consignment(record,'update')">查看详情</a-button>
      </span>
    </a-table>
    <a-modal v-model=modal.modalShow width="60%" :title=modal.title >
      <div>
        <a-form v-show="modal.aform" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
          <a-form-item label="姓名" >
            <a-input v-model="input.name"/>
          </a-form-item>
          <a-row >
            <a-col span="8">
              <a-form-item label="专业" >
                <a-input v-model="input.major"/>
              </a-form-item>
            </a-col>
            <a-col span="8">
              <a-form-item label="年级" >
                <a-input v-model="input.grade"/>
              </a-form-item>
            </a-col>
            <a-col span="8">
              <a-form-item label="班级" >
                <a-input v-model="input.class"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-table :columns="clockIncolumns" :data-source="clockIndata">
            <span slot="action" slot-scope="text, record" class="actionbutton">
              <a-button type="primary" ghost @click="consignment(record,'update')">查看详情</a-button>
            </span>
          </a-table>
        </a-form>
      </div>
    </a-modal>
  </a-card>
</template>

<script>

export default {
  name: "JobData",

  data() {
    return {}
  },

  methods: {},

  mounted() {

  }
}
</script>

<style scoped lang="sass">

</style>