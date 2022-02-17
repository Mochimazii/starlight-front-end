<template>
  <v-responsive
      class="bkop-light elevation-4 py-2 pl-5 pr-8 "
      content-class="d-flex"
      style="border-radius: 4px"
  >
    <v-img
        :src="require('@/assets/default.jpg')"
        class="stepper-header--background stepper-header--background__animated"
        position=""
    >
      <v-overlay
          absolute
          opacity="0"
          :style="{'background': 'linear-gradient(150deg, rgba(255, 255, 255, .95), rgba(255, 255, 255, 0))'}"
      />
    </v-img>

    <BackButton
        :name="this.name"
        :active="this.$route.name == 'GoodsDetail'"
        class="my-2"
        @back="goBack"
    />

  </v-responsive>
</template>

<script>
import BackButton from "@/components/BackButton";
export default {
  name: "NavHeader",
  components:{
    BackButton,
  },
  data:() => ({
    name:"二手市场",
    active:true
  }),
  methods:{
    goBack(){
      this.active = !this.active
      if(this.$route.name != 'GoodsView'){
        this.$router.back()
      }
    }
  }
}
</script>

<style>

.bkop-light {
  background-color: rgba(255, 255, 255, .75) !important;
}

.stepper-header--background {
  position: absolute !important;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  border-radius: 4px !important;
  overflow: hidden;
}

.stepper-header--background__animated > .v-image__image {
  background-repeat: repeat ;
  background-size: 500px;
}

@keyframes stepper-header-background-animation {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: -500px 0%;
  }
}
</style>
