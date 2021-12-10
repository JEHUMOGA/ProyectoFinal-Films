import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import EditarFilm from '../views/EditarFilm.vue'
//import AgregarFilm from '../views/AgregarFilm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/EditarFilm/:filmID',
    name: 'EditarFilm',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditarFilm.vue')
  },
  {
    path: '/AgregarFilm',
    name: 'AgregarFilm',
    component: () => import(/* webpackChunkName: "about" */ '../views/AgregarFilm.vue')
  },
  {
    path: '/VisualizarFilms',
    name: 'VisualizarFilms',
    component: () => import(/* webpackChunkName: "about" */ '../views/VisualizarFilms.vue')
  },
  {
    path: '/Detalles/:filmID',
    name: 'Detalles',
    component: () => import(/* webpackChunkName: "about" */ '../views/Detalles.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
