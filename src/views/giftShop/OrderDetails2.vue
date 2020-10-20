<template>
  <div class="orderDetailsBodyDiv" >

  </div>
</template>

<script>
import { queryDepot,queryExpress,queryPresent,queryProvince,queryCity,
  queryDistrict,addShipper,querShipper,defaultShipper,deleteShipper,createOrder
} from "./js/orderDetails";
export default {
  name: "OrderDetails2",
  data(){
    return{
      deleteModal:false
    }
  },
  methods:{
    aa(){
      if(this.deleteModal){
        this.deleteModal=false;
      }else {
        this.deleteModal=true;
      }
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="sass">
/*@import "css/OrderDetails2"*/
</style>