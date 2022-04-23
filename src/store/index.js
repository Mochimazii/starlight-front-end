import Vue from 'vue'
import Vuex from 'vuex'
import axios from "@/api/index";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken:'',
    userRight:'',// admin/user
    userId:'',
    goodClass:'',//零食/书籍/工具/其他
    goodKeyWord:'',
  },
  mutations: {
    SET_USERID:(state, userId) => {
        state.userId = userId
        sessionStorage.setItem("userId",userId)
    },
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
        state.userId = ''
        sessionStorage.clear()
    },
    SET_GoodClass: (state,goodClass) => {
        state.goodClass = goodClass
        sessionStorage.setItem("goodClass",goodClass)
    },
    SET_GoodKeyWord: (state,goodKeyWord) => {
        state.goodKeyWord = goodKeyWord
        sessionStorage.setItem("goodKeyWord",goodKeyWord)
    },
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
                  if(res.data.code === 200){
                      commit('SET_TOKEN',res.data.data)
                      commit('SET_USERID',res.data.message)
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
    register({commit},loginDto){
        return new Promise(((resolve,reject) => {
            axios.post('/user/register',{
                userAccount:loginDto.userAccount.trim(),
                userPassword:loginDto.userPassword.trim(),
                isAdmin:false
            })
                .then(res => {
                    if(res.data.code === 200){
                        commit('SET_TOKEN',res.data.data)
                        commit('SET_USERID',res.data.message)
                        commit('SET_AUTH','user')
                        resolve(res.data.message)
                    }else{
                        reject("账号注册失败")
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
