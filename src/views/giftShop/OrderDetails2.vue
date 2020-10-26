<template>
  <div class="bodyDiv1 bodyDiv2">
    <div class="orderDetailsDiv">
      <p class="prompt">请您根据步骤提示下单</p>
      <p class="prompt">1.选择发货人</p>
      <Row>
        <Col span="12">
          <Select size="large" placeholder="请选择发货人" v-if="shipperInfo.shipperList" v-model="shipperInfo.shipperId">
            <Option v-for="item in shipperInfo.shipperList" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select >
        </Col>
        <Col span="12">
          <div class="buttonsDiv shipperButton">
            <button class="button _button " @click="openMadal(1)">删除</button>
            <button class="button _button " @click="openMadal(2)">设为默认</button>
            <button class="button _button " @click="openMadal(3)">添加发货人</button>
          </div>
        </Col>
      </Row>
      <p class="prompt">2.选择仓库</p>
      <RadioGroup  vertical size="large" v-if="depotInfo.depotList" v-model="depotInfo.depotId" @on-change="selectDepot">
        <Radio :label="item.id" v-for="item in depotInfo.depotList" :key="item.id">
          {{item.name}}
        </Radio>
      </RadioGroup>
      <p class="prompt">3.选择快递</p>
      <Row>
        <Col span="12">
          <Select size="large" placeholder="请选择快递" v-if="expressInfo.expressList" v-model="expressInfo.expressId">
            <Option v-for="item in expressInfo.expressList" :value="item.express.id" v-bind:key="item.express.id">{{item.express.name}}</Option>
          </Select >
        </Col>
      </Row>
      <p class="prompt">4.选择商品</p>
      <div v-show="presentInfo.imgs" class="selectPresent" @click="openMadal(4)">
        <img  src="@/assets/giftShop/路径 4283.png" />
      </div>
      <Table v-show="presentInfo.tables" ref="selection" :columns="presentTableTitle" :data="presentTableList"></Table>
      <p class="prompt">5.自定义包裹重量 (单位kg)</p>
      <Row>
        <Col span="12">
          <InputNumber class="InputNumber" v-model="weightInput" :value="0" size="large"  :min="0" :max="99999" :step="0.5" :precision="2" placeholder="请输入包裹重量"></InputNumber>
        </Col>
      </Row>
      <p class="prompt">6.设置收货地址</p>
      <div class="addressDiv">
        <p>格式要求：</p>
        <p>订单编号,姓名,省[空格]市[空格]区[空格]详细地址,电话,商品名称,金额,下单时间,买家留言,商家留言 -----省、市、区、详细地址之间用一个空格隔开</p>
        <p>示例：</p>
        <p>288981792904741864,马云,广东省 深圳市 罗湖区 人民南路8888号,13811112222,宠物零食狗狗磨牙棒,12,2020-09-16 11:13:53,买家留言信息,商家商品信息说明</p>
        <p>地址格式：省 市 区 详细地址之间用空格隔开，详细地址中不允许出现中英文逗号或其他特殊字符！</p>
        <p>订单编号：淘、猫、京、拼等平台订单编号，如无编号可随机填写,但不允许重复！一次最多下500单！</p>
        <p>请注意：订单编号将是取回快递单号的唯一条件！</p>
        <p>如遇东莞市、三沙、嘉峪关市等没有区</p>
        <Input type="textarea" v-model="addresstextarea" :autosize="{minRows: 5,maxRows: 30}" placeholder="288981792904741864,马云,广东省 深圳市 罗湖区 人民南路8888号,13811112222,宠物零食狗狗磨牙棒,12,2020-09-16 11:13:53,买家留言信息,商家商品信息说明" />
        <p>批量上传说明：</p>
        <p>1、支持直接从淘宝、京东、拼多多后台导出的发货表格，格式csv。</p>
        <p>2、支持自定义模板格式的发货表格<a href='../../../public/templateFile/template.zip' download="template.zip">【点我下载发货模板】</a></p>
      </div>
      <div class="buttonsDiv upload_download">
        <vue-xlsx-table class="uploadFilesButton button _button" @on-select-file="uploadFiles">批量上传</vue-xlsx-table>
