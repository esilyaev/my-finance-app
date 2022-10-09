import * as VueRouter from 'vue-router'
import FinanceChartVue from '../pages/FinanceChart.vue'
import LoginVue from '../pages/Login.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/finance-chart', component: FinanceChartVue },
  { path: '/login', component: LoginVue },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
})

export { router }