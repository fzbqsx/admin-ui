<template>
  <a-card>
    <div class="tableTitle">
      <h1>打卡数据</h1>
    </div>
    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record" class="actionbutton">
        <a-button type="primary" ghost @click="consignment(record,'inquire')">查看详情</a-button>
      </span>
    </a-table>
    <a-modal class="model" v-model=modal.modalShow width="60%" :title=modal.title :footer="null">
      <a-form-model :model="form" :label-col="{ span: 1 }" :wrapper-col="{ span: 15 }" labelAlign="left">
        <a-form-model-item label="姓名" >
          <a-input v-model="form.name" :disabled=true />
        </a-form-model-item>
      </a-form-model>
      <a-form-model :model="form" layout="inline">
        <a-form-model-item label="专业" >
          <a-input v-model="form.major" :disabled=true />
        </a-form-model-item>
        <a-form-model-item label="年级" >
          <a-input v-model="form.grade" :disabled=true />
        </a-form-model-item>
        <a-form-model-item label="班级" >
          <a-input v-model="form.class" :disabled=true />
        </a-form-model-item>
      </a-form-model>
      <a-table :columns="clockIncolumns" :data-source="clockIndata">
      </a-table>
    </a-modal>
  </a-card>
</template>

<script>

export default {
  name: "clockInData",

  data() {
    return {
      modal:{modalShow:false,title:"" },
      form:{name:"",major:"",grade:"",class:""},
      data:[
        {
          key:'111',
          name:'陈晓',
          major:'英语专业',
          grade:'二年级',
          class:'G12332',
          attendanceRate:'95%'
        },
        {
          key:'222',
          name:'陈晓22',
          major:'英语专业',
          grade:'二年级',
          class:'G12332',
          attendanceRate:'95%'
        },{
          key:'333',
          name:'陈晓33',
          major:'英语专业',
          grade:'二年级',
          class:'G12332',
          attendanceRate:'95%'
        }
      ],
      columns:[
        {
          title:"姓名",
          dataIndex: 'name',
          key: 'name',
        },{
          title:"专业",
          dataIndex: 'major',
          key: 'major',
        },{
          title:"年级",
          dataIndex: 'grade',
          key: 'grade',
        },{
          title:"班级",
          dataIndex: 'class',
          key: 'class',
        },{
          title:"出勤率",
          dataIndex: 'attendanceRate',
          key: 'attendanceRate',
        },{
          title:"操作",
          dataIndex: 'action',
          align:'center',
          width: 300,
          scopedSlots: { customRender: 'action' },
        }
      ],
      clockIncolumns:[
        {
          title:"全部课程",
          dataIndex: 'curriculum',
          key: 'curriculum',
        },
        {
          title:"打卡时间",
          dataIndex: 'clockInTime',
          key: 'clockInTime',
        },
        {
          title:"全部打卡",
          dataIndex: 'allClockIn',
          key: 'allClockIn',
        }
      ],
      clockIndata:[
        {
          key:"111",
          curriculum:"英语零基础课程入门",
          clockInTime:"2020-09-10 08:48:01",
          allClockIn:"上课打卡"
        },{
          key:"222",
          curriculum:"英语零基础课程入门",
          clockInTime:"2020-09-10 08:48:01",
          allClockIn:"下课打卡"
        },{
          key:"333",
          curriculum:"英语零基础课程入门",
          clockInTime:"2020-09-10 08:48:01",
          allClockIn:"上课打卡"
        }
      ]
    }
  },

  methods: {
    consignment(record, type){
      if("inquire"===type){
        this.form={name:record.name,major:record.major,grade:record.grade,class:record.class};
        this.modal={modalShow:true,title:"打卡查询"}
      }
    },
  },

  mounted() {

  }
}
</script>

<style scoped lang="sass">
@import "../../pages/commonality/css/unified"
.model
  form:nth-child(2)
    margin-bottom: 25px
  input
    color: #000000
</style>