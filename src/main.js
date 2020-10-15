import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bulma from "bulma";
import iView from 'view-design';
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(bulma);
Vue.use(iView);

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
