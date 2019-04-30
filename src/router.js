import Vue from "vue"
import Router from "vue-router"
import store from "./store"

Vue.use(Router)
const rejectAuthUser = (to, from, next) => {
  if (store.state.isLogin === true) {
    //이미 로그인 된 유저
    alert("이미 로그인을 하였습니다.")
    next("/")
  } else {
    next()
  }
}

const onlyAuthuser = (to, from, next) => {
  if (store.state.isLogin === false) {
    // 로그인  안된 유저
    alert("로그인 후 이용해주세요.")
    next("/")
  } else {
    next()
  }
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: rejectAuthUser,
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/mypage",
      name: "mypage",
      beforeEnter: onlyAuthuser,
      component: () =>
        import(/* webpackChunkName: "mypage" */ "./views/Mypage.vue")
    }
  ]
})
