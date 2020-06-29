import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //  path: '/',
    //  redirect: '/homePage'
    // },
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/components/page/login.vue'], resolve),
    }, {
      path: '/scanMsgShow',
      name: 'ScanMsgShow',
      component: resolve => require(['@/components/page/scanMsgShow.vue'], resolve),
    }, {
      path: '/',
      name: 'DisplayScreen1',
      component: resolve => require(['@/components/common/home.vue'], resolve),
      meta: {
        title: '主框架'
      },
      children: [{
          path: '/homePage',
          component: resolve => require(['@/components/page/homePage.vue'], resolve),
          meta: {
            title: '首页'
          }
        },

    
        //用户管理
        {
          path: '/userManagement',
          component: resolve => require(['@/components/page/basicData/userManagement.vue'], resolve),
          meta: {
            title: '用户管理'
          }
        },
        // //权限管理
        // {
        //   path: '/authorityManagement',
        //   component: resolve => require(['@/components/page/basicData/authorityManagement.vue'], resolve),
        //   meta: {
        //     title: '权限管理'
        //   }
        // },
        //系统菜单管理
        {
          path: '/sysmenuManagement',
          component: resolve => require(['@/components/page/basicData/sysmenuManagement.vue'], resolve),
          meta: {
            title: '系统菜单管理'
          }
        },

      ]
    },
    // {
    //  path: '/login',
    //  // component: resolve => require(['../components/page/Login.vue'], resolve)
    // },
    // {
    //  path: '*',
    //  redirect: '/404'
    // },

  ]
})
