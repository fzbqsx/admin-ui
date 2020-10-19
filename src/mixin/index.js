import Vue from "vue";
import {ENV} from "@/config/config";

Vue.mixin({
  methods: {
    $imgurl(params){
      return ENV.baseURL+'/global/static'+params;
    }
  }
});
