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
      redirect: '/newsRecord',
      children: [
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
        //   path: 'dashboard',
        //   name: 'Dashboard',
        //   meta: {
        //     icon: 'dashboard'
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       path: 'workplace',
        //       name: '工作台',
        //       meta: {
        //         page: {
        //           closable: false
        //         }
        //       },
        //       component: () => import('@/pages/dashboard/workplace'),
        //     },
            // {
            //   path: 'analysis',
            //   name: '分析页',
            //   component: () => import('@/pages/dashboard/analysis'),
            //
            // },
          ]
        },
        //
        // {
        //   path: 'form',
        //   name: '表单页1',
        //   meta: {
        //     icon: 'form',
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: 'basic1',
        //       name: '基础表单',
        //       component: () => import('@/pages/form/basic'),
        //     },
        //     // {
        //     //   path: 'basic',
        //     //   name: '测试',
        //     //   component: PageView,
        //     //   children: [
        //     //     {
        //     //       path: 'basic',
        //     //       name: '测试1',
        //     //       component: () => import('@/pages/form/basic/BasicFForm'),
        //     //     }
        //     //   ]
        //     // },
        //     {
        //       path: 'step',
        //       name: '分步表单',
        //       component: () => import('@/pages/form/step'),
        //     },
        //     {
        //       path: 'advance',
        //       name: '高级表单',
        //       component: () => import('@/pages/form/advance'),
        //     }
        //   ]
        // },
        // {
        //   path: 'list',
        //   name: '列表页',
        //   meta: {
        //     icon: 'table'
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: 'query',
        //       name: '查询表格',
        //       meta: {
        //         authority: 'queryForm',
        //       },
        //       component: () => import('@/pages/list/QueryList'),
        //     },
        //     {
        //       path: 'primary',
        //       name: '标准列表',
        //       component: () => import('@/pages/list/StandardList'),
        //     },
        //     {
        //       path: 'card',
        //       name: '卡片列表',
        //       component: () => import('@/pages/list/CardList'),
        //     },
        //     {
        //       path: 'search',
        //       name: '搜索列表',
        //       component: () => import('@/pages/list/search/SearchLayout'),
        //       children: [
        //         {
        //           path: 'article',
        //           name: '文章',
        //           component: () => import('@/pages/list/search/ArticleList'),
        //         },
        //         {
        //           path: 'application',
        //           name: '应用',
        //           component: () => import('@/pages/list/search/ApplicationList'),
        //         },
        //         {
        //           path: 'project',
        //           name: '项目',
        //           component: () => import('@/pages/list/search/ProjectList'),
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: 'details',
        //   name: '详情页',
        //   meta: {
        //     icon: 'profile'
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       path: 'basic',
        //       name: '基础详情页',
        //       component: () => import('@/pages/detail/BasicDetail')
        //     },
        //     {
        //       path: 'advance',
        //       name: '高级详情页',
        //       component: () => import('@/pages/detail/AdvancedDetail')
        //     }
        //   ]
        // },
        // {
        //   path: 'result',
        //   name: '结果页',
        //   meta: {
        //     icon: 'check-circle-o',
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: 'success',
        //       name: '成功',
        //       component: () => import('@/pages/result/Success')
        //     },
        //     {
        //       path: 'error',
        //       name: '失败',
        //       component: () => import('@/pages/result/Error')
        //     }
        //   ]
        // },
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
        //   path: 'components',
        //   name: '内置组件',
        //   meta: {
        //     icon: 'appstore-o'
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: 'taskCard',
        //       name: '任务卡片',
        //       component: () => import('@/pages/components/TaskCard')
        //     },
        //     {
        //       path: 'palette',
        //       name: '颜色复选框',
        //       component: () => import('@/pages/components/Palette')
        //     },
        //     {
        //       path: 'table',
        //       name: '高级表格',
        //       component: () => import('@/pages/components/table')
        //     }
        //   ]
        // },
        // {
        //   name: '验权表单',
        //   path: 'auth/form',
        //   meta: {
        //     icon: 'file-excel',
        //     authority: {
        //       permission: 'form'
        //     }
        //   },
        //   component: () => import('@/pages/form/basic')
        // },
        // {
        //   name: 'Ant Design Vue',
        //   path: 'antdv',
        //   meta: {
        //     icon: 'ant-design',
        //     link: 'https://www.antdv.com/docs/vue/introduce-cn/'
        //   }
        // },
        // {
        //   name: '使用文档',
        //   path: 'document',
        //   meta: {
        //     icon: 'file-word',
        //     link: 'https://iczer.gitee.io/vue-antd-admin-docs/'
        //   }
        // }
      // ]
    // },
  ]
}

export default options
