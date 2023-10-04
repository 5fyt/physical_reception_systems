import router from './router/index'
//路由守卫
router.beforeEach((to, from, next) => {
  let token = JSON.parse(localStorage.getItem('login') as string)?.token
  let fullPath = to.fullPath
  if (fullPath.startsWith('/front') && fullPath != '/front/index') {
    if (token == null || token == '') {
      console.log('token为空')
      next({ name: 'Front' })
    } else {
      return next()
    }
  } else if (
    fullPath.startsWith('/front/customer') ||
    fullPath.startsWith('/front/goods_snapshot')
  ) {
    if (token == null || token == '') {
      next({ name: 'FrontIndex' })
    } else {
      return next()
    }
  } else {
    return next()
  }
})
