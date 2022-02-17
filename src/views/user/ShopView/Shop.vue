<template>
  <div>
    <v-container class="mt-3" style="width: 80vw">
      <v-row>
        <v-col cols="12">
          <NavHeader/>
        </v-col>
      </v-row>
      <v-row v-if="this.$route.name === 'GoodsView'">
        <v-col cols="12" lg="6" class="align-self-stretch">
          <GoodClassCard class="align-self-stretch"/>
        </v-col>
        <v-col cols="12" lg="6" class="align-self-stretch">
          <GoodSearch class="fill-height align-self-stretch" />
        </v-col>
      </v-row>
      <router-view/>
    </v-container>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import GoodClassCard from "@/components/GoodClassCard";
import GoodSearch from "@/components/GoodSearch";
export default {
  name: "Shop",
  components:{
    NavHeader,
    GoodClassCard,
    GoodSearch
  },
  data: () => ({

  }),
  methods:{
    dian(){
      console.log("卡片点击")
    }
  }
}
</script>

<style scoped>

</style>
