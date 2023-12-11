import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/Back',
      name: 'Back',
      component: () => import('../views/Back.vue')
    },
    {
      path: '/AddQn',
      name: 'AddQn',
      component: () => import('../views/AddQn.vue')
    },
    {
      path: '/AddQu',
      name: 'AddQu',
      component: () => import('../views/AddQu.vue')
    },
    {
      path: '/Confirm',
      name: 'Confirm',
      component: () => import('../views/Confirm.vue')
    },
    {
      path:'/Fetch',
      name:'Fetch',
      component: () => import('../views/Fetch.vue')
    },
    {
      path:'/Questionnaire/:qnId',
      name:'Questionnaire',
      component: () => import('../views/Questionnaire.vue'),
    },
    {
      path:'/Testcopy',
      name:'Testcopy',
      component: () => import('../views/Testcopy.vue')
    }
  ]
})

export default router
