import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      hidden: true,
      redirect: '/banner'
    },
    {
      path: '/login',
      component: () => import('@/views/login.vue'),
      hidden: true
    },
    {
      path: '/banner',
      title: 'Banner',
      name: 'Banner',
      icon: 'iconfont icon-banner',
      component: Layout,
      redirect: '/banner/list',
      children: [
        { path: '/banner/list', name: 'Banner list', title: 'Banner List', component: () => import('@/views/banner/bannerList.vue') },
        { path: '/banner/edit', name: 'Banner edit', hidden: true, title: 'Banner Edit', component: () => import('@/views/banner/bannerEdit.vue') },
      ]
    },
    {
      path: '/music',
      title: 'Music',
      name: 'Music',
      icon: 'iconfont icon-yinle',
      component: Layout,
      redirect: '/music/list',
      children: [
        { path: '/music/list', name: 'Music list', title: 'Music List', component: () => import('@/views/music/musicList.vue') },
        { path: '/music/edit', name: 'Music edit', hidden: true, title: 'Music Edit', component: () => import('@/views/music/musicEdit.vue') },
      ]
    },
    {
      path: '/blog',
      title: 'Blog',
      name: 'Blog',
      icon: 'iconfont icon-huanyingqiapian',
      component: Layout,
      redirect: '/blog/list',
      children: [
        { path: '/blog/list', name: 'Blog list', title: 'Blog List', component: () => import('@/views/blog/blogList.vue') },
        { path: '/blog/edit', name: 'Blog edit', hidden: true, title: 'Blog Edit', component: () => import('@/views/blog/blogEdit.vue') },
      ]
    },
    {
      path: '/setting',
      title: 'Setting',
      name: 'Setting',
      icon: 'iconfont icon-huanyingqiapian',
      component: Layout,
      redirect: '/setting/blogTypeList',
      children: [
        { path: '/setting/blogTypeList', name: 'BlogType list', title: 'BlogType List', component: () => import('@/views/setting/blogType/blogTypeList.vue') },
        { path: '/setting/blogTypeEdit', name: 'BlogType edit', hidden: true, title: 'BlogType Edit', component: () => import('@/views/setting/blogType/blogTypeEdit.vue') },
      ]
    },
    { 
      path: '/*',
      component: () => import('@/views/404.vue'),
      hidden: true
    }
  ]
})
