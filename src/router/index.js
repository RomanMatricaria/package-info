import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/PackageSearch'
import DetailsInfo from '../views/PackageDetails'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PackageSearch',
    component: Search,
    children: [
      {
        path: '/package/:name',
        name: 'PackageInfo',
        component: DetailsInfo
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
