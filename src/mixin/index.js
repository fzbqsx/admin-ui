import Vue from "vue";
import {ENV} from "@/config/config";
import { mapGetters } from 'vuex'
import {AUTH_SESSION} from "../store/mutation-type";
Vue.mixin({
  computed:{
    ...mapGetters({
      $session: AUTH_SESSION
    })
  },
  methods: {
    $imgurl(params){
      return ENV.baseURL+'/global/static'+params;
    }
  }
});
