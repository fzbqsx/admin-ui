import TabsView from '@/layouts/tabs/TabsView'
// import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'home',
          name: '首页',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/home/js')
        },
        {
          path: 'newsRecord',
          name: '消息记录',
          component: () => import('@/pages/newsRecord/newsRecord'),
        },
        {
          path: 'entryForm',
          name: '查看报名',
          component: () => import('@/pages/newsRecord/entryForm'),
          meta: {
            invisible: true
          }
        },
        {
          path: 'orderList',
          name: '订单管理',
          component: () => import('@/pages/orderMessge/orderList'),
        },
        {
          path: 'logistics',
          name: '物流信息',
          component: () => import('@/pages/orderMessge/logistics'),
          meta: {
            invisible: true
          }
        },
        {
          path: 'personnelMessage',
          name: '人员管理',
          component: PageView,
          children:[
            {
              path: 'teacherMessage',
              name: '教师管理',
              component: () => import('@/pages/personnelMessage/teacherMessage'),
            },
            {
              path: 'studentMessage',
              name: '学生管理',
              component: () => import('@/pages/personnelMessage/studentMessage'),
            },
          ]
        },
        {
          path: 'teamList',
          name: '战队管理',
          component: () => import('@/pages/teamMessage/teamList'),
        },
        {
          path: 'extracurricularActivities',
          name: '课外活动',
          component: () => import('@/pages/extracurricularActivities/extracurricularActivities'),
        },
        {
          path: 'commodityMessage',
          name: '商品管理',
          component: PageView,
          children: [
            {
              path: 'commodityList',
              name: '商品列表',
              component: () => import('@/pages/commodityMessage/commodityList'),
            },
            {
              path: 'category',
              name: '类目管理',
              component: () => import('@/pages/commodityMessage/category'),
            }
          ]
        },
        {
          path: 'otherMessage',
          name: '其他管理',
          component: PageView,
          children: [
            {
              path: 'integralSet',
              name: '积分设置',
              component: () => import('@/pages/otherMessage/integralSet'),
            },
            {
              path: 'teamBePromoted',
              name: '战队晋级设置',
              component: () => import('@/pages/otherMessage/teamBePromoted'),
            },
            {
              path: 'feedbackRecord',
              name: '反馈记录',
              component: () => import('@/pages/otherMessage/feedbackRecord'),
            },
            {
              path: 'serviceCentre',
              name: '服务中心',
              component: () => import('@/pages/otherMessage/serviceCentre'),
            }
          ]
        },
        {
          path: 'dataCenter',
          name: '数据中心',
          component: PageView,
          children: [
            {
              path: 'clockInData',
              name: '打卡数据',
              component: () => import('@/pages/dataCenter/clockInData'),
            },
            {
              path: 'courseData',
              name: '课程数据',
              component: () => import('@/pages/dataCenter/courseData'),
            },
            {
              path: 'JobData',
              name: '学生作业数据',
              component: () => import('@/pages/dataCenter/JobData'),
            }
          ]
        },
        // {
        //   path: 'exception',
        //   name: '异常页',
        //   meta: {
        //     icon: 'warning',
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       path: '404',
        //       name: 'Exp404',
        //       component: () => import('@/pages/exception/404')
        //     },
        //     {
        //       path: '403',
        //       name: 'Exp403',
        //       component: () => import('@/pages/exception/403')
        //     },
        //     {
        //       path: '500',
        //       name: 'Exp500',
        //       component: () => import('@/pages/exception/500')
        //     }
        //   ]
        // },
        // {
        //   name: '验权页面',
        //   path: 'auth/demo',
        //   meta: {
        //     icon: 'file-ppt',
        //     authority: {
        //       permission: 'form',
        //       role: 'manager'
        //     },
        //     component: () => import('@/pages/demo')
        //   }
        // }
      ]
    }
  ]
}

export default options
