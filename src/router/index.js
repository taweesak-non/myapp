import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Equipment from '../views/equipment.vue'
import List from '../views/list.vue'
import Adddevice from '../views/adddevice.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import History from '../views/history.vue'
import Employee from '../views/employee.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[{
      path: '/equipment',
      name: 'Equipment',
      component: Equipment
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/employee',
      name: 'Employee',
      component: Employee
    },
    {
      path: '/adddevice',
      name: 'Adddevice',
      component: Adddevice
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },

    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
