<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="课程查询">
        <a-table :columns="courseColumns" :data-source="courseData">
          <span slot="courseAction" slot-scope="text, record" class="actionbutton">
            <a-button type="primary" ghost @click="consignment(record,'viewDetailsCourse')">查看课表</a-button>
            <a-button type="primary" ghost @click="consignment(record,'viewDetailsCourse')">修改</a-button>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="课程进度查询" force-render>
        <a-table :columns="courseScheduleColumns" :data-source="courseScheduleData">
          <span slot="courseScheduleAction" slot-scope="text, record" class="actionbutton">
            <a-button type="primary" ghost @click="consignment(record,'viewDetailsCourseSchedule')">查看课表</a-button>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="3" tab="月度课程表">
        <a-table :columns="courseColumns" :data-source="courseData">
          <span slot="courseAction" slot-scope="text, record" class="actionbutton">
            <a-button type="primary" ghost @click="consignment(record,'viewDetailsMonthly')">查看课表</a-button>
            <a-button type="primary" ghost @click="consignment(record,'updateMonthly')">修改</a-button>
          </span>
        </a-table>
      </a-tab-pane>
      <a-row slot="tabBarExtraContent" style="width: 350px">
        <a-col v-if="tabsShow.input===true && tabsShow.button===true"  span="16"><a-input-search  placeholder="请输入" @search="onSearch" /> </a-col>
        <a-col v-if="tabsShow.input===true && tabsShow.button===false"   span="24"><a-input-search  placeholder="请输入" @search="onSearch" /> </a-col>
        <a-col v-if="tabsShow.button===true" span="8" style="text-align: center"> <a-button type="primary" @click="consignment('','viewDetailsCourse')"><a-icon type="plus"/>新建课程</a-button></a-col>
      </a-row>
    </a-tabs>
    <a-modal v-model=modal.modalShow width="60%" :title=modal.title >
      <div v-show="modal.course">
        <a-row >
          <span style="float: left">课程名称：</span>
          <a-col span="8">
            <a-input value="零基础单词入门课程">零基础单词入门课程</a-input>
          </a-col>
        </a-row>
        <a-row style="margin: 15px 0">
          <a-col span="5">
            <span style="float: left">专业：</span>
              <a-select default-value="英语专业asdsafa"  >
                <a-select-option value="英语专业">
                  英语专业
                </a-select-option>
                <a-select-option value="数学专业sdfdsgfs">
                  数学专业
                </a-select-option>
              </a-select>
          </a-col>
          <a-col span="4">
            <span style="float: left">年级：</span>
              <a-select default-value="二年级"  >
                <a-select-option value="二年级">
                  二年级
                </a-select-option>
                <a-select-option value="三年级">
                  三年级
                </a-select-option>
              </a-select>
          </a-col>
          <a-col span="5">
            <span style="float: left">班级：</span>
              <a-select default-value="C1"  >
                <a-select-option value="C1">
                  C1
                </a-select-option>
                <a-select-option value="C2">
                  C2
                </a-select-option>
              </a-select>
          </a-col>
          <a-col span="5">
            <span style="float: left">打卡设置：</span>
              <a-select default-value="蓝牙打卡"  >
                <a-select-option value="蓝牙打卡">
                  蓝牙打卡
                </a-select-option>
                <a-select-option value="人脸打卡">
                  人脸打卡
                </a-select-option>
              </a-select>
          </a-col>
          <a-col span="5">
            <span style="float: left">设备型号：</span>
              <a-select default-value="华为"  >
                <a-select-option value="华为">
                  华为
                </a-select-option>
                <a-select-option value="小米">
                  小米
                </a-select-option>
              </a-select>
          </a-col>
        </a-row>
        <a-row style="margin: 15px 0">
          <span>上课时间：</span>
          <a-range-picker show-time v-model="input.applyTime" :header-render="headerRender">
            <template slot="renderExtraFooter">
            </template>
          </a-range-picker>
          <span>重复：</span>
          <a-input value="周一、周二" style="width: 300px">周一、周二</a-input>
        </a-row>
        <a-row style="margin: 15px 0;display: flex;align-items: center ">
          <span>封面视频：</span>
          <a-upload style="width: 70px"
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
        </a-row>
        <a-row class="clockInRule" style="margin: 15px 0">
          <span>打卡规则：</span>
          <span>上课前：<a-select default-value="15"  >
                <a-select-option value="15">
                  15
                </a-select-option>
                <a-select-option value="10">
                  10
                </a-select-option>
              </a-select>分钟内
          </span>
          <span>下课后：<a-select default-value="15"  >
                <a-select-option value="15">
                  15
                </a-select-option>
                <a-select-option value="10">
                  10
                </a-select-option>
              </a-select>分钟
          </span>
        </a-row>
        <a-row class="actionbutton">
          <a-button type="primary" @click="consignment(record,'updateCourse')">确认</a-button>
          <a-button type="primary" @click="consignment(record,'updateCourse')">取消</a-button>
        </a-row>
        <span>预览：</span>
        <a-calendar  >
          <div slot="dateCellRender" slot-scope="value" >
            <div v-for="item in getListData(value)" :key="item.content" style="background: #1890ff;color: white;margin: 5px 0;line-height: 2;text-align: center">
              <span >{{item.content}}</span>
            </div>
          </div>
        </a-calendar>
      </div>
      <div v-show="modal.updateCourse">
        <h1>修改课程表</h1>
      </div>
      <div v-show="modal.courseSchedule">
        <a-row style="margin: 15px">
          <span style="float: left">姓名：</span>
          <a-col span="8">
            <a-input v-model="input.name"/>
          </a-col>
        </a-row>
        <a-row style="margin: 15px 0">
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

        <a-table :columns="courseScheduleDetailColumns" :data-source="courseScheduleDetailData">

        </a-table>
      </div>
      <div v-show="modal.viewDetailsMonthly">
        <a-row style="margin: 15px">
          <span style="float: left">课程名称：</span>
          <a-col span="8">
            <a-input v-model="input.courseName"/>
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
<!--        :header-render="headerRender"-->
        <a-calendar  >
          <div slot="dateCellRender" slot-scope="value" >
            <div v-for="item in getListData(value)" :key="item.content" style="background: #1890ff;color: white;margin: 5px 0;line-height: 2;text-align: center">
              <span >{{item.content}}</span>
            </div>
          </div>
        </a-calendar>
      </div>
      <div v-show="modal.updateMonthly">
        <h1>修改月度课程表</h1>
      </div>
    </a-modal>
  </div>
