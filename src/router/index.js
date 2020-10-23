import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

const routes = [
  {
    path: "/",
    name: "navigation",
    component:resolve => require(['@/views/common/Navigation.vue'],resolve),
    meta: {title: '导航'},
    redirect:'home',
    children:[
      {
        path: "/Home",
        name: "home",
        component: resolve => require(['@/views/common/Home.vue'],resolve),
        meta:{title:'首页'},
      },
      {
        path: "/GiftShop",
        name: "giftShop",
        component: resolve => require(['@/views/giftShop/GiftShop.vue'],resolve),
        meta:{title:'礼品商城'},
      },
      {
        path: "/ToOrders",
        name: "toOrders",
        component:resolve => require(['@/views/giftShop/ToOrders.vue'],resolve),
        meta: {title: '下去单'},
      },
      {
        path: "/OrderDetails2",
        name: "orderDetails2",
        component:resolve => require(['@/views/giftShop/OrderDetails2.vue'],resolve),
        meta: {role:true,title: '下单内容页2'}
      },
      {
        path: "/Article",
        name: "article",
        component: resolve => require(['@/views/article/Article.vue'],resolve),
        meta:{title:'行业资讯'},
      },
      {
        path: "/ArticleDetails",
        name: "articleDetails",
        component:resolve => require(['@/views/article/ArticleDetails.vue'],resolve),
        meta: {title: '资讯详情'},
      },
      {
        path: "/Personal",
        name: "personal",
        component: resolve => require(['@/views/personal/Personal.vue'],resolve),
        meta:{role:true,title:'个人中心'},
        redirect:'personalHome',
        children:[
          {
            path: "/PersonalHome",
            name: "personalHome",
            component: resolve => require(['@/views/personal/PersonalHome.vue'],resolve),
            meta:{role:true,title:'个人主页'},
          },
          {
            path: "/FinancialDetails",
            name: "financialDetails",
            component: resolve => require(['@/views/personal/FinancialDetails.vue'],resolve),
            meta:{role:true,title:'资金明细'},
          },
          {
            path: "/PriceList",
            name: "priceList",
            component: resolve => require(['@/views/personal/PriceList.vue'],resolve),
            meta:{role:true,title:'价格列表'},
          },
          {
            path: "/OrderManage",
            name: "orderManage",
            component: resolve => require(['@/views/personal/OrderManage.vue'],resolve),
            meta:{role:true,title:'订单管理'},
          },
          {
            path: "/Popularize",
            name: "popularize",
            component: resolve => require(['@/views/personal/Popularize.vue'],resolve),
            meta:{role:true,title:'推广中心'},
          },
          {
            path: "/Deposit",
            name: "deposit",
            component: resolve => require(['@/views/personal/Deposit.vue'],resolve),
            meta:{role:true,title:'申请提现'},
          },
        ]
      },
    ]
  },
  {
    path: "/Login",
    name: "login",
    component: resolve => require(['@/views/loginOrRegister/Login.vue'],resolve),
    meta:{title:'登录'},
  },
  {
    path: "/Register",
    name: "register",
    component: resolve => require(['@/views/loginOrRegister/Register.vue'],resolve),
    meta:{title:'注册'},
  },
  {
    path: "/UpdataPassword",
    name: "updataPassword",
    component: resolve => require(['@/views/loginOrRegister/UpdataPassword.vue'],resolve),
    meta:{title:'修改密码'},
  },
]

const router = new VueRouter({
  model:history,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.role){
    const token =localStorage.getItem('AUTH-TOKEN');
    const session = sessionStorage.getItem('AUTH-SESSION');
    if(token && session){
      next();
    }else{
      next({
        path:'/Login',
        query:{redirect:to.fullPath}    //把要跳转的页面菜蔬传过去
      })
    }
  }else{
    next();
  }
})

export default router


