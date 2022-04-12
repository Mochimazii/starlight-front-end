<template>
  <v-card
      elevation="5"
      class="bkop-medium pa-6"
  >
    <h1 class="headline d-flex align-center flex-row pb-2">
      <v-icon
          left
      >
        mdi-speedometer
      </v-icon>

      快速开始
    </h1>

    <v-row
        justify="center"
        align="center"
    >
      <v-col
          v-for="cate in categories"
          :key="cate.title"
          cols="12"
          md="3"
          class="align-self-stretch"
      >
        <BackdropCard
            hover
            @click="selectCate(cate.title)"
        >
          <template #backdrop>
            <v-icon
                :color="activeCate === cate.title ? 'pink lighten-2':''"
            >
              {{ cate.icon }}
            </v-icon>
          </template>

          <template>
            <v-icon
                x-large
                :color="activeCate === cate.title ? 'red lighten-2':''"
                style="opacity: 0.9"
            >
              {{ cate.icon }}
            </v-icon>

            <h2 :class="{'subtitle-2 font-weight-bold mt-1': $vuetify.breakpoint.xsOnly, 'heading my-1': !$vuetify.breakpoint.xsOnly}">
              {{ cate.title }}
            </h2>

            <span class="caption font-italic">
              {{ cate.subtitle }}
            </span>
          </template>
        </BackdropCard>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import BackdropCard from "@/components/BackdropCard";
export default {
  name: "GoodClassCard",
  components:{
    BackdropCard
  },
  data () {
    return {
      categories:[
        {
          title:'零食',
          icon:'mdi-food',
          subtitle:"'我想去码头搞点薯条'",
        },
        {
          title:'书籍',
          icon:'mdi-book',
          subtitle:"'有没有便宜的教科书'"
        },
        {
          title:'工具',
          icon:'mdi-tools',
          subtitle:"'我想修东西'"
        },
        {
          title:'其他',
          icon:'mdi-treasure-chest',
          subtitle:"'随便逛逛'"
        },
      ],
    }
  },
  methods: {
    selectCate(title){
      let Cate
      if(this.activeCate === title){
        Cate = null
      }else {
        Cate = title
      }
      this.$store.commit('SET_GoodClass',Cate)
    }
  },
  computed:{
    activeCate(){
      return this.$store.state.goodClass
    }
  }
}
</script>

<style scoped>
.bkop-medium {
  background: rgba(255, 255, 255, .9) !important;
}
</style>
