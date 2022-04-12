<template>
  <div class="mt-4">
    <v-row>
      <v-col v-for="good in goods" cols="12" sm="6" md="4" lg="3">
        <GoodSettingCard :good="good"/>
      </v-col>
    </v-row>
    <v-row v-if="this.page !== null && this.page.pages !== 0" justify="center">
      <v-col>
        <v-container class="max-width">
          <v-pagination
              v-model="page.current"
              :length="page.pages"
              :total-visible="7"
              @input="pageChange(page.current)"
              @next="nextPage"
              @previous="prevPage"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GoodSettingCard from "@/components/GoodSettingCard";

export default {
  name: "Pulled",
  components:{
    GoodSettingCard,
  },
  data(){
    return{
      currentPage: 1,
      goods:{},
      page:null,
    }
  },
  created() {
    this.getGoodsPage(1,0)
  },
  methods:{
    getGoodsPage(current,goodStage){
      this.$axios.get('good/stage',{
        params:{
          nextPage:current,
          goodStage:goodStage
        }
      })
          .then(res => {
            console.log(res)
            this.goods = res.data.data.records
            this.page = res.data.data
          })
    },
    pageChange(currentPage){
      this.getGoodsPage(currentPage,0)
    },
    prevPage(){
      let currentPage = this.page.current
      this.getGoodsPage(currentPage,0)
    },
    nextPage(){
      let currentPage = this.page.current
      this.getGoodsPage(currentPage,0)
    },
  },
}
</script>

<style scoped>

</style>
