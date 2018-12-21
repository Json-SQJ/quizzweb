import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import register from '@/components/register'
import changePwd from '@/components/changePwd'
import mainIndex from '@/components/mainIndex'
import start from '@/components/start'
import createTest from '@/components/createTest'
import problem from '@/components/problem'
import problemBank from '@/components/problemBank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {
      path:'/changePwd',
      name:'changePwd',
      component:changePwd
    },
    {
      path:'/mainIndex',
      name:'mainIndex',
      component:mainIndex
    },
    {
      path:'/start',
      name:'start',
      component:start
    },
    {
      path:'/createTest',
      name:'createTest',
      component:createTest
    },
    {
      path:'/problem',
      name:'problem',
      component:problem
    },
    {
      path:'/problemBank',
      name:'problemBank',
      component:problemBank
    }
  ]
})
