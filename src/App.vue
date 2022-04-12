<template>
  <v-app
    id="app"
    :style="{'background':'#fdfdf6'}"
    v-if="isRouterAlive"
  >
    <UserBar v-if="userRight === 'user'"/>
    <AdminBar v-else-if="userRight === 'admin'"/>

    <v-main>
      <transition
        name="slide-fade"
        mode="out-in"
      >
        <router-view/>
      </transition>
    </v-main>

  </v-app>
</template>

<script>
import UserBar from "@/components/UserBar";
import AdminBar from "@/components/AdminBar";

export default {
  name: 'App',
  components:{
    UserBar,
    AdminBar
  },
  data: () => ({
    isRouterAlive:true
  }),
  computed: {
    userRight (){
      return this.$store.state.userRight
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function (){
        this.isRouterAlive=true
      })
    }
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  created() {
    window.addEventListener("beforeunload",() => {
      sessionStorage.setItem("stateInfo",JSON.stringify(this.$store.state))
    })

    if(sessionStorage.getItem("stateInfo")){
      this.$store.replaceState(
          Object.assign(
              {},
              this.$store.state,
              JSON.parse(sessionStorage.getItem("stateInfo"))
          )
      )
    }

  }
};
</script>
<style lang="scss">
  *{
    box-sizing: border-box;
    font-family: "benderregular", sans-serif;
    -webkit-font-smoothing: none;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .slide-fade-enter-active {
    transition: all 0.225s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-fade-leave-active {
    transition: all 0.125s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(1.5vh);
    opacity: 0;
  }

  .theme--dark,
  .theme--light {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
  }

  .title{
    text-shadow: 0.0625rem 0.0625rem 0.0625rem rgba(0,0,0,.15);;
  }

  .navigationDrawer {

    .listItem{
      height: 60px;
      padding: 0 20px !important;
      border-left: 20px solid transparent;

      .listItemIcon{
        display: inline;
        margin-right: 17px;
      }

      .itemTitle{
        font-size: 16px;
      }
    }

    .listItemActive{
      background: #457b9d;
      border-left: 7px solid #1d3557;
    }
  }

</style>
