import Vue from 'vue'
import App from './App.vue'
import "@/mixin";
import router from './router'
import store from './store'
import bulma from "bulma";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import moment from "moment";
import vueXlsxTable from 'vue-xlsx-table';


Vue.prototype.$moment = moment;
Vue.config.productionTip = false
Vue.use(bulma);
Vue.use(iView);
Vue.use(vueXlsxTable, {rABS: false});

//全局信息提示
Vue.prototype.$Message.config({
    top: 150,     //设置默认距离顶部高度
    duration: 3   //设置默认显示时间
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
