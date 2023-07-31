import { createRouter, createWebHistory } from 'vue-router'
//不能直接用这是一个类型
import type { RouteRecordRaw } from 'vue-router'
const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'FrontIndex' }
  },
  //前台路由
  {
    path: '/front',
    name: 'Front',
    component: () => import('@/FrontLayout/index.vue'),
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
            path: 'Mine',
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
  //后台路由
  {
    path: '/main',
    redirect: { name: 'MisHome' },
    name: 'Main',
    component: () => import('@/MisLayout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'MisHome',
        component: () => import('@/views/background/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'dept',
        name: 'MisDept',
        component: () => import('@/views/background/department/index.vue'),
        meta: {
          title: '部门',
          isTab: true
        }
      },
      {
        path: 'role',
        name: 'MisRole',
        component: () => import('@/views/background/role/index.vue'),
        meta: {
          title: '角色',
          isTab: true
        }
      },
      {
        path: 'user',
        name: 'MisUser',
        component: () => import('@/views/background/user/index.vue'),
        meta: {
          title: '用户',
          isTab: true
        }
      },
      {
        path: 'goods',
        name: 'MisGoods',
        component: () => import('@/views/background/goods/index.vue'),
        meta: {
          title: '体检套餐',
          isTab: true
        }
      }
    ]
  },
  {
    path: '/mis/login',
    name: 'MisLogin',
    component: () => import('@/views/background/login/index.vue')
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