<!--        <button class="button _button" >批量上传</button>-->
        <button class="button _button" @click="examine">检查收货地址</button>
      </div>
      <Table   ref="selection" :columns="tableTitle" :data="tableList"></Table>
      <p class="dynamicAmount"> 总计金额：({{dynamicAmountCalculation.money}}+{{expressInfo.expressPrice}})*{{dynamicAmountCalculation.num}}={{dynamicAmountCalculation.totalMoney}} </p>
      <div class="buttonsDiv upload_download">
        <button class="button _button" @click="openMadal(5)">确认提交</button>
      </div>
    </div>
    <Modal v-model="modelIsShow.divShow" width="60%" :title=modelIsShow.title  class-name="modelBox">
      <div v-if="modelIsShow.modalDivShow===1" class="shipperOperationDiv">
        <p> 是否确定删除 <span>{{shipperInfo.shipperName}}</span> ？</p>
      </div>
      <div v-if="modelIsShow.modalDivShow===2" class="shipperOperationDiv">
        <p>确定将 <span>{{shipperInfo.shipperName}}</span> 设为默认？</p>
      </div>
      <div v-if="modelIsShow.modalDivShow===3">
        <Row class="columns">
          <Col class="column addShipperSpan" span="5"><span>*</span>发件人姓名</Col>
          <Col class="column" span="17"><Input placeholder="请输入收件人姓名" size="large" v-model="addShipperInfo.name"/></Col>
        </Row>
        <Row class="columns">
          <Col class="column addShipperSpan" span="5"><span>*</span>发件人手机</Col>
          <Col class="column" span="17"><Input placeholder="请输入收件人手机号" size="large" v-model="addShipperInfo.phone"/></Col>
        </Row>
        <Row class="columns">
          <Col class="column addShipperSpan" span="5"><span>*</span>发件人地址</Col>
          <Col class="column addShipperSelect" span="17">
            <Col span="7">
              <Select size="large" placeholder="请选择省份" v-model="addShipperInfo.provinceId" v-if="addShipperInfo.provinceList" @on-change="getProvinceId">
                <Option  v-for="item in addShipperInfo.provinceList" :value="item.code" :key="item.id">{{item.name}}</Option>
              </Select >
            </Col>
            <Col span="7">
              <Select size="large" placeholder="请选择城市" v-model="addShipperInfo.cityId" v-if="addShipperInfo.cityList" @on-change="getCityId">
                <Option  v-for="item in addShipperInfo.cityList" :value="item.code" :key="item.id">{{item.name}}</Option>
              </Select >
            </Col>
            <Col span="7">
              <Select size="large" placeholder="请选择区县" v-model="addShipperInfo.districtId" v-if="addShipperInfo.districtList">
                <Option  v-for="item in addShipperInfo.districtList" :value="item.code" :key="item.id">{{item.name}}</Option>
              </Select >
            </Col>
          </Col>
