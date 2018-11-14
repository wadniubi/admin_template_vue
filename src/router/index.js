import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layOut/layout.vue'
Vue.use(Router)
/* 除了login其他都为嵌套路由,因为菜单在外层组件要一直显示 */
/* 父路由必须包含嵌套子路由所需权限,否则菜单展示会有问题 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login'),
    hidden: true
  },
  {
    path: '/',
    component: layout,
    redirect: 'firstPage',
    hidden: true,
    children: [{
      path: 'firstPage',
      component: () => import('@/components/firstPage'),
      name: 'firstPage',
      meta: {title: 'firstPage', icon: 'menu'}
    }]
  }
]
export default new Router({
  routes: constantRouterMap
})

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * name:'router-name'             the name is used as index(must set!!)
 * meta : {
    title: 'title'               the name show in submenu
    icon: 'svg-name'             the icon show in the sidebar,breadcrumb,
  }
 **/
// noinspection JSAnnotator
export const asyncRouterMap = [
  {
    path: '/deepTask',
    component: layout,
    redirect: '/deepTask/adInfo',
    name: 'deepTask',
    meta: {
      title: 'deepTask',
      icon: 'edit-outline',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'adInfo',
        component: () => import('@/views/nested/adInfo/query'),
        name: 'adInfo',
        meta: { title: 'AdInfo', icon: 'edit', roles: ['editor'] }
      },
      {
        path: 'adSave',
        hidden: true,
        component: () => import('@/views/nested/adInfo/save'),
        name: 'adSave',
        meta: {title: 'AdSave', roles: ['admin', 'editor']}
      },
      {
        path: 'strategyInfo',
        component: () => import('@/views/nested/strategy/query'),
        name: 'strategyInfo',
        meta: { title: 'StrategyInfo', icon: 'edit' }
      },
      {
        path: 'strategySave',
        hidden: true,
        component: () => import('@/views/nested/strategy/save'),
        name: 'strategySave',
        meta: {title: 'StrategySave'}
      },
      {
        path: 'channelInfo',
        component: () => import('@/views/nested/channelInfo/query'),
        name: 'channelInfo',
        meta: { title: 'ChannelInfo', icon: 'edit' }
      },
      {
        path: 'channelSave',
        hidden: true,
        component: () => import('@/views/nested/channelInfo/save'),
        name: 'channelSave',
        meta: {title: 'ChannelSave'}
      },
      {
        path: 'mediaInfo',
        component: () => import('@/views/nested/mediaInfo/query'),
        name: 'mediaInfo',
        meta: { title: 'MediaInfo', icon: 'edit' }
      },
      {
        path: 'mediaSave',
        hidden: true,
        component: () => import('@/views/nested/mediaInfo/save'),
        name: 'mediaSave',
        meta: {title: 'MediaSave'}
      }
    ]
  },
  {
    path: '/config',
    component: layout,
    name: 'Config',
    redirect: '/config/setting',
    meta: {roles: ['admin'], title: 'Config'},
    children: [
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/components/setting'),
        meta: {
          title: 'Setting', icon: 'setting', roles: ['admin']
        }
      }
    ]
  },
  { path: '*', redirect: '/', hidden: true }
]
