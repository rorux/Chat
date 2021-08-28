import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem('accessToken') && !localStorage.getItem('refreshToken')) {
    return next();
  }
  next('/');
}
const ifAuthenticated = async (to, from, next) => {
  if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
    return next();
  }
  await next('/login');
  store.commit('setPrimary', 'Для начала войдите в систему!');
}

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Home.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/settings',
    name: 'settings',
    meta: {layout: 'page', auth: true},
    component: () => import('../views/Settings.vue'),
    beforeEnter: ifAuthenticated,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
