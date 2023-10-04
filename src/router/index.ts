import { createRouter, createWebHistory } from 'vue-router'
//不能直接用这是一个类型
import type { RouteRecordRaw } from 'vue-router'
const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'FrontIndex' }
  },
  {
    path: '/front',
    name: 'Front',
    component: () => import('@/Layout/index.vue'),
    children: [
      {
        path: 'index',
        name: 'FrontIndex',
        component: () => import('@/views/reception/front/index.vue')
      },
      {
        path: 'goods/:id',
        name: 'FrontGoods',
        component: () => import('@/views/reception/goods/index.vue')
      },
      {
        path: 'goods_list',
        name: 'FrontGoodsList',
        component: () => import('@/views/reception/goodsfilter/index.vue')
      },

      {
        path: 'customer',
        name: 'FrontGoodsCustomer',
        component: () => import('@/views/reception/customer/index.vue'),
        children: [
          {
            path: 'mine',
            name: 'FrontMine',
            component: () => import('@/views/reception/customer/FrontMine/index.vue')
          },
          {
            path: 'order_list',
            name: 'FrontOrderList',
            component: () => import('@/views/reception/customer/OrderList/index.vue')
          }
        ]
      }
    ]
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/NotFound/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue')
  }
]
const router = createRouter({
  history,
  routes
})

export default router
