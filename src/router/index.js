import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/front/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/Home.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/front/About.vue'),
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('@/views/front/Products.vue'),
      },
      {
        path: '/product/:id',
        name: 'Product',
        component: () => import('@/views/front/Product'),
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/front/Cart.vue'),
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import('@/views/front/Order.vue'),
      },
      {
        path: '/checkout/:orderId',
        name: 'Checkout',
        component: () => import('@/views/front/Checkout.vue'),
      },
    ],
  },
  // 巢狀路由
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/front/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/views/backstage/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/backstage/Products'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        component: () => import('@/views/backstage/Orders'),
        meta: { requiresAuth: true },
      },
      {
        path: 'coupons',
        component: () => import('@/views/backstage/Coupons'),
        meta: { requiresAuth: true },
      },
      {
        path: 'storages',
        component: () => import('@/views/backstage/Storages'),
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
