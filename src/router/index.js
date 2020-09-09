import VueRouter from 'vue-router'

import RightSliderLayout from '@/layout/RightSliderLayout/index.vue'
// import CommonLayout from '@/layout/CommonLayout/index.vue'

import welcome from '@/views/welcome/index.vue'
import login from '@/views/login/index.vue'
import JtView from '@/views/JtView/index.vue'
import ModelView from '@/views/ModelView/index.vue'
import ThreeView from '@/views/ThreeView/index.vue'

export default new VueRouter({
  routes: [
    {
      path: '/login',
      component: login,
      hidden: true
    },
    {
      path: '/three',
      component: ThreeView
    },
    {
      path: '/',
      component: RightSliderLayout,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: welcome
        },
        {
          path: '/jt',
          component: JtView
        },
        {
          path: '/model',
          component: ModelView
        }
      ]
    }
  ]
})
