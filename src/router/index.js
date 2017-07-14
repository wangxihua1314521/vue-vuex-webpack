import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {startSystem} from '@/assets/js/http'
import shopMall from '../views/shopMall.vue'
import newMall from '../views/newMall.vue'
import login from '../views/login.vue'
import shopOpenVip from '@/views/shopOpenVip'
import shopOpenSpace from '@/views/shopOpenSpace'
import shopOpenSpaceNext from '@/views/shopOpenSpaceNext'
import shopOpenVipNext from '@/views/shopOpenVipNext'
import clanNews from '@/views/clanNews.vue'
import praisePerson from '@/views/praisePerson'
import replayDetail from '@/views/replayDetail'

import clanNewsImgReply from '@/views/clanNewsImgReply'
Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

export default new Router({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: [
    {
      path: '/',
      component: login
    },
    {
    	path: '/newMall',
      component: newMall
    },
    {
      path: '/shopMall',
      component: shopMall,
      beforeEnter: async (to, from, next) => {
        console.log('首页路由钩子')
        // 进入首页前确认加载好全系统路径
        if (store.state.sysReady) {
          console.info('进入首页')
          next()
        } else {
          let auth = store.state.auth
            // let userInfo
            // 如果没有许可，查看session
            // 刷新页面可能导致许可清空
          if (!auth) {
            const sessionAll = sessionStorage.getItem('vuex-store')
                // const sessionUserInfo = sessionStorage.getItem('userInfo')
            if (sessionAll && sessionAll !== 'undefined') {
              store.commit('useSession', sessionAll)
              console.log('使用session进行路径查询')
              sessionStorage.removeItem('vuex-store')
            } else {
                    // session中也没有许可，不允许跳转,回到login
              next({ path: '/login' })
              return
            }
          }
          await startSystem(auth)
          next()
        }
      },
//    children: [
//      // app管理员列表
//      {
//        path: 'appAdmin/appAdmin',
//        name: 'appAdmin',
//        component: resolve => require(['@/views/appAdmin/appAdmin'], resolve)
//      }
//    ]
    },
//  {
//    path: '/pageType',
//    name: 'pageType',
//    component: resolve => require(['@/views/pageType'], resolve)
//  },
//  {
//    path: '/payFail',
//    name: 'payFail',
//    component: resolve => require(['@/views/payFail'], resolve)
//  },
//  {
//    path: '/paySuc',
//    name: 'paySuc',
//    component: resolve => require(['@/views/paySuc'], resolve)
//  },
//  {
//    path: '/userProtocol',
//    name: 'userProtocol',
//    component: resolve => require(['@/views/userProtocol'], resolve)
//  },
//  {
//    path: '/imgProtocol',
//    name: 'imgProtocol',
//    component: resolve => require(['@/views/imgProtocol'], resolve)
//  },
    {
      path: '/replayDetail',
      component: replayDetail
    },
//  {
//    path: '/clanNewsImgReply',
//    component: clanNewsImgReply
//  },
//  {
//    path: '/businessDetails',
//    name: 'businessDetails',
//    component: resolve => require(['@/views/business_details'], resolve)
//  },
//  {
//    path: '/clanHelp',
//    name: 'clanHelp',
//    component: resolve => require(['@/views/clanHelp'], resolve)
//  },
//  {
//    path: '/clanNewsImg',
//    name: 'clanNewsImg',
//    component: resolve => require(['@/views/clanNews_img'], resolve)
//  },
    {
      path: '/clanNews',
      component: clanNews
    },
//  {
//    path: '/clanVol',
//    name: 'clanVol',
//    component: resolve => require(['@/views/clanVol'], resolve)
//  },
//  {
//    path: '/honorDev',
//    name: 'honorDev',
//    component: resolve => require(['@/views/honorDev'], resolve)
//  },
//  {
//    path: '/honorLon',
//    name: 'honorLon',
//    component: resolve => require(['@/views/honorLon'], resolve)
//  },
//  {
//    path: '/honorStu',
//    name: 'honorStu',
//    component: resolve => require(['@/views/honorStu'], resolve)
//  },
//  {
//    path: '/personInfo',
//    name: 'personInfo',
//    component: resolve => require(['@/views/personInfo'], resolve)
//  },
    {
      path: '/praisePerson',
      component: praisePerson
    },
//  {
//    path: '/receiveNotify',
//    component: praisePerson
//  },
    
    {
      path: '/shopOpenSpace',
      component: shopOpenSpace
    },
    {
      path: '/shopOpenSpaceNext',
      component: shopOpenSpaceNext
    },
    {
      path: '/shopOpenVip',
      component: shopOpenVip
    },
    {
      path: '/shopOpenVipNext',
      component: shopOpenVipNext
    },
    {
    	path: '*', 
    	name: '404-page', 
    	component: resolve => require(['@/views/404-page'], resolve)}
  ]
})
