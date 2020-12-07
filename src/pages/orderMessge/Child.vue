<template>
     <div class="tableSpan" >
      {{address}}
       <br/><a style="float: right" v-if="address!==''&&address!==undefined" @click="onClick">{{unfoldOrPackUp}}</a>
     </div>
</template>

<script>

export default {
  name: "Child",
  props:{
    address:{
      // type: String,
      // default: ''
    }
  },
  data(){
    return {
      unfoldOrPackUp:"展开"
    }
  },
  
  methods:{
    onClick(event){
      if('展开'===this.unfoldOrPackUp){
        event.currentTarget.parentElement.className=''
        this.unfoldOrPackUp='收起'
      }else{
        event.currentTarget.parentElement.className='tableSpan'
        this.unfoldOrPackUp='展开'
      }
    },
  },
  
  mounted() {
    
  }
}
</script>

<style scoped lang="sass">
@import "css/orderMessage"

</style>