</template>

<script>
import 'moment/locale/zh-cn'
import {mapState} from "vuex";
export default {
  name: "courseData",
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  data() {
    return {
      tabsShow:{input:false,button:false},
      input:{termsOfService:"",privacyPolicy:"",aboutUs:"",renderDate:"",content:""},
      modal:{modalShow:false,title:"", aform:false,text:"",courseSchedule:false,updateCourse:false,course:false,viewDetailsMonthly:false,updateMonthly:false},
      courseColumns:[
        {
          title:'课程名称',
          dataIndex:'courseName',
          key:'courseName',
        },
        {
          title:'专业',
          dataIndex:'major',
          key:'major',
        },
        {
          title:'年级',
          dataIndex:'grade',
          key:'grade',
        },
        {
          title:'班级',
          dataIndex:'class',
          key:'class',
        },
        {
          title:"操作",
          dataIndex: 'courseAction',
          align:'center',
          scopedSlots: { customRender: 'courseAction' },
        }
      ],
      courseData:[
        {
          key:'111',
          courseName:'零基础课程入门',
          major:'英语专业',
          grade:'二年级',
          class:'G12332',
        }
      ],
      courseScheduleColumns:[
        {
          title:'专业',
          dataIndex:'major',
          key:'major',
        },
        {
          title:'年级',
          dataIndex:'grade',
          key:'grade',
        },
        {
          title:'班级',
          dataIndex:'class',
          key:'class',
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '课程总进度',
          dataIndex: 'courseSchedule',
          key: 'courseSchedule'
        },
        {
          title:"操作",
          dataIndex: 'courseScheduleAction',
          align:'center',
          scopedSlots: { customRender: 'courseScheduleAction' },
        }
      ],
      courseScheduleData:[
        {
          key:'111',
          major:'英语专业',
          grade:'二年级',
          class:'G12332',
          name:'陈晓',
          courseSchedule:'95%'
        }
      ],
      courseScheduleDetailColumns:[
        {
          title: '课程名称',
          dataIndex: 'courseName',
          key: 'courseName'
        },
        {
          title: '课程进度',
          dataIndex: 'courseSchedule',
          key: 'courseSchedule'
        },
      ],
      courseScheduleDetailData:[
        {
          key:'111',
          courseName:'英语零基础课程入门',
          courseSchedule:'95%'
        },
        {
          key:'222',
          courseName:'英语零基础课程入门',
          courseSchedule:'95%'
        }
      ],


    }
  },

  methods: {
    headerRender({ value, type, onChange, onTypeChange }) {

      console.log(value)
      console.log(type)
      console.log(onChange)
      console.log(onTypeChange)

    },
    getListData(value){
      var time;
      switch (value.date()){
        case 4:
          time=[{timea:4,content:"10:00:00 开始" },{timea:4,content:"13:30:00 开始" }];
          break;
        case 6:
          time=[{timea:6,content:"09:00:00 开始" }];
          break;
      }
      return time || [];

      //console.log(value.years()+"-"+value.month();+"-"+value.date()+" "+value.hours()+":"+value.minutes()+":"+value.seconds())

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
    callback(key){
      if("1"===key){
        this.tabsShow={input: true,button: true};
      }else if("2"===key){
        this.tabsShow={input: false,button: false};
      }else if("3"===key){
        this.tabsShow={input: true,button: false};
      }
    },

    onSearch(){
      console.log("点击搜索")
    },

    consignment(record, type){
      if("viewDetailsCourse"===type){
        this.input={name:record.name,major:record.major,grade:record.grade,class:record.class};
        this.modal={modalShow:true,title:"查看课表", aform:true,text:"",courseSchedule:false,updateCourse:false,course:true,viewDetailsMonthly:false,updateMonthly:false};
      }
      if("updateCourse"===type){
        this.input={name:record.name,major:record.major,grade:record.grade,class:record.class};
        this.modal={modalShow:true,title:"修改课表", aform:true,text:"",courseSchedule:false,updateCourse:true,course:false,viewDetailsMonthly:false,updateMonthly:false}
      }
      if("viewDetailsCourseSchedule"===type){
        this.input={name:record.name,major:record.major,grade:record.grade,class:record.class};
        this.modal={modalShow:true,title:"课程进度查询", aform:true,text:"",courseSchedule:true,updateCourse:false,course:false,viewDetailsMonthly:false,updateMonthly:false}
      }
      if("viewDetailsMonthly"===type){
        this.input={name:record.name,major:record.major,grade:record.grade,class:record.class};
        this.modal={modalShow:true,title:"月度课程查询", aform:true,text:"",courseSchedule:false,updateCourse:false,course:false,viewDetailsMonthly:true,updateMonthly:false}
      }
      if("updateMonthly"===type){
        this.input={name:record.name,major:record.major,grade:record.grade,class:record.class};
        this.modal={modalShow:true,title:"修改月度课程表", aform:true,text:"",courseSchedule:false,updateCourse:false,course:false,viewDetailsMonthly:false,updateMonthly:true}
      }
    },
  },

  mounted() {
    this.callback("1")
  }
}
</script>

<style scoped lang="sass">
@import "src/pages/commonality/css"
//@import "css/courseData"
</style>