import Vue from "vue"
import Vuex from "vuex"
import router from "./router"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
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
      localStorage.removeItem("access_token")
    }
  },
  actions: {
    //로그인 시도
    login({ dispatch, commit }, loginObj) {
      axios
        .post("https://reqres.in/api/login", loginObj)
        .then(res => {
          // 성공 시 token:
          // 토큰을 헤더에 포함시켜서 유저 정보 요청
          let token = res.data.token
          // 토큰을 로컬 스토리지에 저장
          localStorage.setItem("access_token", token)
          // console.log(res)
          dispatch("getMemberInfo")
          console.log(localStorage.getItem("access_token"))
          localStorage.getItem("access_token")
            ? router.push({ name: "mypage" })
            : commit("loginError")
        })
        .catch(() => {
          commit("loginError")
        })
        .then(() => {
          //console.log("test")
        })
    },
    logout({ commit }) {
      commit("logout")
      router.push({ name: "home" })
    },
    getMemberInfo({ commit }) {
      //로컬 스토리지에 저장되어 있는 토큰 불러오기
      let token = localStorage.getItem("access_token")
      if (token) {
        let config = {
          headers: {
            "access-token": token
          }
        }
        // 토큰 -> 멤버 정보를 반환
        // 새로 고침 -> 토큰만 가지고 멤버정보 요청
        axios
          .get("https://reqres.in/api/users/2", config)
          .then(response => {
            //console.log(response)
            let userInfo = {
              id: response.data.data.id,
              first_name: response.data.data.first_name,
              last_name: response.data.data.last_name,
              avatar: response.data.data.avatar
            }
            commit("loginSuccess", userInfo)
            // router.push({ name: "mypage" })
          })
          .catch(() => {
            //alert("이메일과 패스워드를 확인해주세요.")
            localStorage.removeItem("access_token")
          })
      }
    }
  }
})
