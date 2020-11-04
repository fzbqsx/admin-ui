<template>
  <a-card>
    <div class="tableTitle">
      <h1>学生作业数据</h1>
    </div>
    <a-table :columns="columns" :data-source="data">
      <span slot="action" slot-scope="text, record" class="actionbutton">
        <a-button type="primary" ghost @click="consignment(record,'viewDetails')">查看详情</a-button>
      </span>
    </a-table>
    <a-modal v-model=modal.modalShow width="60%" :title=modal.title >
      <div>
        <a-row style="margin: 15px">
          <span style="float: left">姓名：</span>
          <a-col span="8">
            <a-input v-model="input.name"/>
          </a-col>
        </a-row>
        <a-row style="margin: 15px">
          <a-col span="8">
            <span style="float: left">专业：</span>
            <a-col span="20">
              <a-input v-model="input.major"/>
            </a-col>
          </a-col>
          <a-col span="8">
            <span style="float: left">年级：</span>
            <a-col span="20">
              <a-input v-model="input.grade"/>
            </a-col>
          </a-col>
          <a-col span="8">
            <span style="float: left">班级：</span>
            <a-col span="20">
              <a-input v-model="input.class"/>
            </a-col>
          </a-col>
        </a-row>
        <a-table :columns="clockIncolumns" :data-source="clockIndata">
            <span slot="action" slot-scope="text, record" class="actionbutton">
              <a-button type="primary" ghost @click="consignment(record,'update')">查看详情</a-button>
            </span>
        </a-table>
      </div>
    </a-modal>
  </a-card>
</template>

<script>

export default {
  name: "JobData",

  data() {
    return {
      modal:{modalShow:false,title:"", aform:false,text:""},
      input:{name:"",major:"",grade:"",class:""},
      data:[
        {
          key:'111',
          name:'陈晓',
          major:'英语专业',
          grade:'二年级',
          class:'G12332',
          JobSubmitRate:'95%',
          JobSubmitFrequency:'9/10'
        },
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
          dataIndex: 'JobSubmitRate',
          key: 'JobSubmitRate',
        },{
          title:"提交次数",
          dataIndex: 'JobSubmitFrequency',
          key: 'JobSubmitFrequency',
        },{
          title:"操作",
          dataIndex: 'action',
          align:'center',
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
          title:"上课时间",
          dataIndex: 'attendClassTime',
          key: 'attendClassTime',
        },
        {
          title:"完成时间",
          dataIndex: 'finishTime',
          key: 'finishTime',
        },
      ],
      clockIndata:[
        {
          key:"111",
          curriculum:"英语零基础课程入门",
          attendClassTime:"2020-09-10 08:30:01",
          finishTime:"2020-09-10 18:50:01"
        },
      ]
    }
  },

  methods: {
    consignment(record, type){
      if("viewDetails"===type){
        this.input={name:record.name,major:record.major,grade:record.grade,class:record.class};
        this.modal={modalShow:true,title:"打卡查询", aform:true,del:false,text:""}
      }
    },
  },

  mounted() {

  }
}
</script>

<style scoped lang="sass">

</style>