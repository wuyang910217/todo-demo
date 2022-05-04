import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/todo',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'base', component: () => import('pages/todos/base.vue') },
      { path: 'store', component: () => import('pages/todos/store.vue') },
      { path: 'mongo', component: () => import('pages/todos/mongo.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
