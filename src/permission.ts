import router from './router/index'
//路由守卫
router.beforeEach((to, from, next) => {
  let permissions = localStorage.getItem('permissions')
  let token = localStorage.getItem('token')
  let fullPath = to.fullPath
  console.log(token)
  if (fullPath.startsWith('/mis') && fullPath != '/mis/login') {
    if (permissions == null || permissions == '' || token == null || token == '') {
      console.log('token为空')
      next({ name: 'MisLogin' })
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