<!--          <i-col class="column" span="17"><Input placeholder="请输入收件人姓名" size="large"/></i-col>-->
        </Row>
        <Row class="columns">
          <Col class="column addShipperSpan" span="5"><span>*</span>详细地址</Col>
          <Col class="column" span="17"><Input placeholder="请输入详细地址" size="large" v-model="addShipperInfo.detail"/></Col>
        </Row>
      </div>
      <div v-if="modelIsShow.modalDivShow===4">
        <Table ref="selection" :columns="presentTableTitle" :data="presentTableList"></Table>
      </div>
      <div v-if="modelIsShow.modalDivShow===5">
        <div class="buttonsDiv">
          <button class="button _button" @click="toAlipay">支付宝</button>
          <button class="button _button" >余额</button>
        </div>
      </div>
      <div slot="footer" v-show="modelIsShow.footerShow" class="buttonsDiv">
        <button class="button _button" @click="Ok"> 确定 </button>
        <button class="button _button" @click="Close">取消</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { queryDepot,queryExpress,queryPresent,queryProvince,queryCity,queryDistrict,
  addShipper,queryShipper,defaultShipper,deleteShipper,createOrder,alipay
} from "./js/orderDetails";
export default {
  name: "OrderDetails2",
  data(){
    return{
      modelIsShow:{divShow:false,footerShow:false,modalDivShow:0,title:""},
      shipperInfo:{shipperList:[],shipperId:"",shipperName:""},
      addShipperInfo:{name:"",phone:"",regionId:"",detail:"",provinceId:"",cityId:"",districtId:"",provinceList:[],cityList:[],districtList:[]},
      depotInfo:{depotList:[],depotId:""},
      expressInfo:{expressList:[],expressId:"",expressPrice:0.00},
      presentInfo:{imgs:true,tables:false},
      weightInput:0,
      dynamicAmountCalculation:{money:0.00,num:0,totalMoney:0.00},
      presentTableOperation:"",
      createOrderResp:[],
      addresstextarea:"",
      tableList:[],
      presentTableList:[],
      tableTitle: [
        {
          type: 'index',
          title: "序号",
          key: "sequence",
          width: '90px',
          align: "center"
        },
        {
          title: "订单号",
          key: "tradeNo"
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
          key: "remark"
        }
      ],
      presentTableTitle: [
        {
          type: 'index',
          title: "序号",
          key: "sequence",
          width: '90px',
          align: "center"
        },
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
          width:150,
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
                      if(this.presentInfo.imgs===false && this.presentInfo.tables===true){
                        this.openMadal(4)
                        // this.getPresent()
                      }else {
                        this.selectPresentInfo(params.row);
                      }
                    }
                  }
                },
                this.presentTableOperation
              )
            ]
            );
          }
        }
      ],
    }
  },

  methods:{
    getShipper(){//获取发货人信息列表
      queryShipper().then(res=>{
        if("ok"===res.err){
          this.shipperInfo.shipperList=res.data;
          for(var i=0;i<this.shipperInfo.shipperList.length;i++){
            if(this.shipperInfo.shipperList[i].id === this.$session.shipperId){
              this.shipperInfo.shipperId=this.shipperInfo.shipperList[i].id;
            }
          }
        }else{
          this.$Message.error("获取发货人信息失败！"+res.message);
        }
      })
    },
    getDepot() {
      //获取仓库数据列表
      queryDepot({}).then(res => {
        if("ok" === res.err){
          this.depotInfo.depotList = res.data;
        }else{
          this.$Message.error("获取仓库信息失败！"+res.message);
        }
      })
    },
    selectDepot(){
      //根据仓库获取快递信息列表
      const id=this.depotInfo.depotId;
      queryExpress({id}).then(res=>{
        if("ok"===res.err){
          this.expressInfo.expressList = res.data;
        }else{
          this.expressInfo={expressList:[],expressId:""};
          this.$Message.error("获取快递信息失败！"+res.message);
        }
      })
    },
    getPresent(){
      //获取仓库下的商品信息
      this.presentTableOperation="选择";
      this.presentTableList=[];
      this.presentInfo={imgs:true,tables:false};
      const depotId=this.depotInfo.depotId;
      queryPresent({depotId}).then(res =>{
        if("ok"===res.err){
          this.presentTableList = res.data;
        }else {
          this.$Message.error("获取该仓库下商品信息失败！")
        }
      })
    },
    selectPresentInfo(p){
      this.presentTableList=[];
      this.presentInfo={imgs:false,tables:true};
      this.presentTableOperation="编辑商品";
      this.Close();
      this.presentTableList.push(p)
    },
    uploadFiles(convertedData){
      var list = convertedData.body;
      console.log(list)
      const builder = [];
      for (var i = 0; i < list.length; i++) {
        let address = this.analysisAddress(list[i].客户地址);
        address = address.province +" "+address.city+" "+address.district+" "+address.detail;
        builder.push(
                list[i].订单号 +
                "," +
                list[i].客户姓名 +
                "," +
                address +
                "," +
                list[i].联系电话 +
                "," +
                list[i].商品名称 +
                "," +
                list[i].金额 +
                "," +
                list[i].支付时间 +
                "," +
                list[i].买家备注 +
                "," +
                list[i].商家备注
        );
        this.addresstextarea=builder.join("\n");
      }
    },
    examine(){//检查收货地址
      this.tableList=[];
      const addressStr = this.addresstextarea.split(/\r?\n/);
      for(let i=0;i<addressStr.length; i++){
        const aloneAddress = addressStr[i].split(",");
        if(aloneAddress.length<9){
          this.$Message.error("第"+(i+1)+"条数据不正常，请检查后重新上传")
          return
        }else {
          for(let j=0; j<aloneAddress.length; j++){
            if(aloneAddress[j] === "" || aloneAddress[j] === null || aloneAddress[j] === undefined){
              this.$Message.error("第"+(i+1)+"条数据不正常，请检查后重新上传")
              return
            }
          }
        }
        const address = this.analysisAddress(aloneAddress[2])
        const addressList = {
          tradeNo:aloneAddress[0],
          productName:this.presentTableList[0].present.name,
          money: parseFloat(this.presentTableList[0].present.price).toFixed(2),
          payTime:aloneAddress[6],
          remark:aloneAddress[7],
          merchantRemark:aloneAddress[8],
          province:address.province,
          city:address.city,
          district:address.district,
          detail:address.detail,
          name:aloneAddress[1],
          phone:aloneAddress[3],
        };
        this.tableList.push(addressList);
      }
      if(this.expressInfo.expressId){
        for( var k=0;k<this.expressInfo.expressList.length; k++){
          if(this.expressInfo.expressId===this.expressInfo.expressList[k].express.id){
            this.expressInfo.expressPrice=this.expressInfo.expressList[k].price;
          }
        }
      }
      this.dynamicAmountCalculation.money=this.presentTableList[0].present.price;
      this.dynamicAmountCalculation.num=this.tableList.length;
      this.dynamicAmountCalculation.totalMoney=((this.dynamicAmountCalculation.money+this.expressInfo.expressPrice)*this.dynamicAmountCalculation.num).toFixed(2);
    },

    createOrder(){//创建订单
      const params = {
        biz:"purchase",
        body:{
          amount:this.dynamicAmountCalculation.totalMoney,
          channel:1,
          shipperId:this.shipperInfo.shipperId, //发货人ID
          depotId:this.depotInfo.depotId,     //仓库ID
          expressId:this.expressInfo.expressId,  //快递ID
          presentInfo:this.presentTableList[0].present,  //商品信息（包括商品ID、名称，单价）
          presentWeight:this.weightInput,       //自定义包裹重量
          receivers:this.tableList        //收货人信息（包括收货人姓名，电话，省、市、区收货地址）
        }
      }
      console.log(params)
      createOrder({},params).then(res=>{
        if("ok" === res.err){
          this.$Message.success("订单创建成功，请前往付款！");
          this.createOrderResp=res.data.order;
          this.modelIsShow.divShow=true;
        }else {
          this.$Message.error("订单创建失败！"+res.message);
        }
      })
    },
    toAlipay(){
      const tradeNo = this.createOrderResp.tradeNo
      if(tradeNo) {
        alipay({tradeNo: tradeNo}).then(res => {
          if(200===res.code){
            window.open(res.data.payUrl)
            this.Close();
          }else{
            this.$Message.error("打开支付页面异常，请重试！")
          }
        })
      }
    },

    selectShopper(){
      if(1 === this.modelIsShow.modalDivShow && this.shipperInfo.shipperId === this.$session.shipperId){
        this.$Message.error("默认发货人无法删除！")
        return false
      }
      for(var i=0;i<this.shipperInfo.shipperList.length;i++){
        if(this.shipperInfo.shipperList[i].id == this.shipperInfo.shipperId){
          this.shipperInfo.shipperName=this.shipperInfo.shipperList[i].name;
        }
      }
    },
    delectShopperOk(){
      const shipperId = this.shipperInfo.shipperId;
      deleteShipper({shipperId}).then(res=>{
        if("ok"===res.err){
          this.getShipper();
          this.$Message.success("操作成功！");
        }else{
          this.$Message.error("操作失败！")
        }
      });
      this.Close();
    },
    defaultShopperOk(){
      const shipperId = this.shipperInfo.shipperId;
      defaultShipper({shipperId}).then(res=>{
        if("ok"==res.err){
          this.$Message.success("操作成功！");
          this.shipperInfo.shipperId=shipperId;
        }else{
          this.$Message.error("操作失败，请重试！")
        }
      });
      this.Close();
    },
    addShopperOk(){
      if(!this.addShipperInfo.name){
        this.$Message.error("请输入姓名！");
        return;
      }
      if(!this.addShipperInfo.phone){
        this.$Message.error("请输入手机号！");
        return;
      }
      if(!this.addShipperInfo.districtId){
        this.$Message.error("请选择发货地址！");
        return;
      }
      if(!this.addShipperInfo.detail){
        this.$Message.error("请输入详细发货地址！");
        return;
      }
      const params= {
        name:this.addShipperInfo.name,
        phone:this.addShipperInfo.phone,
        regionId:this.addShipperInfo.districtId,
        detail:this.addShipperInfo.detail
      };
      addShipper({}, params).then(res=>{
        if("ok" == res.err){
          this.getShipper();
          this.$Message.success("添加成功");
          this.Close();
        }else{
          this.$Message.error(res.message)
        }
      })
    },

    openMadal(num){//打开modal框
      this.modelIsShow.footerShow=false;
      this.modelIsShow.modalDivShow=num;
      this.modelIsShow.title="";
      if(this.modelIsShow.divShow){
        this.modelIsShow.divShow=false;
      }else{
        this.modelIsShow.divShow=true;
      }
      if(1===num){
        if(this.selectShopper() === false){
          this.modelIsShow.divShow=false;
        }else {
          this.modelIsShow.title="删除发货人";
          this.modelIsShow.footerShow=true;
          this.selectShopper();
        }

      }else if(2===num){
        this.modelIsShow.title="设置默认发货人";
        this.modelIsShow.footerShow=true;
        this.selectShopper();
      }else if(3===num){
        this.modelIsShow.title="添加收货地址";
        this.modelIsShow.footerShow=true;
        queryProvince().then(res=>{
          if("ok" === res.err){
            this.addShipperInfo.provinceList = res.data;
          }else {
            this.$Message.error("获取省份信息异常！")
          }
        })
      }else if(4===num){
        if(!this.depotInfo.depotId){
          this.modelIsShow.divShow=false;
          this.$Message.error("请先选择仓库");
          return;
        }
        this.modelIsShow.title="您可以在这里选购您想要的商品";
        this.getPresent();
        // this.modelIsShow.footerShow=false;
      }else if(5===num){
        this.modelIsShow.divShow=false;
        if(!this.shipperInfo.shipperId){
          this.$Message.error("请选择发货人！")
          return;
        }
        if(!this.depotInfo.depotId){
          this.$Message.error("请选择仓库！")
          return;
        }
        if(!this.expressInfo.expressId){
          this.$Message.error("请选择快递！")
          return;
        }
        if(this.presentTableList.length<1){
          this.$Message.error("请选择礼品！")
          return;
        }
        if(this.tableList.length<1){
          this.$Message.error("请添加收货地址！")
          return;
        }
        this.modelIsShow.title="请选择支付方式";
        this.createOrder()
        // this.modelIsShow.footerShow=false;
      }

    },
    Ok(){
      if(1===this.modelIsShow.modalDivShow){
        this.delectShopperOk();
      }else if(2===this.modelIsShow.modalDivShow){
        this.defaultShopperOk();
      }else if(3===this.modelIsShow.modalDivShow){
        this.addShopperOk();
      }else if(4===this.modelIsShow.modalDivShow){

      }else if(5===this.modelIsShow.modalDivShow){

      }

    },
    Close(){
      //关闭弹窗重置数据
      this.addShipperInfo={name:"",phone:"",regionId:"",detail:"",provinceId:"",cityId:"",districtId:"",provinceList:[],cityList:[],districtList:[]};
      this.modelIsShow={divShow:false,footerShow:false,modalDivShow:0,title:""};
      // if(this.modelIsShow.divShow){
      //   this.modelIsShow.divShow=false;
      // }else{
      //   this.modelIsShow.divShow=true;
      // }
    },
    getProvinceId(){
      //选中省份获取城市列表
      const provinceId = this.addShipperInfo.provinceId;
      queryCity({provinceId}).then(res=>{
        if("ok" === res.err){
          this.addShipperInfo.cityList = res.data;
        }else {
          this.$Message.error("获取城市信息异常！")
        }
      })
    },
    getCityId() {
      //选中城市获取地区列表
      const cityId = this.addShipperInfo.cityId;
      queryDistrict({cityId}).then(res=>{
        if("ok" === res.err){
          this.addShipperInfo.districtList = res.data;
        }else {
          this.$Message.error("获取区县信息异常！")
        }
      })
    },
    analysisAddress(addressStr){
      addressStr = addressStr.replace(/\s+/g,"");
      let address={province:"",city:"",district:"",detail:""};
      if(addressStr){
        const index1 = addressStr.indexOf("省");
        address.province = addressStr.slice(0,index1+1);
        const index2 = addressStr.indexOf("市")
        address.city = addressStr.slice(index1+1,index2+1);
        let index3 = addressStr.indexOf("区");
        if(index3 === -1){
          index3 = addressStr.indexOf("县");
          if(index3 === -1){
            let addstr=addressStr.slice(index2+1,addressStr.size);
            index3 = addstr.indexOf("市");
            address.district = addstr.slice(0,index3+1);
            address.detail=addstr.slice(index3+1,addressStr.size);
          }else {
            address.district=addressStr.slice(index2+1,index3+1);
            address.detail=addressStr.slice(index3+1,addressStr.size);
          }
        }else {
          address.district=addressStr.slice(index2+1,index3+1);
          address.detail=addressStr.slice(index3+1,addressStr.size);
        }
      }
      return address;
    },

  },
  mounted() {
    this.getShipper();
    this.getDepot();
  }
}
</script>

<style scoped lang="sass">
@import "../global/css/global"
@import "css/orderDetails2"
</style>