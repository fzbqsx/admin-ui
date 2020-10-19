<template>
  <div class="orderDetailsBodyDiv" style="display: flex;justify-content: center;width: 100%">
    <div class="orderDetailsBody" style="width: 80%;">
      <span class="hintSpan">请您根据步骤提示下单</span><br />
      <div style="width: 100%">
        <span class="hintSpan">1.选择发货人</span>
        <div class="shipperBox">
          <div class="select shipperSelect">
            <select placeholder="请选择发货人" v-model="shipperId">
              <option
                  v-for="item in shipperList"
                  :value="item.id"
                  v-bind:key="item.id"
              >{{ item.name }}</option>
            </select>
          </div>
          <div class="buttonBox">
            <button class="button shipperButton" @click="delectShopper">
              删除
            </button>
            <button class="button shipperButton" @click="defaultShopper">
              设为默认
            </button>
            <button class="button shipperButton" @click="addShopper">
              添加发货人
            </button>
          </div>
        </div>
        <modal v-model="deleteModal" title="删除发货人" width="60%" class-name="vertical-center-modal">
          <div style="font-size: 16px;font-family: Source Han Sans CN;text-align: center">是否确定删除 <span style="color: red;font-size: 18px"> {{ shipperName }} </span> ？</div>
          <div class="shipperModalButton" slot="footer" style="text-align: center">
            <button class="button shipperButton" @click="deleteOk"> 确定 </button>
            <button class="button shipperButton" @click="deleteClose">取消</button>
          </div>
        </modal>
        <Modal
            title="添加收货地址"
            v-model="shipperModal"
            width="60%"
            class-name="vertical-center-modal">
          <div>
            <div class="addShipperInfo">
              <div style="width: 15%; ">
                <span style="color: red">*</span><span class="addShipperSpan">发件人姓名</span>
              </div>
              <div style="width: 80%">
                <Input
                    class="addShipperInput"
                    placeholder="请输入发件人姓名"
                    size="large"
                    v-model="addresser.name"/>
              </div>
            </div>
            <div class="addShipperInfo">
              <div style="width: 15%;">
              <span style="color: red">*</span
              ><span class="addShipperSpan">发件人手机</span>
              </div>
              <div style="width: 80%">
                <Input
                    class="addShipperInput"
                    placeholder="请输入发件人手机号"
                    size="large"
                    v-model="addresser.phone"
                />
              </div>
            </div>
            <div class="addShipperInfo">
              <div style="width: 15%;">
              <span style="color: red">*</span
              ><span class="addShipperSpan">发件人地址</span>
              </div>
              <div
                  style="width: 80%; display: flex;justify-content: space-between;align-items: center;"
              >
                <!-- @change="getProvinceId($event)" -->
                <div class="select shipperSelect">
                  <select
                      @change="getProvinceId"
                      placeholder="请选择省份"
                      v-model="provinceId"
                  >
                    <option
                        v-for="item in provinceList"
                        :value="item.code"
                        v-bind:key="item.id"
                    >{{ item.name }}</option
                    >
                  </select>
                </div>
                <div class="select shipperSelect">
                  <select
                      @change="getCityId"
                      v-model="cityId"
                      placeholder="请选择城市"
                  >
                    <option
                        v-for="item in cityList"
                        :value="item.code"
                        :key="item.id"
                    >{{ item.name }}</option
                    >
                  </select>
                </div>
                <div class="select shipperSelect" style="margin: 0">
                  <select

                      v-model="districtId"
                      placeholder="请选择地区"
                  >
                    <option
                        v-for="item in districtList"
                        :value="item.code"
                        :key="item.id"
                    >{{ item.name }}</option
                    >
                  </select>
                </div>
              </div>
            </div>
            <div class="addShipperInfo">
              <div style="width: 15%;">
              <span style="color: red">*</span
              ><span class="addShipperSpan">详细地址</span>
              </div>
              <div style="width: 80%">
                <Input
                    style="width: 100%"
                    class="addShipperInput"
                    placeholder="请输入详细地址"
                    size="large"
                    v-model="addresser.address"
                />
              </div>
            </div>
          </div>
          <div
              class="shipperModalButton"
              slot="footer"
              style="text-align: center">
            <button class="button shipperButton" @click="addShopperOk">
              确定
            </button>
            <button class="button shipperButton" @click="close">取消</button>
          </div>
        </Modal>
      </div>

      <div style="width: 100%">
        <span class="hintSpan">2.选择仓库</span>
        <div class="control depotBox" >
          <label class="radio" @click="selectDepot" v-for="item in depotList" v-bind:key="item.id">
            <input
                type="radio"
                name="depotName"
                v-model="depotId"
                :value="item.id"
            />
            {{ item.name }}
          </label>
        </div>
      </div>

      <div style="width: 100%">
        <span class="hintSpan">3.选择快递</span><br />
        <div class="select expressSelect">
          <select  placeholder="请先选择仓库">
            <option
                v-for="item in expressList"
                :value="item.express.id"
                v-bind:key="item.express.id"
            >{{ item.express.name }}</option
            >
          </select>
        </div>
      </div>

      <div style="width: 100%">
        <span class="hintSpan">4.选择商品</span><br />
        <div v-show="presentImg" class="selectPresent" @click="addPresent()">
          <img src="../../assets/giftShop/路径 4283.png" />
        </div>
        <div>
          <Table
              v-show="presentTable1"
              size="small"
              ref="selection"
              :columns="presentTableTitle1"
              :data="presentTableList1"
          ></Table>
          <div slot="footer" v-show="false"></div>
        </div>
      </div>
      <Modal
          title="您可以在这里选购您想要的商品"
          v-model="presentModal"
          width="60%"
          class="present_modal"
          class-name="vertical-center-modal"
      >
        <p v-show="presentP" style="text-align: center;font-size: 16px">
          请先选择仓库
        </p>
        <Table
            v-show="presentTable"
            size="small"
            border
            ref="selection"
            :columns="presentTableTitle"
            :data="presentTableList"
        ></Table>
        <div slot="footer" v-show="false"></div>
      </Modal>
      <div style="width: 100%">
        <span class="hintSpan">5.自定义包裹重量 (单位kg)</span><br />
        <Input v-model="weightInput" size="large" placeholder="请输入重量，数字，最多两位小数, 0.05-40之间" style="width: 40%"/>
      </div>

      <div style="width: 100%">
        <span class="hintSpan">6.设置收货地址</span>
        <div class="address_box">
          <p>格式要求：</p>
          <p style="color: red">
            姓名，电话，省[空格]市[空格]区[空格]详细地址，订单编号-----省、市、区、详细地址之间用一个空格隔开
          </p>
          <p>示例：</p>
          <p style="color: red">
            马云,13811112222,广东省 深圳市 罗湖区
            人民南路8888号,288981792904741864
          </p>
          <p>
            地址格式：省 市 区
            详细地址之间用空格隔开，详细地址中不允许出现中英文逗号或其他特殊字符！
          </p>
          <p>
            订单编号：淘、猫、京、拼等平台订单编号，如无编号可随机填写,但不允许重复！一次最多下500单！
          </p>
          <p style="color: red">请注意：订单编号将是取回快递单号的唯一条件！</p>
          <p style="color: red">如遇东莞市、三沙、嘉峪关市等没有区</p>
          <Input
              v-model="addresstextarea"
              class="textareaInput"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 30 }"
              placeholder="马云,13811112222,广东省 深圳市 罗湖区 人民南路8888号,288981792904741864"
          />
          <p>批量上传说明：</p>
          <p>1、支持直接从淘宝、京东、拼多多后台导出的发货表格，格式csv。</p>
          <p>2、支持自定义模板格式的发货表格<span ><a href='./public/templateFile/京东模板.xlsx' download="京东模板.xlsx">【点我下载发货模板】</a></span></p>
        </div>
        <div class="addressButton">
          <vue-xlsx-table class="uploadFilesButton" @on-select-file="uploadFiles">批量上传</vue-xlsx-table>
          <button class="button shipperButton" @click="examine">检查收货地址</button>
        </div>
        <br />
        <!--      <div class="tableBox"> ./templateFile/京东模板.xlsx -->
        <Table class="_table" style="font-size: 12px"

               ref="selection"
               :columns="tableTitle"
               :data="tableList"></Table>
        <!--      </div>-->

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetails2",
  data() {
    return {
      // templateurl:require('./public/templateFile/京东模板.xlsx'),
      shipperId: "",
      weightInput: "",
      provinceId: "",
      cityId: "",
      districtId: "",
      addresstextarea: "",
      shipperName:"",
      presentModal: false,
      presentTable: false,
      presentTable1: false,
      presentImg: true,
      presentP: false,
      shipperModal: false,
      deleteModal:false,
      shipperList: [],
      depotList: [],
      depotId: "",
      expressList: [{ express: { id: "", name: "请先选择仓库" } }],
      tableTitle: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          type: 'index',
          title: "序号",
          key: "sequence",
        },
        {
          title: "订单号",
          key: "orderId"
        },
        {
          title: "商品名称",
          key: "productName"
        },
        {
          title: "金额",
          key: "money"
        },
        {
          title: "支付时间",
          key: "payTime",
          // render: function (h, params) {
          //   return h('div',
          //       new Date(this.row.transactionTime).Format('yyyy-MM-dd HH:MM:ss'));
          // }
        },
        {
          title: "商家备注",
          key: "merchantRemark"
        },
        {
          title: "买家备注",
          key: "buyerName"
        }
      ],
      tableList: [],
      presentTableTitle: [
        {
          title: "商品信息",
          key: "presentInfo",
          render: (h, params) => {
            return h(
                "div",
                [
                  h("img", {
                    attrs: { src: this.$imgurl(params.row.present.cover) },
                    style: {
                      width: "72px",
                      height: "55px",
                      float: "left",
                      margin: "5px"
                    }
                  }),
                  h(
                      "div",
                      {
                        style: {
                          float: "left",
                          marginLeft: "10px",
                          fontSize: "15px",
                          lineHeight: 2
                        }
                      },
                      [
                        h("p", params.row.present.name),
                        h(
                            "p",
                            {
                              style: { float: "left" }
                            },
                            params.row.present.price + "元/件"
                        ),
                        h(
                            "p",
                            {
                              style: { float: "right", marginLeft: "15px" }
                            },
                            params.row.present.weight + "克/件"
                        )
                      ]
                  )
                ]
            );
          }
        },
        {
          title: "数量",
          key: "num",
          render: (h, params) => {
            return h("p", params.row.stock);
          }
        },
        {
          title: "操作",
          key: "operation",
          width:150,
          align:'center',
          render: (h, params) => {
            return h(
                "div",
                {
                  style: {
                    textAlign: "center"
                  }
                },
                [
                  h(
                      "Button",
                      {
                        props: {
                          type: "primary",
                          size: "small"
                        },
                        style: {
                          fontFamily: "Source Han Sans CN",
                          fontSize: "18px",
                          background: "#0033FF"
                        },
                        on: {
                          click: () => {
                            this.selectPresentInfo(params.row);
                          }
                        }
                      },
                      "选择"
                  )
                ]
            );
          }
        }
      ],
      presentTableList: [],
      presentTableTitle1: [
        {
          title: "商品信息",
          key: "presentInfo",
          render: (h, params) => {
            return h("div", {}, [
              h("img", {
                attrs: { src: this.$imgurl(params.row.present.cover) },
                style: {
                  width: "72px",
                  height: "55px",
                  float: "left",
                  margin: "5px"
                }
              }),
              h(
                  "div",
                  {
                    style: {
                      float: "left",
                      marginLeft: "10px",
                      fontSize: "15px",
                      lineHeight: 2
                    }
                  },
                  [
                    h("p", params.row.present.name),
                    h(
                        "p",
                        {
                          style: { float: "left" }
                        },
                        params.row.present.price + "元/件"
                    ),
                    h(
                        "p",
                        {
                          style: { float: "right", marginLeft: "15px" }
                        },
                        params.row.present.weight + "克/件"
                    )
                  ]
              )
            ]);
          }
        },
        {
          title: "数量",
          key: "num",
          render: (h, params) => {
            return h("p", params.row.stock);
          }
        },
        {
          title: "操作",
          key: "operation",
          align: 'center',
          width:150,
          render: h => {
            return h(
                "div",
                {
                  style: {
                    textAlign: "center"
                  }
                },
                [
                  h(
                      "Button",
                      {
                        props: {
                          type: "primary",
                          size: "small"
                        },
                        style: {
                          fontFamily: "Source Han Sans CN",
                          fontSize: "18px",
                          backgroundColor: "#0033FF",
                          color: "#FFFFFF"
                        },
                        on: {
                          click: () => {
                            this.addPresent();
                          }
                        }
                      },
                      "编辑商品"
                  )
                ]
            );
          }
        }
      ],
      presentTableList1: [],
      provinceList: { id: "", code: "", name: "请选择省份", parentCode: "" },
      cityList: [{ id: "", code: "", name: "请选择城市", parentCode: "" }],
      districtList: [{ id: "", code: "", name: "请选择地区", parentCode: "" }],
      addresser:{name:"",phone:"",address:""},
      loginInfo:[]
    };
  },
  methods: {
    getShipper(){//获取发货人信息列表
      console.log("===============$imgurl(params.row.present.cover)===================")
      console.log(this.$imgurl('/aaa'))
      querShipper().then(res=>{
        if("ok"==res.err){
          this.shipperList=res.data;
          for(var i=0;i<this.shipperList.length;i++){
            if(this.shipperList[i].id == this.$session.shipperId){
              this.shipperId=this.shipperList[i].id
            }
          }
        }else{
          this.$Message.error("获取发货人信息失败！"+res.message)
        }

      })
    },
    // getShipperId() {
    //
    //   //选择发货人下拉框
    //   console.log("==========选择发货人下拉框===========");
    //   console.log(this.shipperId)
    //   //console.log(event.target.value);//获取选中的ID值
    // },
    selectDepot() {
      //选择仓库
      this.getExpress(this.depotId);
    },
    // selectExpressId() {
    //   //选择快递
    //   //console.log(event.target.value);
    // },
    getDepot() {
      //获取仓库数据列表
      queryDepot({}).then(res => {
        this.depotList = res.data;
      }).catch(e =>console.log(e))
    },
    getExpress(id) {
      //根据仓库获取快递信息列表
      queryExpress({id}).then(res=>{
        if("ok"==res.err){
          this.expressList = res.data;
        }else{
          this.expressList=[{ express: { id: "", name: "该仓库下暂未分配快递" } }]
        }
      })
    },

    addPresent() {
      //选择商品
      const depotId =this.depotId;
      this.presentTableList1 = [];
      if (this.presentModal) {
        this.presentModal = false;
      } else {
        this.presentModal = true;
        if (depotId) {
          this.presentTable = true;
          this.presentP = false;
          queryPresent({depotId}).then(res =>{
            this.presentTableList = res.data;
          })
        } else {
          this.presentTable = false;
          this.presentP = true;
        }
      }
    },
    selectPresentInfo(p) {
      //选中商品
      if (this.presentModal && p) {
        this.presentModal = false;
        this.presentImg = false;
        this.presentTable1 = true;
        this.presentTableList1.push(p);
      } else {
        this.presentModal = true;
        this.presentImg = true;
        this.presentTable1 = false;
        this.presentTableList1 = [];
      }
    },

    delectShopper() {
      //删除发货人
      for(var i=0;i<this.shipperList.length;i++){
        if(this.shipperList[i].id == this.shipperId){
          this.shipperName=this.shipperList[i].name;
        }
      }
      this.deleteModal=true;
    },

    deleteOk(){
      const shipperId = this.shipperId
      deleteShipper({shipperId}).then(res=>{
        if("ok"==res.err){
          this.getShipper();
          this.$Message.success("操作成功！");
        }else{
          this.$Message.error("操作失败！")
        }
        this.deleteClose();
      })
    },
    deleteClose(){
      this.shipperName="";
      if (this.deleteModal){
        this.deleteModal=false;
      }else{
        this.deleteModal=true;
      }
    },

    defaultShopper() {
      //设置默认发货人
      const shipperId = this.shipperId
      defaultShipper({shipperId}).then(res=>{
        if("ok"==res.err){
          this.$Message.success("操作成功！");
          this.shipperId=shipperId;
        }else{
          this.$Message.error("操作失败，请重试！")
        }
      })
    },
    addShopper() {
      //添加发货人
      if (this.shipperModal) {
        this.shipperModal = false;
      } else {
        this.shipperModal = true;
      }
      queryProvince().then(res=>{
        this.provinceList = res.data;
      })
    },
    addShopperOk() {
      //确认添加发货人
      if(this.addresser.name=="" || this.addresser.name==null || this.addresser.name==undefined){
        this.$Message.error("发件人姓名不能为空");
      }
      if(this.addresser.phone=="" || this.addresser.phone==null || this.addresser.phone==undefined){
        this.$Message.error("发件人电话不能为空");
      }
      if(this.provinceId=="" || this.cityId=="" || this.districtId==""){
        this.$Message.error("发件人地址不能为空");
      }
      if(this.addresser.address=="" || this.addresser.address==null || this.addresser.address==undefined){
        this.$Message.error("发件人详细地址不能为空");
      }
      const params= {
        name:this.addresser.name,
        phone:this.addresser.phone,
        regionId:this.districtId,
        detail:this.addresser.address
      }
      addShipper({}, params).then(res=>{
        if("ok" == res.err){
          this.getShipper()
          this.$Message.success("添加成功")
          this.close();
        }else{
          this.$Message.error(res.message)
        }
      })
    },
    close() {
      //关闭
      this.provinceList=[];
      this.addresser={name:"",phone:"",address:""};
      this.provinceList =[{ id: "", code: "", name: "请选择省份", parentCode: "" }];
      this.cityList= [{ id: "", code: "", name: "请选择城市", parentCode: "" }];
      this.districtList =[{ id: "", code: "", name: "请选择地区", parentCode: "" }];
      if (this.shipperModal) {
        this.shipperModal = false;
      } else {
        this.shipperModal = true;
      }
    },
    getProvinceId() {
      //选中省份获取城市列表
      const provinceId = this.provinceId
      queryCity({provinceId}).then(res=>{
        this.cityList = res.data;
      })
    },

    getCityId() {
      //选中城市获取地区列表
      const cityId = this.cityId;
      queryDistrict({cityId}).then(res=>{
        this.districtList = res.data;
      })
    },
    // getDistrictId() {
    //   console.log("获取地区编号");
    //   console.log(this.districtId);
    // },


    // getShipperProvince(){
    //
    // },

    uploadFiles(convertedData) {

      var list = convertedData.body;
      const builder = [];
      for (var i = 0; i < list.length; i++) {
        builder.push(
            list[i].订单号 +
            "," +
            list[i].客户姓名 +
            "," +
            list[i].客户地址 +
            "," +
            list[i].联系电话
        );
      }
      this.addresstextarea=builder.join("\n");
    },

    examine(){//批量上传
      if(this.presentTableList1.length<1){
        this.$Message.error("请先选择商品")
        return;
      }
      if(!this.addresstextarea){
        this.$Message.error("请先在文本框按要求填写收货地址！")
        return;
      }
      const addressStr = this.addresstextarea.split(/\r?\n/);
      for(var i=0;i<addressStr.length;i++){
        const aloneAddress = addressStr[i].split(",");
        const addressList = {
          orderId:aloneAddress[0],
          productName:this.presentTableList1[0].present.name,
          money: parseFloat(this.presentTableList1[0].present.price*this.presentTableList1[0].stock).toFixed(2)

        };
        this.tableList.push(addressList);
      }
    },
    downLoadEXCEL(){//下载模板

    }
  },
  mounted() {
    this.getShipper();
    this.getDepot();
  }

}
</script>

<style scoped lang="sass">

</style>