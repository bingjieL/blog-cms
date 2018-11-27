import router from './router'
import Cookies from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  let  userBasic =  JSON.parse(localStorage.getItem('userBasic'))
  let isLogin = userBasic?userBasic.isLogin: false
  if(!isLogin && to.path != '/login') {
    next({ path: `/login?redirect=${from.path}`})
  }else {
    next()
  }
})

router.afterEach( () => {
  NProgress.done()
})