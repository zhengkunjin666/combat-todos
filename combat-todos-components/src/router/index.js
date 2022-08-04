import { createRouter, createWebHashHistory } from 'vue-router';
import App from '../App.vue';

const routes = [
  {
    path: '/',
    redirect: '/all',
  },
  {
    path: '/:filter',
    name: 'Filter',
    component: App,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
