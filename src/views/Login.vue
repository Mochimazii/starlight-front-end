<template>
  <v-main id="backGround">
    <v-card
      color="indigo lighten-1"
      dark
      id="loginForm"
    >
      <v-card-title
        class="justify-center text-h5"
      >
        星 · 光
      </v-card-title>
      <v-form
        ref="loginForm"
      >
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      label="账号"
                      :rules="accountRules"
                      v-model="loginForm.userAccount"
                      placeholder="点击右侧切换登录方式"
                      :append-icon="loginForm.isAdmin ? 'mdi-face-agent' : 'mdi-face-man'"
                      @click:append="loginForm.isAdmin = !loginForm.isAdmin"
                      v-bind="attrs"
                      v-on="on"
                  >

                  </v-text-field>
                </template>
                <span>{{ loginForm.isAdmin ? '管理员登录':'普通用户登录' }}</span>
              </v-tooltip>

              <v-text-field
                  label="密码"
                  :rules="pwdRules"
                  v-model="loginForm.password"
                  :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show = !show"
              >

              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
            @click="register"
            color="orange lighten-1"
        >
          <v-icon left>
            mdi-arrow-left-bold-circle-outline
          </v-icon>
          注册
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            @click="mocklogin"
            color="blue-grey lighten-3"
        >
          登录
          <v-icon right>
            mdi-arrow-right-bold-circle-outline
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar
        v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          确认
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
export default {

  data:() => ({
    name: 'Login',
    text: '消息提醒',
    snackbar:false,
    show: false,
    accountRules: [
      v => !!v || '账号不可为空',
    ],
    pwdRules: [
      v => !!v || '密码不可为空',
    ],
    loginForm: {
      userAccount: '',
      password: '',
      isAdmin:false
    },
  }),

  methods:{
    login (){
      if(this.$refs.loginForm.validate()){
        console.log("检验合法")
        console.log(this.loginForm)
        //不同角色登录（待处理）
        this.$store.dispatch('login',this.loginForm)
            .then(res => {
              console.log("登录token"+this.$store.state.userToken)
              this.text = res
              this.snackbar = true
              if(this.loginForm.isAdmin){
                this.$router.push('/admin')
              }else {
                this.$router.push('/index')
              }

            })
            .catch(error => {
              console.log(error)
              this.text = error
              this.snackbar = true
            })
        //弹小窗处理登录失败 登录成功等情形
      }
    },
    mocklogin (){
        if(this.loginForm.isAdmin === true){
          this.$store.commit('SET_AUTH','admin')
          this.$router.push('admin')
        }else {
          this.$store.commit('SET_AUTH','user')
          this.$router.push('shop')

        }
    },

    register (){
      console.log(this.$store.state.userToken)
    }
  }
}
</script>

<style>
#backGround {
  background: url("../assets/img/bg.jpg") no-repeat center;
  position: fixed;
  height: 100%;
  width: 100%;
  background-size: cover;
}

#loginForm{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  transform: translateX(-50%) translateY(-50%);
}
</style>
