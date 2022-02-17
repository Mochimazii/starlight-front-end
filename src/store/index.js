import Vue from 'vue'
import Vuex from 'vuex'
import axios from "@/api/index";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken:'',
    userRight:'',// admin/user
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.userToken = token
      sessionStorage.setItem("token",token)
    },
    SET_AUTH: (state, userRight) => {
      state.userRight = userRight
    },
    LOG_OUT: (state) => {
        state.userToken = ''
        state.userRight = ''
        sessionStorage.clear()
    }
  },
  actions: {
    login({ commit },loginForm) {

      return new Promise(((resolve,reject) => {
          axios.post('/user/login',{
              userAccount:loginForm.userAccount.trim(),
              userPassword:loginForm.password,
              isAdmin:loginForm.isAdmin
          })
              .then(res => {
                  if(res.data.code == 200){
                      console.log(res)
                      commit('SET_TOKEN',res.data.data)
                      if(loginForm.isAdmin){
                          commit('SET_AUTH','admin')
                      }else {
                          commit('SET_AUTH','user')
                      }
                      resolve(res.data.message)
                  }else{
                      reject("账号或密码错误")
                  }
              })
      }))
    },
    logOut({ commit }) {
        commit('LOG_OUT')
    }
  },
  modules: {
  }
})
