import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/front/Home.vue'),
      },
      {
        path: '/about',
        component: () => import('@/views/front/About.vue'),
      },
      {
        path: '/products',
        component: () => import('@/views/front/Products.vue'),
      },
      {
        path: '/product/:id',
        component: () => import('@/views/front/Product.vue'),
      },
      {
        path: '/cart',
        component: () => import('@/views/front/Cart.vue'),
      },
      {
        path: '/order',
        component: () => import('@/views/front/Order.vue'),
      },
      {
        path: '/checkout/:orderId',
        component: () => import('@/views/front/Checkout.vue'),
      },
    ],
  },
  // 巢狀路由
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/views/backstage/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/backstage/Products.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        component: () => import('@/views/backstage/Orders.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'coupons',
        component: () => import('@/views/backstage/Coupons.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'storages',
        component: () => import('@/views/backstage/Storages.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = new VueRouter({
  linkExactActiveClass: 'active',
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  routes,
});

export default router;
