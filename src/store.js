import Vue from "vue"
import Vuex from "vuex"
import router from "./router"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    allUsers: [
      {
        id: 1,
        name: "test1",
        email: "test1@gmail.com",
        password: "12345"
      },
      { id: 2, name: "test2", email: "test2@gmail.com", password: "123456" }
    ],
    isLogin: false,
    isLoginError: false
  },
  mutations: {
    // 로그인 성공
    loginSuccess(state, loginObj) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = loginObj
    },
    // 로그인 실패
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logout(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
    }
  },
  actions: {
    //로그인 시도
    login({ state, commit }, loginObj) {
      //전체 유저에서 해당 이메일로 유저 찾기
      let selectedUser = null
      state.allUsers.forEach(user => {
        if (user.email === loginObj.email) selectedUser = user
      })
      if (selectedUser === null || selectedUser.password !== loginObj.password)
        commit("loginError")
      else {
        commit("loginSuccess", selectedUser)
        router.push({ name: "mypage" })
      }
    },
    logout({ commit }) {
      commit("logout")
      router.push({ name: "home" })
    }
  }
})
